import * as HTTPResponseUtil from "../../utils/httpResponseUtils";
import * as userInterface from "../../interfaces/user.interface";
import * as batchInterface from "../../interfaces/batch.interface";
import * as batchService from "../services/batch.service";
import * as constants from "../../utils/constants";

export const getBatchGrowById = async (
  batchId: string,
  user: userInterface.UserResponse,
) => {
  console.info(`Controller getBatchGrowById :: Checking role of user ${user.username}`);

  if (user.role !== constants.FARMER_ROLE) {
    return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  }

  const batchGrowResponse = await batchService.getBatchById(batchId);

  return batchGrowResponse;
};

export const batchGrow = async (
  batchGrowRequest: batchInterface.GrowBatch,
  user: userInterface.UserResponse,
) => {
  console.info(`Controller batchGrow :: Checking role of user ${user.username}`);

  if (user.role !== constants.FARMER_ROLE) {
    return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  }

  const batchGrowResponse = await batchService.batchGrow(batchGrowRequest);

  return batchGrowResponse;
};

export const batchProcess = async (
  batchProcessRequest: batchInterface.ProcessBatch,
  user: userInterface.UserResponse,
) => {
  console.info(`Controller batchProcess :: Checking role of user ${user.username}`);

  // if (user.role !== constants.PROCESSOR_ROLE) {
  //   return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  // }

  const batchProcessResponse = await batchService.batchProcess(batchProcessRequest);

  return batchProcessResponse;
};

export const batchRoast = async (
  batchRoastRequest: batchInterface.RoastBatch,
  user: userInterface.UserResponse,
) => {
  console.info(`Controller batchRoast :: Checking role of user ${user.username}`);

  // if (user.role !== constants.ROASTER_ROLE) {
  //   return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  // }

  const batchRoastResponse = await batchService.batchRoast(batchRoastRequest);

  return batchRoastResponse;
};

export const batchSupply = async (
  batchSupplyRequest: batchInterface.SupplyBatch,
  user: userInterface.UserResponse,
) => {
  console.info(`Controller batchSupply :: Checking role of user ${user.username}`);

  // if (user.role !== constants.SUPPLIER_ROLE) {
  //   return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  // }

  const batchSupplyResponse = await batchService.batchSupply(batchSupplyRequest);

  return batchSupplyResponse;
};

export const batchRetail = async (
  batchRetailRequest: batchInterface.RetailBatch,
  user: userInterface.UserResponse,
) => {
  console.info(`Controller batchRetail :: Checking role of user ${user.username}`);

  // if (user.role !== constants.RETAILER_ROLE) {
  //   return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  // }

  const batchRetailResponse = await batchService.batchRetail(batchRetailRequest);

  return batchRetailResponse;
};