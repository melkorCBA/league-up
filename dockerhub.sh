#! /bin/bash
# setting node path
echo 'setting node path';
PATH="C:/Program Files/nodejs:$PATH";

# build
echo 'building image for' $instance;
docker build -t melkorcba/standingsapp .
# # push
echo 'pushing image to' $instance;
docker push melkorcba/standingsapp
# # # release
# echo 'releasing image to' $instance;
# npm.cmd run -s heroku-release $instance;

