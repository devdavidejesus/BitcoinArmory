---
layout: page
title: Armory Pathing
permalink: /docs/pathing
id: pathing
---

* Table of Contents
{:toc}

The Armory stack uses 3 processes (your Bitcoin node, ArmoryDB and the ArmoryQt GUI) and 3 paths.

> This guide describes Armory 0.96.x. In Armory 0.97 a fourth process, CppBridge, sits between the GUI and ArmoryDB and starts ArmoryDB (and optionally your node) for you. The 3 paths are the same, but they are set in the Setup Manager that opens before the main window, and `armoryqt.conf` is no longer read. `armorydb.conf` is still read by ArmoryDB.

## Your Bitcoin node

It needs a single path, its datadir, where it maintains blockchain data. The block files live in the `blocks` subfolder of that datadir.

The node datadir defaults to:

~~~
"~/Bitcoin" on Windows (~ usually resolves to C:\Users\*username*\AppData\Roaming)
"~/.bitcoin" on Linux
"~/Library/Application Support/Bitcoin" on macOS
~~~

Armory's `--satoshi-datadir` accepts either the datadir itself or its `blocks` folder.

If you want to specify a custom datadir for your node, you'd run it with the -datadir command line (CLI) argument:

~~~
bitcoin-qt -datadir="/some/custom/path"
~~~

If instead of running BitcoinQt manually, you let Armory manage it for you, you have to give the custom blockchain datadir to Armory, using the --satoshi-datadir CLI arg:

~~~
armory --satoshi-datadir="/some/custom/path"
~~~

Note that Armory takes its CLI args with 2 dashes (--) whereas your node takes a single dash (-).

## ArmoryDB

Armory's DB process needs to know of 3 paths: the Armory datadir and the dbdir and the node datadir.

1. The datadir is where Armory's wallet and settings files are maintained. It defaults to:

        "~/Armory" on Windows
        "~/.armory" on Linux
        "~/Library/Application Support/Armory" on OSX

    You can set a custom datadir using the --datadir CLI arg:

        ArmoryDB --datadir="/some/custom/path"

2. The dbdir is where Armory's DB maintains its own files. It defaults to:

        "~/Armory/databases" on Windows
        "~/.armory/databases" on Linux
        "~/Library/Application Support/Armory/databases" on OSX

    As you can see, the dbdir defaults to the datadir + "/databases". If ArmoryDB is not given a custom dbdir, it will append "/databases" to the datadir.

    To set a custom dbdir, use the --dbdir CLI arg:

        ArmoryDB --dbdir="/some/custom/path"

3. The node datadir is described in section 1. The CLI arg to point ArmoryDB to a custom node datadir is `--satoshi-datadir`.

## ArmoryQt

ArmoryQt is a bit special in that, as the GUI, it manages both your node and the db by default. Therefore, the amount of paths it needs to know about may vary:

If ArmoryQt is running on its own, it only needs to know the Armory datadir.
If ArmoryQt is controlling ArmoryDB for you (>99% of use cases), it needs to know of the node datadir and dbdir.
If ArmoryQt is controlling your Bitcoin node (the default on Windows and Linux) it needs to know of the node datadir.

Assuming you want to run Armory with a custom node datadir and custom dbdir, with node and db controlled by the client, your command line would look like this:

    armory --satoshi-datadir="/custom/blockchain/path" --dbdir="/custom/database/path/"

## Config files

CLI args do not persist between runs. If you want to run Armory with custom paths, you need to start it with the same CLI args every time. The config files are a way around this.

There are 2 Armory config files:

armoryqt.conf (for the GUI)
armorydb.conf (for the db)

Both reside in Armory's datadir. Any CLI args you can feed to either the GUI or the db, you can put in the respective config file for it to persist.

Taking the previous example, you could pass the same path arguments in armoryqt.conf. The content of the file would look like this:

    satoshi-datadir="/custom/blockchain/path"
    dbdir="/custom/database/path"

The config file rules are as follows:

- config files can take any valid CLI args for their respective process
- CLI args provided to the process override args in the config file
- You do not need to prepend args in the config file with double dashes (--), but their use is legal
- one argument per line
- no spaces between the arg, the equal sign, and its value (if it applies, some args don't take value)

Because of the second property, the ArmoryDB config file is not useful for regular operations. Since in this case the GUI is managing the DB, it will pass it pathing arguments that will override anything in the .conf.
Generally, when it comes to pathing, you only really care about armoryqt.conf

## Example

Say you are Windows, and your user name is Adam.

We know that by default your paths are:

    Node datadir: C:\Users\Adam\AppData\Roaming\Bitcoin\blocks
    Armory datadir: C:\Users\Adam\AppData\Roaming\Armory
    Armory dbdir: C:\Users\Adam\AppData\Roaming\Armory\databases

Now let's say your blockchain data is on an external drive, at "D:\Bitcoin" and you want your database dir on that drive as well, at "D:\ArmoryDB".

To achieve this, you want to create/modify the GUI config file in your Armory datadir, which is `C:\Users\Adam\AppData\Roaming\Armory\armoryqt.conf`. The config file should look like this:

    satoshi-datadir="D:\Bitcoin\blocks"
    dbdir="D:\ArmoryDB"

