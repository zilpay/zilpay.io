#!/bin/bash

echo $(pwd)

docker --version
aws --version

echo $TRAVIS_COMMIT
commit=$(git rev-parse --short=7 $TRAVIS_COMMIT)

accountID=$(aws sts get-caller-identity --output text --query 'Account')
regionID=us-west-2
application=zilpay.io
registryURL=${accountID}.dkr.ecr.${regionID}.amazonaws.com/$application

eval "$(aws ecr get-login --no-include-email --region $regionID)"
docker build -t "$registryURL:latest" -t "$registryURL:$commit" .
if [ $? -eq 1 ]
then
   exit 1
fi
docker push "$registryURL:latest"
docker push "$registryURL:$commit"