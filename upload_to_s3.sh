#!/bin/bash
export AWS_DEFAULT_PROFILE=cloudsarelies
aws configure --profile $AWS_DEFAULT_PROFILE
aws s3 cp . s3://www.cloudsarelies.com --recursive --exclude ".*"
