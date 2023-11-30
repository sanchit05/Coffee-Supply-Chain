export interface GrowBatch {
  batchId: string;
  batchStatus: string;
  seedType: string;
  plantationDate: string;
  farmerName: string;
  growingChargePerKg: number;
  batchGenerationDate: string;
  batchWeight: number;
  batchPrice: number;
  batchSellDate: string;
}

export interface ProcessBatch {
  batchId: string;
  batchStatus: string;
  processingType: string;
  dateOfTransport: string;
  farmerName: string;
  farmerBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  batchProcessingDate: string;
  processorName: string;
  processorAddress: string;
  processorContact: number;
  processingChargePerKg: number;
  processedBatchPrice: number;
  processedBatchWeight: number;
  batchSellDate: string;
}

export interface RoastBatch {
  batchId: string;
  batchStatus: string;
  roasingType: string;
  dateOfTransport: string;
  processorName: string;
  processorBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  roasterName: string;
  roasterAddress: string;
  roasterContact: number;
  roastingTemperature: number;
  roastingTime: string;
  roastingChargePerKg: number;
  roastedBatchPrice: number;
  roastedBatchWeight: number;
  batchSellDate: string;
}

export interface SupplyBatch {
  batchId: string;
  batchStatus: string;
  dateOfTransport: string;
  roasterName: string;
  roasterBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  supplierName: string;
  supplierAddress: string;
  supplierContact: number;
  packagingDate: string;
  packagingWeight: number;
  packagingChargePerKg: number;
  packagedBatchPrice: number;
  packagedBatchWeight: number;
  shippingChargePerKg: number;
  shippingBatchPrice: number;
  batchSellDate: string;
}

export interface RetailBatch {
  batchId: string;
  batchStatus: string;
  dateOfShipping: string;
  supplierName: string;
  supplierBatchId: string;
  batchPurchaseDate: string;
  batchPurchasePrice: number;
  batchPurchaseWeight: number;
  retailerName: string;
  retailerAddress: string;
  retailerContact: number;
  grindType: string;
  grindToBrewTime: string;
  coffeeToWaterRatio: number;
  brewType: string;
  waterTemperatureBrewing: string;
  brewTime: string;
}
