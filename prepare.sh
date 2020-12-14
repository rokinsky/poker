#!/usr/bin/env bash

apt-get update -qy
apt-get install curl -qy

# Node.js 12.x sources
curl -sL https://deb.nodesource.com/setup_12.x | bash

# Yarn sources
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

apt-get update -qy
apt-get install nodejs yarn -qy

yarn
yarn build
