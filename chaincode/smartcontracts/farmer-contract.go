package smartcontracts

import (
	"encoding/json"
	"fmt"

	"github.com/coffee-supply-chain-hlf/chaincode/models"
	"github.com/coffee-supply-chain-hlf/chaincode/utils"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type FarmerContract struct {
	contractapi.Contract
}

func (fc *FarmerContract) CreateBatch(ctx contractapi.TransactionContextInterface, batchID string) (bool, error) {
	txnID := ctx.GetStub().GetTxID()

	utils.LogMessage("FarmerContract.CreateBatch", "Recieved transaction to store a grown batch", batchID, txnID)

	if batchID == "" {
		return false, fmt.Errorf("FarmerContract.CreateBatch: Batch ID is empty")
	}

	batchStr, err := utils.GetBatchFromTransient(ctx)
	if err != nil {
		return false, fmt.Errorf("error while getting batch data from transient: %s", err)
	}

	var batch models.FarmerBatch
	err = json.Unmarshal(batchStr, &batch)
	if err != nil {
		return false, fmt.Errorf("failed to unmarshal JSON: %s", err)
	}

	batch.TxnID = txnID

	err = utils.PutState(ctx, batchID, batch)
	if err != nil {
		return false, fmt.Errorf("error while creating batch. BatchId: %s, error: %w", batchID, err)
	}

	batchGrownEvent := models.Batch{
		BatchID: batchID,
		TxnID:   txnID,
		Org:     utils.FARMER_ROLE,
	}

	err = utils.SetEvent(ctx, utils.BATCH_GROWN_EVENT, batchGrownEvent)
	if err != nil {
		return false, fmt.Errorf("error while setting event, %w", err)
	}

	utils.LogMessage("FarmerContract.CreateBatch", "Stored batch data on ledger", batchID, ctx.GetStub().GetTxID())

	return true, nil
}

func (fc *FarmerContract) QueryGrownBatchById(
	ctx contractapi.TransactionContextInterface,
	batchId string,
) (*models.FarmerBatch, error) {
	batchStr, err := ctx.GetStub().GetState(batchId)
	if err != nil {
		return nil, fmt.Errorf("error while getting state, %w", err)
	}

	var grownBatch *models.FarmerBatch
	err = json.Unmarshal(batchStr, &grownBatch)
	if err != nil {
		return nil, fmt.Errorf("error while unmarshalling data for batch id:%s, Error:%w", batchId, err)
	}

	return grownBatch, nil
}
