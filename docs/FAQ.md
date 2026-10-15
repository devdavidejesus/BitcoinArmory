---
layout: page
title: Frequently Asked Questions
permalink: /docs/faq
id: faq
---

* Table of Contents
{:toc}

## What is Bitcoin?

Bitcoin is a decentralized peer-to-peer digital currency. Using cryptography and peer-to-peer networking, Bitcoin allows people to securely and nearly instantly transfer money to other people at a very low cost. The decentralized consensus mechanism ensures that everyone using Bitcoin follows the same rules. This prevents Bitcoin from being controlled by a central authority and prevents the counterfeiting of money.

Bitcoin is also a trustless system. There is no central authority to trust, in fact, no full node on the network trusts any other full node. Instead each node will verify every single block and transaction to ensure that the data it receives conforms to its own rules, which must be the rules that everyone else follows in order for that node to be a part of the network.

For more information, please visit [bitcoin.org](https://bitcoin.org).

## What is Armory?

Armory is a Bitcoin wallet. It stores and protects the private keys necessary for you to spend Bitcoin. It keeps track of all of the Bitcoin that you have sent and received and allows you to spend Bitcoin with ease. Armory's primary focus is security. The cryptographic schemes were chosen for their robustness and resistance to attack, and Armory supports air-gapped cold storage, where the private keys live on a computer that is never connected to the internet.

## What command-line options does Armory have?

These are the command line arguments of Armory 0.96.5, the current stable release. Run `armory --help` (or `python ArmoryQt.py --help` from source) to see the options of the version you have installed.

~~~
  -h, --help            show this help message and exit
  --settings=SETTINGSPATH
                        load Armory with a specific settings file
  --datadir=DATADIR     Change the directory that Armory calls home
  --satoshi-datadir=SATOSHIHOME
                        The Bitcoin Core/bitcoind home directory
  --satoshi-port=SATOSHIPORT
                        For Bitcoin Core instances operating on a non-standard
                        port
  --satoshi-rpcport=SATOSHIRPCPORT
                        RPC port Bitcoin Core instances operating on a non-
                        standard port
  --dbdir=ARMORYDBDIR   Location to store blocks database (defaults to
                        --datadir)
  --rpcport=RPCPORT     RPC port for running armoryd.py
  --rpcbindaddr=RPCBINDADDR
                        IP Address to bind to for RPC.
  --testnet             Use the testnet protocol
  --regtest             Use the Regression Test Network protocol
  --offline             Force Armory to run in offline mode
  --nettimeout=NETTIMEOUT
                        Timeout for detecting internet connection at startup
  --interport=INTERPORT
                        Port for inter-process communication between Armory
                        instances
  --debug               Increase amount of debugging output
  --nologging           Disable all logging
  --netlog              Log networking messages sent and received by Armory
  --logfile=LOGFILE     Specify a non-default location to send logging
                        information
  --mtdebug             Log multi-threaded call sequences
  --skip-online-check   Go into online mode, even if internet connection isn't
                        detected
  --tor                 Enable common settings for when Armory connects
                        through Tor
  --keypool=KEYPOOL     Default number of addresses to lookahead in Armory
                        wallets
  --redownload          Delete Bitcoin Core/bitcoind databases; redownload
  --rebuild             Rebuild blockchain database and rescan
  --rescan              Rescan existing blockchain DB
  --rescanBalance       Rescan balance
  --nospendzeroconfchange
                        All zero-conf funds will be unspendable, including
                        sent-to-self coins
  --ignore-new-zeroconf
                        Do not update wallet balances on zero-conf
                        transactions
  --multisigfile=MULTISIGFILE
                        File to store information about multi-signature
                        transactions
  --force-wallet-check  Force the wallet sanity check on startup
  --disable-wallet-check
                        Disable the wallet sanity check on startup
  --disable-modules     Disable looking for modules in the execution directory
  --disable-conf-permis
                        Disable forcing permissions on bitcoin.conf
  --disable-detsign     Disable Transaction Deterministic Signing (RFC 6979)
  --enable-detsign      Enable Transaction Deterministic Signing (RFC 6979) -
                        Enabled by default
  --armorydb-ip=ARMORYDB_IP
                        Set remote DB IP (default: 127.0.0.1)
  --armorydb-port=ARMORYDB_PORT
                        Set remote DB port (default: 9001)
  --force-fcgi          Force the use of fcgi sockets when pointing to a
                        custom DB IP
  --ram-usage=RAM_USAGE
                        Set maximum ram during scans, as 128MB increments.
                        Defaults to 4
  --thread-count=THREAD_COUNT
                        Set max thread count during builds and scans. Defaults
                        to CPU total thread count
  --db-type=DB_TYPE     Set db mode, defaults to DB_FULL
  --language=LANGUAGE   Set the language for the client to display in. Use the
                        ISO 639-1 language code to choose a language.
                        Options are da, de, en, es, el, fr, he, hr, id, ru,
                        sv. Default is en.
  --force-enable-segwit
                        Allow SegWit address generation in offline mode
  --port=PORT           Unit Test Argument - Do not consume
  --verbosity=VERBOSITY
                        Unit Test Argument - Do not consume
  --coverage_output_dir=COVERAGEOUTPUTDIR
                        Unit Test Argument - Do not consume
  --coverage_include=COVERAGEINCLUDE
                        Unit Test Argument - Do not consume
~~~

Armory 0.97 removes `--force-fcgi` and `--force-enable-segwit`. In 0.97 the node and database settings (paths, database type, RAM and thread limits) are chosen in the Setup Manager that opens before the main window, and ArmoryDB has its own options: run `ArmoryDB --help`.

## What if Armory stops being developed?

Because Armory is a desktop client, so long as you have a copy of the software and your wallet files, you will be able to spend your Bitcoin. Armory does not rely on any centralized service in order to spend Bitcoin. It will continue to function as it used to so long as there have not been many major consensus changes. Even if there are, Armory may still work: it never connects to the Bitcoin network by itself and relies on your local Bitcoin Core node for networking and consensus.

## How often should I backup?

You should backup your wallet frequently, but only one backup is truly necessary. This is because Armory uses a deterministic wallet; all of the addresses are derived from a specific root algorithmically. This algorithm ensures that the same addresses are derived every time for a given root. This means that you only need to have one backup and you will be able to recover all of the addresses that you have ever used from that wallet.

The exception is imported private keys: they are not derived from the root, so they are only protected by backups made after they were imported. Make a new backup whenever you import keys.

## What Bitcoin Improvement Proposals (BIPs) does Armory support?

Armory currently supports:

 - BIPs 11, 13, and 16 for Pay-to-Script-Hash addresses and multisignature scripts
 - BIP 14 for the protocol version and user agent string
 - BIP 21 for the Bitcoin URI scheme
 - BIP 31 for the pong network message
 - BIPs 62 and 66 for Low-S and Strict DER signatures
 - BIPs 141, 143, and 144 for Segregated Witness (Except for deployment)
 - BIP 173 for sending to bech32 addresses (since 0.96.5)

The upcoming Armory 0.97 adds a new wallet format and signer with support for:
 - BIP 32 for Hierarchical Deterministic wallets
 - BIP 39 for mnemonic seeds
 - BIPs 44, 49 and 84 for legacy, nested SegWit and native SegWit accounts
 - BIP 174 for Partially Signed Bitcoin Transactions (PSBT)
 - BIPs 150 and 151 to authenticate and encrypt the connection between Armory and a remote ArmoryDB

Taproot (`bc1p` addresses) is not supported yet.

## Will Armory work with full nodes other than Bitcoin Core?

If the full node is based on Bitcoin Core, then yes. Otherwise, most likely not. Armory directly reads from the block data files that Bitcoin Core and its forks produces. It also relies on the p2p network messages and the JSON-RPC server in order to communicate with Bitcoin Core. If the full node software does not use the same block data file format used by Bitcoin Core or does not support the same JSON-RPC functions, then it will not be compatible with Armory.

## Does Armory work with Bitcoin Core 28 and later?

Bitcoin Core 28.0 and later obfuscate the block files of a newly created data directory (the key is stored in `blocks/xor.dat`). Armory 0.97 reads obfuscated block files. Armory 0.96.x cannot: with 0.96.x, use a data directory created by an older Bitcoin Core, or create the node's data directory with `-blocksxor=0`.
