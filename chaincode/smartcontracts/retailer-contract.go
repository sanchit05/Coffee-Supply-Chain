package smartcontracts

import (
	"encoding/json"
	"fmt"

	"github.com/coffee-supply-chain-hlf/chaincode/models"
	"github.com/coffee-supply-chain-hlf/chaincode/utils"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type RetailerContract struct {
	contractapi.Contract
}

func (rec *RetailerContract) RetailBatch(ctx contractapi.TransactionContextInterface, batchID string) (bool, error) {
	txnID := ctx.GetStub().GetTxID()

	utils.LogMessage("RetailerContract.RetailBatch", "Recieved transaction to store a retail batch", batchID, txnID)

	if batchID == "" {
		return false, fmt.Errorf("RetailerContract.RetailBatch: Batch ID is empty")
	}

	batchStr, err := utils.GetBatchFromTransient(ctx)
	if err != nil {
		return false, fmt.Errorf("error while getting batch data from transient: %s", err)
	}

	var batch models.RetailerBatch
	err = json.Unmarshal(batchStr, &batch)
	if err != nil {
		return false, fmt.Errorf("failed to unmarshal JSON: %s", err)
	}

	batch.TxnID = txnID

	err = utils.PutState(ctx, batchID, batch)
	if err != nil {
		return false, fmt.Errorf("error while creating batch. BatchId: %s, error: %w", batchID, err)
	}

	batchRetailEvent := models.Batch{
		BatchID: batchID,
		TxnID:   txnID,
		Org:     utils.RETAILER_ROLE,
	}

	err = utils.SetEvent(ctx, utils.BATCH_RETAIL_EVENT, batchRetailEvent)
	if err != nil {
		return false, fmt.Errorf("error while setting event, %w", err)
	}

	utils.LogMessage("RetailerContract.RetailBatch", "Stored retail batch data on ledger", batchID, ctx.GetStub().GetTxID())

	return true, nil
}

func (fc *FarmerContract) QueryRetailBatchById(
	ctx contractapi.TransactionContextInterface,
	batchId string,
) (*models.RetailerBatch, error) {
	batchStr, err := ctx.GetStub().GetState(batchId)
	if err != nil {
		return nil, fmt.Errorf("error while getting state, %w", err)
	}

	var retailBatch *models.RetailerBatch
	err = json.Unmarshal(batchStr, &retailBatch)
	if err != nil {
		return nil, fmt.Errorf("error while unmarshalling data for batch id:%s, Error:%w", batchId, err)
	}

	return retailBatch, nil
}
