---
layout: post
title: "URGENT: Fragmented Backups Vulnerability"
category: news
date: 2017-09-22 1:00:00 -0400
---

This vulnerability has been fixed in Armory 0.96.3 and later. **Consider all wallets that use fragmented backups to be compromised and migrate all funds to a new wallet. If you want to use fragmented backups, update to [Armory 0.96.3](/0.96.3-release/) immediately.**

*Update (2026): the fix is in 0.96.3 and every later release. A wallet with fragmented backups made by 0.96.2 or earlier must still be treated as compromised.*


## The story

A couple days ago I was warned by Gregory Maxwell that the implementation for Shamir's Secret Sharing Armory uses is broken. After reviewing the code in question, I've concluded the implementation of SSS introduces a vulnerability in fragmented backups that requires not only an immediate fix but also a community wide warning to alert all fragmented backup users.

These users need to sweep all funds from these wallets. All version starting 0.96.3 will have the vulnerability fix.

## A high level look at SSS

SSS is a scheme that takes a secret and outputs a set of N fragments. M of these fragments are sufficient to reconstruct the secret.

In order to do so, you first constructs a polynomial f of degree M over a finite field, in which M-1 of the coefficients are random values, and the last one is the secret itself. You then compute N points of f. Each point, which is a pair (x, f(x)), constitutes a fragment.

To reveal the secret, you need to reconstruct the polynomial, which you do by interpolating M points together.

I will not go into the details of the interpolation, but one element here is crucial: The effect of a partial interpolation is to narrow down the possible candidates for valid coefficients. In other words, the more points on the curve you interpolate, the clearer a picture of the curve you get. The curve is constructed around your secret, a more refined interpolation results in an ever increasing leak of information, to the point where you can brute force the secret.

This property of the interpolation is counteracted by the use of a finite field. Since all points generated with the polynomial belong to the underlying finite field, the cyclic nature of finite fields widens the range of possible solutions that would yield your particular polynomial from a partial interpolation (by making them infinite), in such a way that you simply cannot brute force your way out of the interpolating at least M points.

A simple way to demonstrate that property is as follows:

Consider the equation:

    8 = 5 + x

It's obvious that x is 3, and that this is the only solution. Now add this variation to the equation:

    8 = (5 + x) mod 11

Suddenly x can be 3, 14, 25, 36... and so on. There is now an infinite amount of solutions for x, due to the introduction of the modulo operation. This is essentially the effect the finite field has on the interpolation equations.

## The vulnerability

The whole point of the previous section was to demonstrate how SSS is constructed to prevent partial information leaking. One of the requirements to insure that property is that all of the polynomial coefficients but the secret are chosen at random.

This is precisely what Armory's implementation breaks, by rolling deterministic and chained coefficients, where the first coefficient is deterministically derived from the secret, and the subsequent ones are derived successively from one another.

If you look at it in the context of the previous paragraph, where SSS was crafted to deny any alley to gather information about coefficients short of M fragments, the newly introduced deterministic relationship between all coefficients provides a path that potentially dumbs down the security of SSS to that of the hash function used to generate the coefficients.

This can ultimately lead to a subset of fragments leaking information about coefficients where none should be.

## In the code

Code wise, there were 2 instances of this implementation, both of which are faulty.

### The first version

It did 2 things wrong, one more aggravating than the other:

The coefficients were not picked at random, instead they were derived as hashes of the secret, in a fashion that boils down to this:

    coefficient_0 = hash(secret)
    coefficient_(n+1) = hash(coefficient_n)

The fragments themselves were constructed as the following points on the curve:

    fragment_n = (coefficient_n, f(coefficient_n))

There are 2 important issues with this setup. First of all, the coefficients are not selected at random, therefor it breaks SSS security assumptions.

Next, and most aggravating, the coefficients were provided as is on the fragments, since you need to provide the pair (x, f(x)), and x in this case were the actual coefficients.

Note that since the coefficients were derived from each other, the second mistake is twice as aggravating, as anyone with fragment n would have coefficient n and could derive all coefficients n+1.

The second mistake was caught and fixed eventually. I was not involved with anything regarding cryptography and security in Armory at the time, therefor I have no recollection of the event. I expect there was a write up of the issue and people were told to cycle wallets, but I can't remember any of it.

