import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as batchController from "../controller/batch.controller";
import * as auth from "../middleware/auth.middleware";
import * as batchInterface from "../../interfaces/batch.interface";

export const batchRouter = express.Router();

batchRouter.use(auth.verifyToken);

batchRouter.get("/get-batch/:id", async (req: Request, res: Response) => {
  console.info(
    `Route batchGrow :: Request received to get the farmer batch :: Batch ID: ${req.params.id}`
  );

  if (!req.params.id) {
    return res.status(400).json({
      message: "No Batch ID specified",
    });
  }

  const batchGrowResponse = await batchController.getBatchGrowById(
    req.params.id,
    req.body.user
  );

  res.status(batchGrowResponse.statusCode).json(batchGrowResponse.httpResponseMessage);
});

batchRouter.post("/batch-grow", async (req: Request, res: Response, next) => {
  console.info(
    `Route batchGrow :: Request received to register farmer batch :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const batchGrowRequest: batchInterface.GrowBatch = {
      batchId: req.body.batchId,
      batchStatus: req.body.batchStatus,
      seedType: req.body.seedType,
      plantationDate: req.body.plantationDate,
      farmerName: req.body.farmerName,
      growingChargePerKg: req.body.growingChargePerKg,
      batchGenerationDate: req.body.batchGenerationDate,
      batchWeight: req.body.batchWeight,
      batchPrice: req.body.batchPrice,
      batchSellDate: req.body.batchSellDate
    };
  
    const batchGrowResponse = await batchController.batchGrow(
      batchGrowRequest,
      req.body.user
    );
  
    res.status(batchGrowResponse.statusCode).json(batchGrowResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route batchGrow :: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while storing farmer batch on ledger!",
    });
  }
});

batchRouter.post("/batch-process", async (req: Request, res: Response, next) => {
  console.info(
    `Route batchProcess :: Request received to register processor batch :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const batchProcessRequest: batchInterface.ProcessBatch = {
      batchId: req.body.batchId,
      batchStatus: req.body.batchStatus,
      processingType: req.body.processingType,
      dateOfTransport: req.body.dateOfTransport,
      farmerName: req.body.farmerName,
      farmerBatchId: req.body.farmerBatchId,
      batchPurchaseDate: req.body.batchPurchaseDate,
      batchPurchasePrice: req.body.batchPurchasePrice,
      batchPurchaseWeight: req.body.batchPurchaseWeight,
      batchProcessingDate: req.body.batchProcessingDate,
      processorName: req.body.processorName,
      processorAddress: req.body.processorAddress,
      processorContact: req.body.processorContact,
      processingChargePerKg: req.body.processingChargePerKg,
      processedBatchPrice: req.body.processedBatchPrice,
      processedBatchWeight: req.body.processedBatchWeight,
      batchSellDate: req.body.batchSellDate
    };
  
    const batchProcessResponse = await batchController.batchProcess(
      batchProcessRequest,
      req.body.user
    );
  
    res.status(batchProcessResponse.statusCode).json(batchProcessResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route batchProcess :: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while storing processor batch on ledger!",
    });
  }
});

batchRouter.post("/batch-roast", async (req: Request, res: Response, next) => {
  console.info(
    `Route batchRoast :: Request received to register roaster batch :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const batchRoastRequest: batchInterface.RoastBatch = {
      batchId: req.body.batchId,
      batchStatus: req.body.batchStatus,
      roasingType: req.body.roasingType,
      dateOfTransport: req.body.dateOfTransport,
      processorName: req.body.processorName,
      processorBatchId: req.body.processorBatchId,
      batchPurchaseDate: req.body.batchPurchaseDate,
      batchPurchasePrice: req.body.batchPurchasePrice,
      batchPurchaseWeight: req.body.batchPurchaseWeight,
      roasterName: req.body.roasterName,
      roasterAddress: req.body.roasterAddress,
      roasterContact: req.body.roasterContact,
      roastingTemperature: req.body.roastingTemperature,
      roastingTime: req.body.roastingTime,
      roastingChargePerKg: req.body.roastingChargePerKg,
      roastedBatchPrice: req.body.roastedBatchPrice,
      roastedBatchWeight: req.body.roastedBatchWeight,
      batchSellDate: req.body.batchSellDate
    };
  
    const batchRoastResponse = await batchController.batchRoast(
      batchRoastRequest,
      req.body.user
    );
  
    res.status(batchRoastResponse.statusCode).json(batchRoastResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route batchRoast :: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while storing roaster batch on ledger!",
    });
  }
});

batchRouter.post("/batch-supply", async (req: Request, res: Response, next) => {
  console.info(
    `Route batchSupply :: Request received to register supplier batch :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const batchSupplyRequest: batchInterface.SupplyBatch = {
      batchId: req.body.batchId,
      batchStatus: req.body.batchStatus,
      dateOfTransport: req.body.dateOfTransport,
      roasterName: req.body.roasterName,
      roasterBatchId: req.body.roasterBatchId,
      batchPurchaseDate: req.body.batchPurchaseDate,
      batchPurchasePrice: req.body.batchPurchasePrice,
      batchPurchaseWeight: req.body.batchPurchaseWeight,
      supplierName: req.body.supplierName,
      supplierAddress: req.body.supplierAddress,
      supplierContact: req.body.supplierContact,
      packagingDate: req.body.packagingDate,
      packagingWeight: req.body.packagingWeight,
      packagingChargePerKg: req.body.packagingChargePerKg,
      packagedBatchPrice: req.body.packagedBatchPrice,
      packagedBatchWeight: req.body.packagedBatchWeight,
      shippingChargePerKg: req.body.shippingChargePerKg,
      shippingBatchPrice: req.body.shippingBatchPrice,
      batchSellDate: req.body.batchSellDate
    };
  
    const batchSupplyResponse = await batchController.batchSupply(
      batchSupplyRequest,
      req.body.user
    );
  
    res.status(batchSupplyResponse.statusCode).json(batchSupplyResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route batchSupply :: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while storing processor batch on ledger!",
    });
  }
});

batchRouter.post("/batch-retail", async (req: Request, res: Response, next) => {
  console.info(
    `Route batchRetail :: Request received to register retailer batch :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const batchRetailRequest: batchInterface.RetailBatch = {
      batchId: req.body.batchId,
      batchStatus: req.body.batchStatus,
      dateOfShipping: req.body.dateOfShipping,
      supplierName: req.body.supplierName,
      supplierBatchId: req.body.supplierBatchId,
      batchPurchaseDate: req.body.batchPurchaseDate,
      batchPurchasePrice: req.body.batchPurchasePrice,
      batchPurchaseWeight: req.body.batchPurchaseWeight,
      retailerName: req.body.retailerName,
      retailerAddress: req.body.retailerAddress,
      retailerContact: req.body.retailerContact,
      grindType: req.body.grindType,
      grindToBrewTime: req.body.grindToBrewTime,
      coffeeToWaterRatio: req.body.coffeeToWaterRatio,
      brewType: req.body.brewType,
      waterTemperatureBrewing: req.body.waterTemperatureBrewing,
      brewTime: req.body.brewTime
    };
  
    const batchRetailResponse = await batchController.batchRetail(
      batchRetailRequest,
      req.body.user
    );
  
    res.status(batchRetailResponse.statusCode).json(batchRetailResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route batchRetail :: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while storing retailer batch on ledger!",
    });
  }
});