package main

import (
	"log"

	"github.com/coffee-supply-chain-hlf/chaincode/smartcontracts"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	farmerContract := new(smartcontracts.FarmerContract)
	processorContract := new(smartcontracts.ProcessorContract)
	roasterContract := new(smartcontracts.RoasterContract)
	supplierContract := new(smartcontracts.SupplierContract)
	retailerContract := new(smartcontracts.RetailerContract)

	chaincode, err := contractapi.NewChaincode(farmerContract, processorContract, roasterContract, supplierContract, retailerContract)

	if err != nil {
		log.Printf("Error creating chaincode: %s", err.Error())
	}

	if err := chaincode.Start(); err != nil {
		log.Printf("Error starting chaincode: %s", err.Error())
	}
}