You can look at the code in its original form here:
<https://github.com/etotheipi/BitcoinArmory/commit/80e373a#diff-27fe88d2c6032fecb93912a17d72081bR1615>

### The second version

The second version only made sure points were generated using the [1...N] sequence for x instead of coefficient themselves. At this point fragmented backups where no longer as broken but the code still did not implement SSS correctly.

Notably the assumption that no amount of fragments less than M can leak any data about the secret is not true with that faulty implementation.

One way to look at it is that this implementation introduces a deterministic relationship between the coefficients in a way that it can effectively reduce the security of the system to that of a single pass of HMAC512 provided an amount L of fragments, with L < M.

Here is the commit for the second version:

<https://github.com/etotheipi/BitcoinArmory/commit/0824b632600116bd6395cec939fa6fd398efeb19#diff-27fe88d2c6032fecb93912a17d72081bR1915>

## Affected versions

Fragmented backups were introduced in version 0.88 (04/18/2013) and the first fix was deployed in version 0.90 (11/26/2013).

The final fix was introduced in v0.96.3 (9/21/2017)

## The fix

The coefficients were made deterministic in order to present deterministic fragments to the user when fragmenting a wallet over a given scheme. In other words, fragmenting wallet W over a M-of-N scheme would always yield the save fragment values for the same fragment index.

This introduces scenarios where any amount of fragments can be recomputed from the private wallet root without invalidating fragments still in the wild.

The fix was to randomize the coefficients at the cost of the deterministic characteristic of the fragments.  The choice was fairly simple:

1. The deterministic attribute gained by bastardizing SSS is worthless in the face of how it damages its security properties.

2. Even if a change to SSS is designed so that it does not so obviously erode its security properties, this is still an act of rolling a custom cryptographic function, which commands a level of review and security analysis that will most likely not be performed at the adequate level.

3. There are no scenarios I can think of in which the feature of determinism in fragments is actually necessary and central to this type of backups. Introducing it at the cost of security is therefor doubly unacceptable. Backups are supposed to be forever after all, lacing solid crypto with any kind of bootlegged algorithm does not stand to reason.

Therefore, it is without hesitation that the faulty feature was undone, and the faulty code removed from the repo so as to prevent unwary users from copying it into their own projects.

The changes can be seen here:

<https://github.com/goatpig/BitcoinArmory/commit/94d2a7556d25cf788da639d81a7162694982f6b7>
<https://github.com/goatpig/BitcoinArmory/commit/7bd9887891ac88e2e49954ef034bedef88f23eaf>

## GUI changes

Since the fragments are not deterministic anymore, they are now generated with a unique set ID which is reflected on the backup strings and printed backups. Fragments are only useful within a their own set. Another way to put it is that you cannot mix and match fragments from different sets. This is the only difference between the pre and post fix implementation.

The fixed version is compatible with fragments generated from the deterministic version. You will still be able to restore from these with version 0.96.3+

## Recommendations

It is hard to say exactly how effectively this custom take on SSS breaks security at the fragment level. How many fragments less fragment would it take to reproduce a secret than intended? Honestly, I don't know, but while the first implementation was effectively breaking all security assumptions of SSS, the second version is SSS at least theoretically.

I don't expect an attacker can snatch a single fragment and reveal the secret the next minute with minimal code. This vulnerability reduces the overall complexity of the problem that of a hash function, it doesn't outright bypass all complexity.

Since we're talking 32 byte integers, breaking the scheme isn't trivial, but it has certainly been weakened to a state that is difficult to precisely assess. Therefor, to remain on the conservative side, my recommendation is as follows:

If you created a fragment backup of your wallet, **consider that wallet compromised**. <u>Create a new wallet and sweep the funds from the compromised wallet to the new one</u>. You can redo your fragmented backup scheme on the new wallet provided you use Armory 0.96.3 and newer.

If you do not use fragmented backups, you have nothing to do.

## Notes

Special thanks to Gregory Maxwell for finding the vulnerability and helping with the review of the fix.


Adapted from <https://bitcointalk.org/index.php?topic=2199659.msg22115643#msg22115643>
