---
layout: post
title: Armory and Hard Forks
category: news
date: 2017-03-26 12:00:00 +0000
---

Recently there has been much debate in the Bitcoin community regarding Segregated Witness, hard forks and soft forks, and the usage of alternative node and mining software. The Armory developers (goatpig, droark, and achow101) support Segregated Witness as is in its current form, and also support Bitcoin Core. The Armory developers also oppose hard forks that may attack the original chain. Should a long-lasting hard fork that does not attack the original chain exist, we would consider implementing functionality required to allow Armory users to transact on that chain only if absolutely necessary (e.g. the transaction format for that chain is changed). Depending on how drastic the changes are, we may implement the change fully, implement a migration tool to another wallet that supports the change, or simply not support the fork at all.

Although the Armory developers do not support malicious hard forks and may not support a non-malicious hard fork, the Armory wallet software does not perform any consensus checks as it relies on its connection to a local Bitcoin node. This node is typically Bitcoin Core, but anything based upon Core, including Bitcoin Unlimited, will work so long as no changes are made to the transaction or block formats. So long as both formats do not change, Armory should be compatible with the hard fork and will allow users to continue to transact on the forked network.

Because transactions for both the forked and the original networks will primarily be valid on both networks, there is the risk for replay attacks to occur and for the loss of coins due to transaction replay. The following will help users avoid transaction replay should Bitcoin Unlimited or another similar block size increase hard fork proposal be activated. However, this procedure is not necessarily guaranteed to work and assumes that the forked chain will have significantly lower transaction fees than the original chain.

Should a chain fork occur, more up-to-date information about what Armory users can do will be posted on the [Armory forums](https://bitcointalk.org/index.php?board=97.0) and on this website.

## The setup

The Armory database engine builds off of on-disk blockchain data and does not enforce consensus rules. In other words, any client that uses the same block data format and magic word as Bitcoin Core is compatible with Armory. From your perspective, running Armory against the BU chain will show you your BU balance, and vice versa. 

In practice, this means that to be able to interchange seamlessly between your Core and BU transaction history, you need 2 copies of the blockchain data; one for the Core chain and one for the BU chain. The same goes with the Armory database, as it is intimately tied to the underlying block data. You do not need to rescan the pre-fork BU chain to get a copy of the pre-fork Core database to work off of the pre-fork BU chain. However, to be absolutely safe, you should use Armory's *Rebuild and Rescan Databases* feature to update both databases after the fork. In addition, it may be necessary to fully re-download the blockchain if the blockchain and database copies are made post-fork.

To summarize, you need:

- 1 copy of the blockchain to run exclusively against the Core client, with the associated Armory database directory.
- 1 copy of the blockchain to run exclusively against the BU client, with associated Armory database directory.

You can swap between the two by pointing Armory to the relevant pair of block data folder and database folder by using the `--satoshi-datadir` and `--dbdir` command line options respectively.

## Avoiding Transaction Replay

A transaction replay attack is where one transaction can end up confirmed in both blockchains, thus resulting in coins on one chain being spent when you did not want those to be spent. This can happen either accidentally or intentionally due to someone broadcasting your transaction on both networks.

In order to avoid transaction replay, you must "taint" your coins; you want to get a transaction on one chain that is not valid on the other. Once you have that, you can mix all of your remaining coins with the "tainted" output to the same effect. At this point none of your [unspent transaction outputs (UTXOs)](https://bitcoin.org/en/glossary/unspent-transaction-output) on one chain are valid on the other, which guarantees that your transactions are immune to transaction replay attacks.

Tainting on BU is actually fairly easy. They want to increase the block size limit and reduce tx fees. At the same time, the departure of hash power from the main chain will result in slower Core blocks and thus less capacity and higher fees.

Hence, the simplest way to taint on BU is this:

- Create a transaction sending coins back to yourself, with a fee low enough such that it will quickly confirm on BU and will probably not confirm quickly on Core.

- Once the transaction is mined on BU, RBF the underlying output on the Core chain with a sufficiently high fee. This transaction can only be mined on Core now since it is invalid on BU (to which the transaction appears as a double spend).

- Once your RBF transaction receives enough confirmations on the Core side -- six should be sufficient -- you will have a UTXO exclusive to the BU chain and a UTXO exclusive the Core chain. You are now safe to taint the rest of your coins on each chain, keeping in mind that untainted coins remain valid on both chains. Including untainted coins in a transaction with tainted coins will be sufficient for tainting the untainted coins. Because confirmations are likely to take longer on the Core chain, you may need to use RBF to bump the fee of the transaction multiple times in order to receive a confirmation more quickly.

In order to perform this tainting, you must use RBF, which is a feature currently planned for 0.96.

There is essentially no risk to tainting your coins on your own. At worst you are just sending your coins back to yourself on both chains and losing a small amount of coins in transaction fees. To be safe, we recommend starting with a small transaction that can be tainted with minimal risk, and then tainting the remaining coins all at once in order to minimize fee loss.
