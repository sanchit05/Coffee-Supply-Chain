cd ../hlf-network/vars/chaincode/coffee-supply-chain-hlf/go

rm -rf *

cp -R ../../../../../chaincode/* .

cd ../../../../

./minifab ccup -v $1 -n coffee-supply-chain-hlf -l go

