---
layout: page
title: Building Armory From Source
id: building
permalink: /docs/building/
---

* Table of Contents
{:toc}

Precompiled binaries, with a GPG-signed list of their SHA256 hashes, are available on the [Releases](/releases/) page. Building from source is useful if there is no binary for your platform, or if you want to audit exactly what you run.

## Build instructions

Build instructions are kept in the source repository, next to the code they describe, so they stay in sync with it.

**Armory 0.97** (upcoming release, developed on the `rc2_fixes` branch):

 - [Linux](https://github.com/goatpig/BitcoinArmory/blob/rc2_fixes/build_instructions/linux/linux.md)
 - [Windows](https://github.com/goatpig/BitcoinArmory/blob/rc2_fixes/build_instructions/windows/Windows_build_notes.md)
 - macOS: there is no maintained guide for 0.97 yet. The [old macOS notes](https://github.com/goatpig/BitcoinArmory/blob/rc2_fixes/build_instructions/osx/macOS_build_notes.md) are kept for reference and are unlikely to work as-is.

**Armory 0.96.x** (current stable release, `master` branch):

 - [Linux](https://github.com/goatpig/BitcoinArmory/blob/master/linuxbuild/Linux_build_notes.md)
 - [macOS](https://github.com/goatpig/BitcoinArmory/blob/master/osxbuild/macOS_build_notes.md)
 - [Windows](https://github.com/goatpig/BitcoinArmory/blob/master/windowsbuild/Windows_build_notes.md)

## Verifying source code authenticity

Releases from 0.95.0 onwards are tagged in the git repository with a tag signed by the [Armory signing key](/docs/verify). First import the key by its full fingerprint:

~~~ bash
gpg --keyserver hkps://keyserver.ubuntu.com --recv-keys 745D707FBA53968BDF63AA8D8C5211764922589A
~~~

Then clone the repository, check the tag you want to build and check it out:

~~~ bash
git clone https://github.com/goatpig/BitcoinArmory.git
cd BitcoinArmory
git tag -v v0.96.5     # must report a Good signature from the Armory signing key
git checkout v0.96.5
~~~

Replace `v0.96.5` with the release you want to build (the 0.96.0 release is tagged `v0.96`). All releases are listed on the [GitHub releases page](https://github.com/goatpig/BitcoinArmory/releases).

Exceptions: the 0.94.0 and 0.94.1 tags and the `0.97-RC1` pre-release tag are not signed. Releases 0.93.3 and earlier were signed with the old Armory Technologies key (Alan Reiner, key ID `4AB16AEA98832223`).
