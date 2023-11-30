package utils

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type CommonUtils struct {
	contractapi.Contract
}

func CreateCompositeKey(ctx contractapi.TransactionContextInterface, objectType string, id string) (string, error) {
	key, err := ctx.GetStub().CreateCompositeKey(objectType, []string{id})
	if err != nil {
		return key, fmt.Errorf("error while creating composite key for %s %s, error:%w", objectType, id, err)
	}

	return key, nil
}

func GetTransientData(ctx contractapi.TransactionContextInterface, key string) ([]byte, error) {
	transientData, err := ctx.GetStub().GetTransient()
	if err != nil {
		return nil, fmt.Errorf("error while getting transient data. %w", err)
	}

	dataStr, ok := transientData[key]
	if !ok {
		return nil, fmt.Errorf("'%s' in the transient map input does not exist", key)
	}

	return dataStr, nil
}

func GetBatchFromTransient(ctx contractapi.TransactionContextInterface) ([]byte, error) {
	batchStr, err := GetTransientData(ctx, DOCTYPE_BATCH)
	if err != nil {
		return nil, fmt.Errorf("error while getting transient data, %w", err)
	}

	return batchStr, nil
}

func SetEvent(ctx contractapi.TransactionContextInterface, eventName string, event interface{}) error {
	eventsStr, err := json.Marshal(event)
	if err != nil {
		return fmt.Errorf("error while marshalling events type: %s, Error:%w", eventName, err)
	}

	err = ctx.GetStub().SetEvent(eventName, eventsStr)
	if err != nil {
		return fmt.Errorf("error while setting %s event. Error: %w", eventName, err)
	}

	return nil
}

func GetState(ctx contractapi.TransactionContextInterface, key string) ([]byte, error) {
	state, err := ctx.GetStub().GetState(key)
	if err != nil {
		return nil, fmt.Errorf("error while getting record from world state. Id:%s ,Error:%w", key, err)
	}
	if state == nil {
		return nil, fmt.Errorf("state does not exist for Id:%s in world state", key)
	}

	return state, nil
}

func PutState(ctx contractapi.TransactionContextInterface, key string, v interface{}) error {
	stateStr, err := json.Marshal(v)

	if err != nil {
		return fmt.Errorf("error while marshalling state. key: %s, Error:%w", key, err)
	}

	err = ctx.GetStub().PutState(key, stateStr)
	if err != nil {

		return fmt.Errorf("error while putting state in World state. key: %s, Error: %w", key, err)
	}

	return nil
}
