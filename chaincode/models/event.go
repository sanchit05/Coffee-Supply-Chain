package models

type Batch struct {
	TxnID   string `json:"txnId"`
	BatchID string `json:"batchId"`
	Org     string `json:"org"`
}
