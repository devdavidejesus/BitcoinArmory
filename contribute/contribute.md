---
layout: contribute
title: Contribute
description: "How to contribute to Armory: code and code review, bug reports, translations and the website."
permalink: /contribute/
id: contribute
---

Contributing to Armory can be done through submitting code via Pull Requests, reviewing code, and submitting bug reports.

## Contribute and review code

Fork the repository and base your patch on the branch currently used for development: for the 0.97 cycle, pull requests target [`rc2_fixes`](https://github.com/goatpig/BitcoinArmory/tree/rc2_fixes) (`dev` and `master` hold the previous development and stable lines). Work on a topic branch in your own fork, then submit a Pull Request. The code will be reviewed by other developers and then merged in by the project lead.

To review code, simply choose a Pull Request to review and read over the changes made by the PR. Leave comments if there is anything that you think should be different.

For ideas on what to contribute, take a look at the [issue tracker](https://github.com/goatpig/BitcoinArmory/issues) and the [Armory to-do list](/contribute/armory-todo/).

## Contribute to the website

Like contributing to the project, you can also contribute to the website. Fork the [gh-pages branch](https://github.com/goatpig/BitcoinArmory/tree/gh-pages) of the repo. Make your changes and submit a Pull Request.

For ideas on what to contribute, take a look at the [Website to-do list](/contribute/website-todo/).

## Report bugs

The project utilizes the issue tracker feature of github. If you find a bug in the software, submit a new issue to the [issue tracker](https://github.com/goatpig/BitcoinArmory/issues). Be sure to include the Armory logfile and replication instructions. If necessary, include Bitcoin Core's debug.log file.

## Translations

Armory's interface translations live in the [`lang/`](https://github.com/goatpig/BitcoinArmory/tree/rc2_fixes/lang) folder as Qt Linguist files: Danish, German, Greek, Spanish, French, Hebrew, Croatian, Indonesian, Russian and Swedish, at very different levels of completeness. Translations are made on the [Bitcoin Armory Software project on Transifex](https://explore.transifex.com/bitcoin-armory/bitcoin-armory-software/). The files in the repository were last synced from Transifex in 2017, so the strings there are still those of the 0.96 interface; open an issue before starting a translation so the strings can be updated for 0.97 first. The website is English-only.

## Contributors

Since 2011, Armory has received code from dozens of contributors, starting with Alan Reiner and the Armory Technologies team. See the [contributors page on GitHub](https://github.com/goatpig/BitcoinArmory/graphs/contributors) (it only counts the default branch and commits linked to a GitHub account), or run `git shortlog -sn` on the branch you are interested in for the complete history.
