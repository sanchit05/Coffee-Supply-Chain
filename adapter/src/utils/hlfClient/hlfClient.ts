import * as path from "path";
import * as ccpUtil from "../fabricCCPUtils";
import * as constants from "../constants";

import {
  Contract,
  Transaction,
  Gateway,
  Network,
  Wallet,
  DefaultEventHandlerStrategies,
} from "fabric-network";
import { Endorser } from "fabric-common";
import * as fs from "fs";

let fabricGateway: Gateway;
let fabricChannelNetwork: Network;
let activeEndorsingPeers = new Map<string, string[]>();

const initDLTClient = async (wallet: Wallet, ccp: any) => {
  const gateway = new Gateway();

  try {
    console.info(`DLTClient initDLTClient :: Load user identity from fabric wallet.`);

    const userIdentity = await wallet.get(process.env.CLIENT_USER_ID ? process.env.CLIENT_USER_ID : "");
    if (!userIdentity) {
      throw new Error("User identity not found.");
    }
    console.info(`DLTClient initDLTClient :: Retrived User Identity`);
    
    await gateway.connect(ccp, {
      wallet,
      identity: process.env.CLIENT_USER_ID ? process.env.CLIENT_USER_ID : "",
      discovery: { enabled: true, asLocalhost: false },
      eventHandlerOptions: {
        commitTimeout: parseInt(constants.dltEventcommitTimeout.toString()),
        endorseTimeout: parseInt(constants.dltEventEndorseTimeout.toString()),
        strategy: DefaultEventHandlerStrategies.MSPID_SCOPE_ALLFORTX,
      },
    });
    return gateway;
  } catch (e) {
    console.error(`DLTClient initDLTClient :: Error while Initializing DLT Client connection due to ${e.message}`);
    return gateway;
  }
};

export const disconnectClient = async (gateWay: Gateway) => {
  gateWay.disconnect();
};

