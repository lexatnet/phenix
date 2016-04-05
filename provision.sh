#!/bin/bash

# install utils
sudo apt-get install -y git-core curl
sudo apt-get install software-properties-common python-software-properties

# add postgresql repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get upgrade

# install postgresql server
sudo apt-get install -y postgresql postgresql-contrib
# create db user
sudo -u postgres psql -c "CREATE USER admin WITH PASSWORD 'password';"
# create data base
sudo -u postgres createdb app
# load dump
sudo -u postgres psql app < /home/vagrant/content/db/create.sql

# install nvm
wget --quiet -O - https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash >> nvm.instalation.log
echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
source /home/vagrant/.profile

# install node
nvm install stable
nvm alias default stable


# add redis repository
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
# install redis
sudo apt-get install -y redis-server

cd app

# build application
npm install
# start application
npm start
