// HLF parameters
export const contractName = process.env.FABRIC_CONTRACT_NAME ? process.env.FABRIC_CONTRACT_NAME : "coffee-supply-chain";
export const dltEventcommitTimeout = process.env.DLT_EVENT_COMMIT_TIMEOUT ? process.env.DLT_EVENT_COMMIT_TIMEOUT : 500;
export const dltEventEndorseTimeout = process.env.DLT_EVENT_ENDORSE_TIMEOUT ? process.env.DLT_EVENT_ENDORSE_TIMEOUT : 500;
export const grpcKeepAliveTimeout = process.env.GRPC_KEEPALIVE_TIMEOUT ? process.env.GRPC_KEEPALIVE_TIMEOUT : 180000;

// Auth middleware
export const JWT_KEY = process.env.USER_AUTHENTICATION_JWT_TOKEN_KEY ? process.env.USER_AUTHENTICATION_JWT_TOKEN_KEY : "";
export const JWT_EXPIRATION = process.env.USER_AUTHENTICATION_JWT_EXPIRATION ? process.env.USER_AUTHENTICATION_JWT_EXPIRATION : "";

// System roles
export const FARMER_ROLE = "FARMER";
export const PROCESSOR_ROLE = "PROCESSOR";
export const ROASTER_ROLE = "ROASTER";
export const SUPPLIER_ROLE = "SUPPLIER";
export const RETAILER_ROLE = "RETAILER";

// Org names
export const FARMER_ORG_NAME = process.env.FARMER_ORG_NAME ? process.env.FARMER_ORG_NAME : "";
export const PROCESSOR_ORG_NAME = process.env.PROCESSOR_ORG_NAME ? process.env.PROCESSOR_ORG_NAME : "";
export const ROASTER_ORG_NAME = process.env.ROASTER_ORG_NAME ? process.env.ROASTER_ORG_NAME : "";
export const SUPPLIER_ORG_NAME = process.env.SUPPLIER_ORG_NAME ? process.env.SUPPLIER_ORG_NAME : "";
export const RETAILER_ORG_NAME = process.env.RETAILER_ORG_NAME ? process.env.RETAILER_ORG_NAME : "";

// Batch types
export const FARMER_BATCH_TYPE = "farmer";
export const PROCESSOR_BATCH_TYPE = "processor";
export const ROASTER_BATCH_TYPE = "roaster";
export const SUPPLIER_BATCH_TYPE = "supplier";
export const RETAILER_BATCH_TYPE = "retailer";

// HLF Contract Methods
export const FARMER_CONTRACT_METHOD = "FarmerContract:CreateBatch";
export const FARMER_QUERY_METHOD = "FarmerContract:QueryGrownBatchById";
export const PROCESSOR_CONTRACT_METHOD = "ProcessorContract:ProcessBatch";
export const ROASTER_CONTRACT_METHOD = "RoasterContract:RoastBatch";
export const SUPPLIER_CONTRACT_METHOD = "SupplierContract:SupplyBatch";
export const RETAILER_CONTRACT_METHOD = "RetailerContract:RetailBatch";

export const USER_STATUS_ACTIVE = "ACTIVE";