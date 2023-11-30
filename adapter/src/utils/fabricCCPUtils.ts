import { Wallet, Wallets } from "fabric-network";
import * as fs from "fs";
import * as path from "path";

const buildCCP = (): Record<string, any> => {
  const ccpPath = path.resolve(process.env.NETWORK_CONFIG ? process.env.NETWORK_CONFIG : "");
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, "utf8");

  const ccp = JSON.parse(contents);

  console.info(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
};

const buildWallet = async (walletPath: string): Promise<Wallet> => {
  console.info(`DltClient: Retriving wallet from " + ${walletPath}`);

  let wallet: Wallet;
  if (walletPath) {
    wallet = await Wallets.newFileSystemWallet(walletPath);
  } else {
    wallet = await Wallets.newInMemoryWallet();
  }

  return wallet;
};

export { buildCCP, buildWallet };
