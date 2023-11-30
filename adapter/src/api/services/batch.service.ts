import * as batchInterface from "../../interfaces/batch.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as batchDB from "../../utils/Database/batch.database";
import * as db from "../../utils/Database/dbClient";
import * as constants from "../../utils/constants";
import * as hlfClient from "../../utils/hlfClient/hlfClient";
import * as orgUtils from "../../utils/orgUtils";

export const getBatchById = async (
  batchId: string,
) => {
  try {
    console.info(
      `Service getBatchGrowById :: Invoking ledger to get batch data with batch ID: ${batchId}`
    );

    const contract = await hlfClient.getContract(constants.contractName);

    let functionName;
    switch (process.env.ORG_NAME) {
      case "farmer":
        functionName = constants.FARMER_QUERY_METHOD
        break;
      
      case "processor":
        functionName = constants.PROCESSOR_CONTRACT_METHOD
        break;

      case "roaster":
        functionName = constants.ROASTER_CONTRACT_METHOD
        break;

      case "supplier":
        functionName = constants.SUPPLIER_CONTRACT_METHOD
        break;

      case "retailer":
        functionName = constants.RETAILER_CONTRACT_METHOD
        break;

      default:
        functionName = "";
        break;
    }

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .queryChaincodeByContract(
        contract,
        functionName,
        [batchId]
      )
      .then((res) => {
        console.info(
          `Service getBatchById :: Fetched batch data with ID ${batchId} from ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          JSON.parse(res.toString()),
          "Fetched batch data with id " +
            batchId +
            " from ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service getBatchById :: Error while invoking ledger for batch ID ${batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while fetching batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service getBatchById :: Error occurred while fetching batch from ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while fetching batch data from ledger!`
    );
  }
};

export const batchGrow = async (
  batchGrowReuquest: batchInterface.GrowBatch
) => {
  try {
    console.info(
      `Service batchGrow :: Invoking ledger to store farmer batch data with batch ID: ${batchGrowReuquest.batchId}`
    );

    // Get endorsing organizations
    const endorsingOrgs = orgUtils.getEndorsingOrgs();

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .invokeForOrganization(
        constants.contractName,
        constants.FARMER_CONTRACT_METHOD,
        [batchGrowReuquest.batchId],
        [...endorsingOrgs],
        { batch: Buffer.from(JSON.stringify(batchGrowReuquest)) }
      )
      .then((res) => {
        console.info(
          `Service batchGrow :: Farmer batch data with ID ${batchGrowReuquest.batchId} sent to ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          batchGrowReuquest.batchId,
          "Batch data with id " +
            batchGrowReuquest.batchId +
            " stored on ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service batchGrow :: Error while invoking ledger for batch ID ${batchGrowReuquest.batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while storing batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service batchGrow :: Error occurred while storing batch on ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while storing batch data of farmer on ledger!`
    );
  }
};

export const batchProcess = async (
  batchProcessReuquest: batchInterface.ProcessBatch
) => {
  try {
    console.info(
      `Service batchProcess :: Invoking ledger to store processor batch data with batch ID: ${batchProcessReuquest.batchId}`
    );

    // Get endorsing organizations
    const endorsingOrgs = orgUtils.getEndorsingOrgs();

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .invokeForOrganization(
        constants.contractName,
        constants.PROCESSOR_CONTRACT_METHOD,
        [batchProcessReuquest.batchId],
        [...endorsingOrgs],
        { batch: Buffer.from(JSON.stringify(batchProcessReuquest)) }
      )
      .then((res) => {
        console.info(
          `Service batchProcess :: Processor batch data with ID ${batchProcessReuquest.batchId} sent to ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          batchProcessReuquest.batchId,
          "Batch data with id " +
            batchProcessReuquest.batchId +
            " stored on ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service batchProcess :: Error while invoking ledger for batch ID ${batchProcessReuquest.batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while storing batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service batchProcess :: Error occurred while storing batch on ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while storing batch data of processor on ledger!`
    );
  }
};

export const batchRoast = async (
  batchRoastReuquest: batchInterface.RoastBatch
) => {
  try {
    console.info(
      `Service batchRoast :: Invoking ledger to store roaster batch data with batch ID: ${batchRoastReuquest.batchId}`
    );

    // Get endorsing organizations
    const endorsingOrgs = orgUtils.getEndorsingOrgs();

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .invokeForOrganization(
        constants.contractName,
        constants.ROASTER_CONTRACT_METHOD,
        [batchRoastReuquest.batchId],
        [...endorsingOrgs],
        { batch: Buffer.from(JSON.stringify(batchRoastReuquest)) }
      )
      .then((res) => {
        console.info(
          `Service batchRoast :: Roaster batch data with ID ${batchRoastReuquest.batchId} sent to ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          batchRoastReuquest.batchId,
          "Batch data with id " +
            batchRoastReuquest.batchId +
            " stored on ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service batchRoast :: Error while invoking ledger for batch ID ${batchRoastReuquest.batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while storing batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service batchRoast :: Error occurred while storing batch on ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while storing batch data of roaster on ledger!`
    );
  }
};

export const batchSupply = async (
  batchSupplyReuquest: batchInterface.SupplyBatch
) => {
  try {
    console.info(
      `Service batchSupply :: Invoking ledger to store supplier batch data with batch ID: ${batchSupplyReuquest.batchId}`
    );

    // Get endorsing organizations
    const endorsingOrgs = orgUtils.getEndorsingOrgs();

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .invokeForOrganization(
        constants.contractName,
        constants.SUPPLIER_CONTRACT_METHOD,
        [batchSupplyReuquest.batchId],
        [...endorsingOrgs],
        { batch: Buffer.from(JSON.stringify(batchSupplyReuquest)) }
      )
      .then((res) => {
        console.info(
          `Service batchSupply :: Supplier batch data with ID ${batchSupplyReuquest.batchId} sent to ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          batchSupplyReuquest.batchId,
          "Batch data with id " +
            batchSupplyReuquest.batchId +
            " stored on ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service batchSupply :: Error while invoking ledger for batch ID ${batchSupplyReuquest.batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while storing batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service batchSupply :: Error occurred while storing batch on ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while storing batch data of supplier on ledger!`
    );
  }
};

export const batchRetail = async (
  batchRetailReuquest: batchInterface.RetailBatch
) => {
  try {
    console.info(
      `Service batchRetail :: Invoking ledger to store retailer batch data with batch ID: ${batchRetailReuquest.batchId}`
    );

    // Get endorsing organizations
    const endorsingOrgs = orgUtils.getEndorsingOrgs();

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .invokeForOrganization(
        constants.contractName,
        constants.RETAILER_CONTRACT_METHOD,
        [batchRetailReuquest.batchId],
        [...endorsingOrgs],
        { batch: Buffer.from(JSON.stringify(batchRetailReuquest)) }
      )
      .then((res) => {
        console.info(
          `Service batchRetail :: Retailer batch data with ID ${batchRetailReuquest.batchId} sent to ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          batchRetailReuquest.batchId,
          "Batch data with id " +
            batchRetailReuquest.batchId +
            " stored on ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service batchRetail :: Error while invoking ledger for batch ID ${batchRetailReuquest.batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while storing batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service batchRetail :: Error occurred while storing batch on ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while storing batch data of retailer on ledger!`
    );
  }
};
