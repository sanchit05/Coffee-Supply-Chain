#! /bin/bash

ADAPTER_PATH=../adapter
adapter_path=("./farmer" "./processor" "./roaster" "./supplier" "./retailer")

# update db scripts
for path in ${adapter_path[@]}; do
  cd ${path}
  ./start-components.sh
  cd ..
done