const buildCCP = () => {
  const ccpPath = path.resolve(process.env.NETWORK_CONFIG ? process.env.NETWORK_CONFIG : "");
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    console.info(`DLTClient buildCCP :: No such file or directory: ${ccpPath}`);

    throw new Error(`DltClient: no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, "utf8");

  const ccp = JSON.parse(contents);
  console.info(`DLTClient buildCCP :: Loaded the network configuration`);

  return ccp;
};

export const getContract = async (contractName: string) => {
  if (fabricChannelNetwork == null) {
    if (fabricGateway == null) {
      console.info(`DLTClient getContract :: Initiate connection to DLT ${contractName}`);
      const walletPath = path.resolve(process.env.USER_WALLET_PATH ? process.env.USER_WALLET_PATH : "");
      const wallet = await ccpUtil.buildWallet(walletPath);

      const commonConnectionProfile = await buildCCP();
      fabricGateway = await initDLTClient(wallet, commonConnectionProfile);

      if (!fabricGateway) {
        console.info(`DLTClient getContract :: Unable to initialize dltClientGateway ${contractName}`);

        throw new Error("DltClient: Unable to initialize dltClientGateway");
      }

      console.info(`DLTClient getContract :: Connected to DLT for contractName ${contractName}`);
    }

    fabricChannelNetwork = await fabricGateway.getNetwork(
      process.env.DLT_CHANNEL_NAME ? process.env.DLT_CHANNEL_NAME : ""
    );
    
    const endorsingPeers = fabricChannelNetwork.getChannel().getEndorsers();
  }
  return fabricChannelNetwork.getContract(contractName);
};

export const invoke = async (
  contractName: string,
  functionName: string,
  parameters: any[],
  transientData: any = null
) => {
  const contract = await getContract(contractName);
  const transaction = contract.createTransaction(functionName);
  if (transientData) {
    transaction.setTransient(transientData);
  }
  return transaction.submit(...parameters);
};

export const invokeForOrganization = async (
  contractName: string,
  functionName: string,
  parameters: any[],
  endorsingOrgs: string[],
  transientData: any = null
) => {
  const contract: Contract = await getContract(contractName);
  console.info(`DLTClient invokeForOrganization :: Processing is started on DLT layer for contractName ${contractName}`);
  const transaction = contract.createTransaction(functionName);
  if (transientData) {
    console.info(`DLTClient invokeForOrganization :: Set transient data that will be passed to the transaction function for contractName ${contractName}`);
    transaction.setTransient(transientData);
  }
  transaction.setEndorsingOrganizations(...endorsingOrgs);

  return transaction.submit(...parameters);
};

export const query = async (
  contractName: string,
  functionName: string,
  parameters: any[]
) => {
  const contract = await getContract(contractName);

  return queryChaincodeByContract(contract, functionName, parameters);
};

export const queryChaincodeByContract = async (
  contract: Contract,
  functionName: string,
  parameters: any[]
) => {
  let transaction: Transaction = contract.createTransaction(functionName);

  return transaction.evaluate(...parameters);
};

export const invokeByTransactionId = async (
  transaction: Transaction,
  parameters: any[],
  transientData: any = null
) => {
  if (transientData) {
    transaction.setTransient(transientData);
  }
  return transaction.submit(...parameters);
};

export const invokeForOrganizationByTxnId = async (
  transaction: Transaction,
  parameters: any[],
  endorsingOrgs: string[],
  transientData: any = null
) => {
  if (transientData) {
    transaction.setTransient(transientData);
  }

  transaction.setEndorsingOrganizations(...endorsingOrgs);

  return transaction.submit(...parameters);
};

export const getEndorsers = async (mspId?: string): Promise<Endorser[]> => {
  if (fabricChannelNetwork == null) {
    if (fabricGateway == null) {
      console.info("Initiate connection to DLT");
      const walletPath = path.resolve(process.env.USER_WALLET_PATH ? process.env.USER_WALLET_PATH : "");
      const wallet = await ccpUtil.buildWallet(walletPath);

      const commonConnectionProfile = await buildCCP();
      fabricGateway = await initDLTClient(wallet, commonConnectionProfile);

      if (!fabricGateway) {
        throw new Error("DltClient: Unable to initialize dltClientGateway");
      }

      console.info("Connected to DLT");
    }
    fabricChannelNetwork = await fabricGateway.getNetwork(
      process.env.DLT_CHANNEL_NAME ? process.env.DLT_CHANNEL_NAME : ""
    );
  }

  let endorsers: Endorser[];
  if (mspId) {
    endorsers = fabricChannelNetwork.getChannel().getEndorsers(mspId);
  }
  else {
    endorsers = fabricChannelNetwork.getChannel().getEndorsers();
  }

  return endorsers;
}

export const getMspIds = async (mspId?: string): Promise<string[]> => {
  if (fabricChannelNetwork == null) {
    if (fabricGateway == null) {
      console.info("Initiate connection to DLT");
      const walletPath = path.resolve(process.env.USER_WALLET_PATH ? process.env.USER_WALLET_PATH : "");
      const wallet = await ccpUtil.buildWallet(walletPath);

      const commonConnectionProfile = await buildCCP();
      fabricGateway = await initDLTClient(wallet, commonConnectionProfile);

      if (!fabricGateway) {
        throw new Error("DltClient: Unable to initialize dltClientGateway");
      }

      console.info("Connected to DLT");
    }
    fabricChannelNetwork = await fabricGateway.getNetwork(
      process.env.DLT_CHANNEL_NAME ? process.env.DLT_CHANNEL_NAME : ""
    );
  }

  let mspIds: string[] = fabricChannelNetwork.getChannel().getMspids();

  return mspIds;
}

const getEndorserByName = async (name: string): Promise<Endorser> => {
  if (fabricChannelNetwork == null) {
    if (fabricGateway == null) {
      console.info("Initiate connection to DLT");
      const walletPath = path.resolve(process.env.USER_WALLET_PATH ? process.env.USER_WALLET_PATH : "");
      const wallet = await ccpUtil.buildWallet(walletPath);

      const commonConnectionProfile = await buildCCP();
      fabricGateway = await initDLTClient(wallet, commonConnectionProfile);

      if (!fabricGateway) {
        throw new Error("DltClient: Unable to initialize dltClientGateway");
      }

      console.info("Connected to DLT");
    }
    fabricChannelNetwork = await fabricGateway.getNetwork(
      process.env.DLT_CHANNEL_NAME ? process.env.DLT_CHANNEL_NAME : ""
    );
  }

  return fabricChannelNetwork.getChannel().getEndorser(name);
}