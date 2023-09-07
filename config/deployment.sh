#!/bin/bash
ECR_REGISTRY="xxxxxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com"
ECR_REPOSITORY="nodejs-demo"
IMAGE_NAME="xxxxxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/nodejs-demo"
IMAGE_TAG="latest"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region $AWS_REGION
aws ecr get-login-password --region $AWS_REGION | sudo docker login --username AWS --password-stdin $ECR_REGISTRY

sudo docker pull $IMAGE_NAME:$IMAGE_TAG
docker stop nodejs-app || true
docker rm nodejs-app || true
docker run -d -p 8080:3000 --name nodejs-app "$IMAGE_NAME:$IMAGE_TAG"
