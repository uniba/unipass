
# Unipass

Passbook web application for demonstration.

## Requirement

* Node v0.8.x

## Installation

#### Setup

    $ git clone git@github.com:uniba/Unipass.git
    $ cd Unipass
    $ npm i

#### Run

    $ DEBUG=unipass:* ./node_modules/.bin/node-dev app.js
    $ open http://`hostname`:3000

#### Stop

Press `Ctrl + C` on your terminal or;

    $ killall node
    
## Deployment

    $ cap deploy
    $ open https://pass.uniba.jp/

## Credit

Copyright (c) 2012 Uniba Inc. &lt;info@uniba.jp&gt;