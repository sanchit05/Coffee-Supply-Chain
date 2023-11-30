package smartcontracts

import (
	"encoding/json"
	"fmt"

	"github.com/coffee-supply-chain-hlf/chaincode/models"
	"github.com/coffee-supply-chain-hlf/chaincode/utils"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type RoasterContract struct {
	contractapi.Contract
}

func (roc *RoasterContract) RoastBatch(ctx contractapi.TransactionContextInterface, batchID string) (bool, error) {
	txnID := ctx.GetStub().GetTxID()

	utils.LogMessage("RoasterContract.RoastBatch", "Recieved transaction to store a roasted batch data", batchID, txnID)

	if batchID == "" {
		return false, fmt.Errorf("RoasterContract.RoastBatch: Batch ID is empty")
	}

	batchStr, err := utils.GetBatchFromTransient(ctx)
	if err != nil {
		return false, fmt.Errorf("error while getting batch data from transient: %s", err)
	}

	var batch models.RoasterBatch
	err = json.Unmarshal(batchStr, &batch)
	if err != nil {
		return false, fmt.Errorf("failed to unmarshal JSON: %s", err)
	}

	batch.TxnID = txnID

	err = utils.PutState(ctx, batchID, batch)
	if err != nil {
		return false, fmt.Errorf("error while creating batch. BatchId: %s, error: %w", batchID, err)
	}

	batchRoastedEvent := models.Batch{
		BatchID: batchID,
		TxnID:   txnID,
		Org:     utils.ROASTER_ROLE,
	}

	err = utils.SetEvent(ctx, utils.BATCH_ROASTED_EVENT, batchRoastedEvent)
	if err != nil {
		return false, fmt.Errorf("error while setting event, %w", err)
	}

	utils.LogMessage("RoasterContract.RoastBatch", "Stored roasted batch data on ledger", batchID, ctx.GetStub().GetTxID())

	return true, nil
}

func (fc *FarmerContract) QueryRoastedBatchById(
	ctx contractapi.TransactionContextInterface,
	batchId string,
) (*models.RoasterBatch, error) {
	batchStr, err := ctx.GetStub().GetState(batchId)
	if err != nil {
		return nil, fmt.Errorf("error while getting state, %w", err)
	}

	var roastBatch *models.RoasterBatch
	err = json.Unmarshal(batchStr, &roastBatch)
	if err != nil {
		return nil, fmt.Errorf("error while unmarshalling data for batch id:%s, Error:%w", batchId, err)
	}

	return roastBatch, nil
}
