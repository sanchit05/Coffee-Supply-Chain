CWD=$(pwd | sed 's/\/deployment/\t/g' | awk '{ print $1 }')
HLF_NETWORK_DIR=$CWD/hlf-network/vars/keyfiles
ORG_NAME=processor

rm -rf certs/ca/*
rm -rf certs/peer/*
rm -rf certs/orderer/*

cp $HLF_NETWORK_DIR/peerOrganizations/$ORG_NAME/peers/peer0.$ORG_NAME/tls/ca.crt certs/ca/
cp $HLF_NETWORK_DIR/peerOrganizations/$ORG_NAME/peers/peer0.$ORG_NAME/tls/ca.crt certs/peer/
cp $HLF_NETWORK_DIR/ordererOrganizations/orderer/orderers/orderer0.orderer/tls/ca.crt certs/orderer/

