mkdir -p ../../hlf-network/vars/chaincode/coffee-supply-chain-hlf/go

cp spec.yaml ../../hlf-network/
cp minifab ../../hlf-network/

cp -R ../* ../../hlf-network/vars/chaincode/coffee-supply-chain-hlf/go

cd ../../hlf-network/

./minifab up -o farmer -n coffee-supply-chain-hlf -i 2.3 -d false -l go -v 1.0 -r true -s couchdb -e 7000