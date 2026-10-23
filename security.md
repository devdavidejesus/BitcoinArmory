---
layout: page
title: Security
description: "How to report a security problem in Armory, how releases are signed, past security notices, and how to avoid fake Armory apps and websites."
permalink: /security/
id: security
---

Armory protects keys that can hold a lot of money. This page explains how to report a problem privately, how to check that the Armory you run is genuine, and how to recognize impersonators.

## Report a vulnerability

Please **do not** open a public issue for a security problem. Report it privately through [GitHub's private vulnerability reporting](https://github.com/goatpig/BitcoinArmory/security/advisories/new), so it can be fixed before it is disclosed. If that form is not available, send a private message to goatpig on [Bitcointalk](https://bitcointalk.org/index.php?board=97.0).

Include the Armory version, your operating system, what an attacker could do, and the steps to reproduce it.

## How releases are signed

Since 0.94, stable releases come with a list of SHA-256 checksums signed by goatpig's offline signing key:

~~~
goatpig (Offline signing key for Armory releases) <moothecowlord@gmail.com>
Fingerprint: 745D 707F BA53 968B DF63  AA8D 8C52 1176 4922 589A
~~~

The key is also published in the source repository at [`PublicKeys/goatpig-signing-key.asc`](https://github.com/goatpig/BitcoinArmory/blob/master/PublicKeys/goatpig-signing-key.asc). Releases 0.93.3 and earlier were signed with the old Armory Technologies key. The [verification guide](/docs/verify) shows how to check a download step by step, and [Building From Source](/docs/building/) shows how to check a signed git tag.

## Past security notices

 - **September 22, 2017:** [Fragmented backups vulnerability](/fragmented-backup-vuln/). If you made a fragmented backup with Armory 0.96.2 or earlier, treat that wallet as compromised and move its funds to a new wallet.

## Beware of impersonators

The only official Armory website is **btcarmory.com**, and the source code and binaries are published only at [github.com/goatpig/BitcoinArmory](https://github.com/goatpig/BitcoinArmory). Armory is a desktop application and has **no mobile app**: any phone app using the Armory name is not made by the Armory developers, and any other website offering Armory downloads is not run by them.

The Armory developers will never ask for your wallet files, passphrase, paper backup or private keys, and will never offer to "recover" funds for a fee.
