#!/bin/bash

npm run build

DOCKER_BUILDKIT=1 docker build -f deployment/Dockerfile -t coffee-supply-chain-hlf .
