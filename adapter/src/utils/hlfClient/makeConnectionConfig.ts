import * as fs from "fs";
import * as path from "path";
import * as constants from "../constants";

/**
 * Generate component list to populate peers and orderers
 * section of connection.json .
 *
 * @param {String []} compList - List of peers or orderers.
 * @param {String []} compPerm - List of peers or orderers permissions.
 * @param {String []} compUrl - List of peers or orderers actual url.
 * @returns {Object} Result - return peer or orderer connection object.
 */
const generateDLTNodesList = (
  compList: string[],
  compPerm: string[],
  compUrl: string[]
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (let i = 0; i < compList.length; i++) {
    result[compList[i]] = {
      url: compUrl[i],
      tlsCACerts: {
        pem: fs.readFileSync(compPerm[i]).toString(),
      },
      grpcOptions: {
        "ssl-target-name-override": compList[i],
        hostnameOverride: compList[i],
        "grpc.keepalive_timeout_ms": parseInt(constants.grpcKeepAliveTimeout.toString()),
      },
    };
  }
  return result;
};

export const makeConfig = async (): Promise<void> => {
  console.info(`ConnectionConfig makeConfig :: makeConfig started`);

  const peerList = process.env.PEER_LIST ? process.env.PEER_LIST.split(/,\s?/) : [];
  const peerPem = process.env.PEERPEM ? process.env.PEERPEM.split(/,\s?/) : [];
  const peeUrl = process.env.PEER_URL ? process.env.PEER_URL.split(/,\s?/) : [];
  const ordererList = process.env.ORDERER_LIST ? process.env.ORDERER_LIST.split(/,\s?/) : [];
  const ordererPem = process.env.ORDERERPEM ? process.env.ORDERERPEM.split(/,\s?/) : [];
  const ordererUrl = process.env.ORDERER_URL ? process.env.ORDERER_URL.split(/,\s?/) : [];

  console.info(`ConnectionConfig makeConfig :: read ccp template from template file`);

  const templatePath = path.resolve(__dirname, "..", "..", "ccp-template.json");

  const data = fs.readFileSync(templatePath, "utf8");

  console.info(`ConnectionConfig makeConfig :: modify ccp template`);

  let result = data.replace(/\${ORG}/g, process.env.ORG_NAME ? process.env.ORG_NAME : "");
  result = result.replace(/\${CA_ORG}/g, process.env.CA_ORG ? process.env.CA_ORG : "");
  const jsonResult = JSON.parse(result);

  jsonResult.organizations[process.env.ORG_NAME ? process.env.ORG_NAME : ""].mspid = process.env.MSP_ID ? process.env.MSP_ID : "";

  jsonResult.organizations[process.env.ORG_NAME ? process.env.ORG_NAME : ""].peers = process.env.PEER_LIST;
  jsonResult.peers = generateDLTNodesList(peerList, peerPem, peeUrl);
  jsonResult.orderers = generateDLTNodesList(
    ordererList,
    ordererPem,
    ordererUrl
  );
  jsonResult.certificateAuthorities[process.env.CA_ORG ? process.env.CA_ORG : ""].url = process.env.CA_URL ? process.env.CA_URL : "";
  jsonResult.certificateAuthorities[process.env.CA_ORG ? process.env.CA_ORG : ""].tlsCACerts.pem = fs
    .readFileSync(process.env.CAPEM ? process.env.CAPEM : "")
    .toString();

  console.info(`ConnectionConfig makeConfig :: write to ${process.env.NETWORK_CONFIG ? process.env.NETWORK_CONFIG : ""}: ${JSON.stringify(jsonResult)}`);

  fs.writeFile(
    path.resolve(process.env.NETWORK_CONFIG ? process.env.NETWORK_CONFIG : ""),
    JSON.stringify(jsonResult),
    "utf8",
    (error) => {
      return error;
    }
  );

  console.info(`ConnectionConfig makeConfig :: makeConfig done`);
};
