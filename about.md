---
layout: page
title: About
description: "About Armory, the open-source Bitcoin wallet created in 2011: its history, its developers and the technology behind it."
permalink: /about/
id: about
---

Armory is an open-source Bitcoin wallet focused on security and self-custody. It lets you manage multiple wallets (including watching-only wallets), print paper backups, import or sweep private keys, and keep your savings on a computer that never touches the internet while still being able to monitor incoming payments and create outgoing transactions with the help of a USB key.

**Armory has no independent networking components built in.** Instead, it relies on Bitcoin Core to connect to peers, validate blockchain data and broadcast transactions. Reimplementing the networking and consensus code would be fraught with bugs, security holes and possible chain splits; relying on Bitcoin Core makes Armory more secure.

Armory was created by Alan Reiner in 2011 and later developed by Armory Technologies, Inc. It has since been maintained as a community open-source project led by goatpig, whose fork of the original repository dates from February 2016.

Credits
-------
**Open Source Project:**

 - Farhod Fathpour (@goatpig) - Open Source Project Lead
 - All [contributors on GitHub](https://github.com/goatpig/BitcoinArmory/graphs/contributors)

[Current source code repository](https://github.com/goatpig/BitcoinArmory)

**Armory Technologies, Inc. (no longer participating):**

 - Alan Reiner (@etotheipi) - Project Creator and Former Project Lead
 - Andy Ofiesh (@AndyOfiesh) - Former Lead Developer
 - Farhod Fathpour (@goatpig) - Former Developer
 - Charles Samuels (@njaard) - Former Developer
 - Douglas Roark (@droark) - Former Developer
 - Jimmy Song (@jimmysong) - Former Developer

[Original source code repository](https://github.com/etotheipi/BitcoinArmory)

**Built with:**

 - [Bitcoin Core](https://bitcoincore.org/)
 - [Python 3](https://www.python.org/) with [PySide](https://doc.qt.io/qtforpython/) and [QtPy](https://github.com/spyder-ide/qtpy) (Qt for Python)
 - [LMDB](https://www.symas.com/lmdb)
 - [libwebsockets](https://libwebsockets.org/)
 - [Cap'n Proto](https://capnproto.org/) and [pycapnp](https://github.com/capnproto/pycapnp)
 - [libbtc](https://github.com/libbtc/libbtc), including [libsecp256k1](https://github.com/bitcoin-core/secp256k1)
 - ChaCha20-Poly1305, to encrypt the connections between Armory's components

This is the stack of the upcoming 0.97 release. The 0.96.x releases were built with Crypto++, SWIG, Python 2, PyQt4 and Twisted.

## License

Armory is distributed partially under the GNU Affero General Public License (AGPL v3) and partially under the MIT License. See the [LICENSE file](https://github.com/goatpig/BitcoinArmory/blob/master/LICENSE).
