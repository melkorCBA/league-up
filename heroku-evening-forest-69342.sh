#! /bin/bash
# setting node path
echo 'setting node path';
PATH="C:/Program Files/nodejs:$PATH";

instance="evening-forest-69342";

# build
#echo 'building image for' $instance;
#npm.cmd run -s dockerbuild Dockerfile registry.heroku.com/$instance/web;
# # push
#echo 'pushing image to' $instance;
#npm.cmd run -s heroku-push registry.heroku.com/$instance/web;
# # # # release
 echo 'releasing image to' $instance;
npm.cmd run -s heroku-release $instance;