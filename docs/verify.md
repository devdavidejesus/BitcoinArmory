---
layout: page
title: Verifying Binaries
permalink: /docs/verify
id: verify
---

* Table of Contents
{:toc}

Only download Armory from the [GitHub releases page](https://github.com/goatpig/BitcoinArmory/releases); other websites offering "Armory" downloads are not run by the Armory developers. Always verify Armory binaries before you run them. Verification proves that the file you downloaded is exactly the one the Armory developers signed, and was not modified by a compromised mirror, a malicious link or a network attacker.

## 1. Get the Armory signing key

You need GnuPG: it is included in most Linux distributions; on macOS use [GPG Suite](https://gpgtools.org/) or `brew install gnupg`; on Windows use [Gpg4win](https://www.gpg4win.org/).

Armory releases are signed with goatpig's offline signing key:

~~~
goatpig (Offline signing key for Armory releases) <moothecowlord@gmail.com>
Fingerprint: 745D 707F BA53 968B DF63  AA8D 8C52 1176 4922 589A
~~~

Import it **by its full fingerprint** (short 8-character key IDs such as `4922589A` can be forged and should not be relied on):

~~~ bash
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys 745D707FBA53968BDF63AA8D8C5211764922589A
~~~

The same key is also published in the source repository at [`PublicKeys/goatpig-signing-key.asc`](https://github.com/goatpig/BitcoinArmory/blob/master/PublicKeys/goatpig-signing-key.asc), so you can cross-check it from a second source:

~~~ bash
curl -sSLO https://raw.githubusercontent.com/goatpig/BitcoinArmory/master/PublicKeys/goatpig-signing-key.asc
gpg --show-keys --with-fingerprint goatpig-signing-key.asc
~~~

Make sure the fingerprint printed by GPG matches the one above exactly.

## 2. Download the release files

From the [GitHub releases page](https://github.com/goatpig/BitcoinArmory/releases), download:

 - the installer or package for your platform, and
 - the GPG-signed SHA256 hash file published with the same release: `sha256sum.txt.asc` for 0.96.5 (the name varies between older releases, for example `sha256sum.asc` for 0.96.4).

In the commands below, replace `SIGNED_HASH_FILE` with the name of that file.

## 3. Check the signature of the hash file

~~~ bash
gpg --verify SIGNED_HASH_FILE
~~~

You must see `Good signature from "goatpig (Offline signing key for Armory releases)"` and the primary key fingerprint `745D 707F BA53 968B DF63  AA8D 8C52 1176 4922 589A`.

The warning `This key is not certified with a trusted signature` only means that you have not personally certified the key in your keyring; it is expected. A `BAD signature` means the file must not be trusted.

## 4. Check the hash of your download

Pick your operating system:

<div class="os-tabs" role="group" aria-label="Choose your operating system">
<input type="radio" name="os" id="os-linux" checked>
<label for="os-linux">Linux</label>
<input type="radio" name="os" id="os-macos">
<label for="os-macos">macOS</label>
<input type="radio" name="os" id="os-windows">
<label for="os-windows">Windows</label>

<div class="os-tabs__panel os-tabs__panel--linux" markdown="1">

~~~ bash
sha256sum --ignore-missing -c SIGNED_HASH_FILE
~~~

The file you downloaded must be reported as `OK`. You can ignore warnings about improperly formatted lines.

</div>
<div class="os-tabs__panel os-tabs__panel--macos" markdown="1">

Print the hash of your download and compare it with the matching line in the signed hash file:

~~~ bash
shasum -a 256 DOWNLOADED_FILE
~~~

The two hashes must match exactly.

</div>
<div class="os-tabs__panel os-tabs__panel--windows" markdown="1">

In PowerShell, print the hash of your download and compare it with the matching line in the signed hash file:

~~~ powershell
Get-FileHash .\DOWNLOADED_FILE -Algorithm SHA256
~~~

The two hashes must be the same. PowerShell prints letters in upper case and the hash file uses lower case; that difference does not matter.

</div>
</div>

If anything does not match, delete the file and do not run it.

## Verifying the source code

Most releases are also tagged in the git repository with a signed tag. See [Building From Source](/docs/building/) for how to check a tag with `git tag -v`, and for the older releases signed with a different key.
