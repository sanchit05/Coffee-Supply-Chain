package models

type FarmerBatch struct {
	BatchID             string  `json:"batchId"`
	TxnID               string  `json:"txnId"`
	BatchStatus         string  `json:"batchStatus"`
	SeedType            string  `json:"seedType"`
	PlantationDate      string  `json:"plantationDate"`
	FarmerName          string  `json:"farmerName"`
	GrowingChargePerKg  float64 `json:"growingChargePerKg"`
	BatchGenerationDate string  `json:"batchGenerationDate"`
	BatchWeight         float64 `json:"batchWeight"`
	BatchPrice          float64 `json:"batchPrice"`
	BatchSellDate       string  `json:"batchSellDate"`
}

type ProcessorBatch struct {
	BatchID               string  `json:"batchId"`
	TxnID                 string  `json:"txnId"`
	BatchStatus           string  `json:"batchStatus"`
	ProcessingType        string  `json:"processingType"`
	DateOfTransport       string  `json:"dateOfTransport"`
	FarmerName            string  `json:"farmerName"`
	FarmerBatchID         string  `json:"farmerBatchId"`
	BatchPurchaseDate     string  `json:"batchPurchaseDate"`
	BatchPurchasePrice    float64 `json:"batchPurchasePrice"`
	BatchPurchaseWeight   float64 `json:"batchPurchaseWeight"`
	BatchProcessingDate   string  `json:"batchProcessingDateString"`
	ProcessorName         string  `json:"processorName"`
	ProcessorAddress      string  `json:"processorAddress"`
	ProcessorContact      int     `json:"processorContact"`
	ProcessingChargePerKg float64 `json:"processingChargePerKg"`
	ProcessedBatchPrice   float64 `json:"processedBatchPrice"`
	ProcessedBatchWeight  float64 `json:"processedBatchWeight"`
	BatchSellDate         string  `json:"batchSellDate"`
}

type RoasterBatch struct {
	BatchID             string  `json:"batchId"`
	TxnID               string  `json:"txnId"`
	BatchStatus         string  `json:"batchStatus"`
	RoasingType         string  `json:"roasingType"`
	DateOfTransport     string  `json:"dateOfTransport"`
	ProcessorName       string  `json:"processorName"`
	ProcessorBatchID    string  `json:"processorBatchId"`
	BatchPurchaseDate   string  `json:"batchPurchaseDate"`
	BatchPurchasePrice  float64 `json:"batchPurchasePrice"`
	BatchPurchaseWeight float64 `json:"batchPurchaseWeight"`
	RoasterName         string  `json:"roasterName"`
	RoasterAddress      string  `json:"roasterAddress"`
	RoasterContact      int     `json:"roasterContact"`
	RoastingTemperature float64 `json:"roastingTemperature"`
	RoastingTime        string  `json:"roastingTime"`
	RoastingChargePerKg float64 `json:"roastingChargePerKg"`
	RoastedBatchPrice   float64 `json:"roastedBatchPrice"`
	RoastedBatchWeight  float64 `json:"roastedBatchWeight"`
	BatchSellDate       string  `json:"batchSellDate"`
}

type SupplierBatch struct {
	BatchID              string  `json:"batchId"`
	TxnID                string  `json:"txnId"`
	BatchStatus          string  `json:"batchStatus"`
	DateOfTransport      string  `json:"dateOfTransport"`
	RoasterName          string  `json:"roasterName"`
	RoasterBatchID       string  `json:"roasterBatchId"`
	BatchPurchaseDate    string  `json:"batchPurchaseDate"`
	BatchPurchasePrice   float64 `json:"batchPurchasePrice"`
	BatchPurchaseWeight  float64 `json:"batchPurchaseWeight"`
	SupplierName         string  `json:"supplierName"`
	SupplierAddress      string  `json:"supplierAddress"`
	SupplierContact      int     `json:"supplierContact"`
	PackagingDate        string  `json:"packagingDate"`
	PackagingWeight      float64 `json:"packagingWeight"`
	PackagingChargePerKg float64 `json:"packagingChargePerKg"`
	PackagedBatchPrice   float64 `json:"packagedBatchPrice"`
	PackagedBatchWeight  float64 `json:"packagedBatchWeight"`
	ShippingChargePerKg  float64 `json:"shippingChargePerKg"`
	ShippingBatchPrice   float64 `json:"shippingBatchPrice"`
	BatchSellDate        string  `json:"batchSellDate"`
}

type RetailerBatch struct {
	BatchID                 string  `json:"batchId"`
	TxnID                   string  `json:"txnId"`
	BatchStatus             string  `json:"batchStatus"`
	DateOfShipping          string  `json:"dateOfShipping"`
	SupplierName            string  `json:"supplierName"`
	SupplierBatchID         string  `json:"supplierBatchId"`
	BatchPurchaseDate       string  `json:"batchPurchaseDate"`
	BatchPurchasePrice      float64 `json:"batchPurchasePrice"`
	BatchPurchaseWeight     float64 `json:"batchPurchaseWeight"`
	RetailerName            string  `json:"retailerName"`
	RetailerAddress         string  `json:"retailerAddress"`
	RetailerContact         int     `json:"retailerContact"`
	GrindType               string  `json:"grindType"`
	GrindToBrewTime         string  `json:"grindToBrewTime"`
	CoffeeToWaterRatio      float64 `json:"coffeeToWaterRatio"`
	BrewType                string  `json:"brewType"`
	WaterTemperatureBrewing string  `json:"waterTemperaturebrewing"`
	BrewTime                string  `json:"brewTime"`
}
