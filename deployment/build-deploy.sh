#!/bin/bash

printf "\nBuilding...\n"

cd ../adapter

./build.sh

printf "\nDeploying...\n"

cd ../deployment
./start_all_component.sh

printf "\nDone!\n"
