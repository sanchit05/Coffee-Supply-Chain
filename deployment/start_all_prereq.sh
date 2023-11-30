#! /bin/bash

ADAPTER_PATH=../adapter
adapter_path=("./farmer" "./processor" "./roaster" "./supplier" "./retailer")

# update db scripts
for path in ${adapter_path[@]}; do
  cd ${path}
  ./copy_certs.sh
  ./deployment/set_env_vars.sh
  ./start-prereq.sh &
  cd ..
done

sleep 50
