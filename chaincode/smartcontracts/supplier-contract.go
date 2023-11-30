package smartcontracts

import (
	"encoding/json"
	"fmt"

	"github.com/coffee-supply-chain-hlf/chaincode/models"
	"github.com/coffee-supply-chain-hlf/chaincode/utils"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SupplierContract struct {
	contractapi.Contract
}

func (sc *SupplierContract) SupplyBatch(ctx contractapi.TransactionContextInterface, batchID string) (bool, error) {
	txnID := ctx.GetStub().GetTxID()

	utils.LogMessage("SupplierContract.SupplyBatch", "Recieved transaction to store a supplied batch", batchID, txnID)

	if batchID == "" {
		return false, fmt.Errorf("SupplierContract.SupplyBatch: Batch ID is empty")
	}

	batchStr, err := utils.GetBatchFromTransient(ctx)
	if err != nil {
		return false, fmt.Errorf("error while getting batch data from transient: %s", err)
	}

	var batch models.SupplierBatch
	err = json.Unmarshal(batchStr, &batch)
	if err != nil {
		return false, fmt.Errorf("failed to unmarshal JSON: %s", err)
	}

	batch.TxnID = txnID

	err = utils.PutState(ctx, batchID, batch)
	if err != nil {
		return false, fmt.Errorf("error while creating batch. BatchId: %s, error: %w", batchID, err)
	}

	batchSuppliedEvent := models.Batch{
		BatchID: batchID,
		TxnID:   txnID,
		Org:     utils.SUPPLIER_ROLE,
	}

	err = utils.SetEvent(ctx, utils.BATCH_SUPPLIED_EVENT, batchSuppliedEvent)
	if err != nil {
		return false, fmt.Errorf("error while setting event, %w", err)
	}

	utils.LogMessage("SupplierContract.SupplyBatch", "Stored supply batch data on ledger", batchID, ctx.GetStub().GetTxID())

	return true, nil
}

func (fc *FarmerContract) QuerySuppliedBatchById(
	ctx contractapi.TransactionContextInterface,
	batchId string,
) (*models.SupplierBatch, error) {
	batchStr, err := ctx.GetStub().GetState(batchId)
	if err != nil {
		return nil, fmt.Errorf("error while getting state, %w", err)
	}

	var supplyBatch *models.SupplierBatch
	err = json.Unmarshal(batchStr, &supplyBatch)
	if err != nil {
		return nil, fmt.Errorf("error while unmarshalling data for batch id:%s, Error:%w", batchId, err)
	}

	return supplyBatch, nil
}
