#! /bin/bash
# setting node path
echo 'setting node path';
PATH="C:/Program Files/nodejs:$PATH";

instance="melkorcba/standingsapp";

# build
echo 'building image for' $instance;
docker build -t $instance .
# # push
echo 'pushing image to dockerhub ' $instance;
docker push $instance



