#!/bin/bash

adapter_path=("./farmer" "./processor" "./roaster" "./supplier" "./retailer")

# update db scripts
for path in ${adapter_path[@]}; do
  cd ${path}
  echo updating env vars for ${path}
  ./deployment/set_env_vars.sh
  cd ..
done