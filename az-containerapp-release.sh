#! /bin/bash
# setting node path
echo 'setting node path';
PATH="C:/Program Files/nodejs:$PATH";

APPLICATION_NAME="standing-app";
RESOURCE_GROUP_NAME="containerapps-standingboard-RG";
IMAGE_NAME="melkorcba/standingsapp";

echo 'revisioning container' $IMAGE_NAME ;
az.cmd containerapp update --name $APPLICATION_NAME --resource-group $RESOURCE_GROUP_NAME --image $IMAGE_NAME

