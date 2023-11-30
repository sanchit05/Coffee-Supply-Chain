import * as ccpUtil from "../fabricCCPUtils";
import * as caUtil from "../fabricCAUtils";
import * as path from "path";

export const enrollAdmin = async (): Promise<void> => {
  try {
    const walletPath = path.resolve(process.env.ADMIN_WALLET_PATH ? process.env.ADMIN_WALLET_PATH : "");
    const adminWallet = await ccpUtil.buildWallet(walletPath);

    // Check to see if we've already enrolled the admin user.
    const identity = await adminWallet.get(process.env.FABRIC_ADMIN_USER ? process.env.FABRIC_ADMIN_USER : "");
    if (identity) {
      console.info(`EnrollAdmin: An identity for the admin user already exists in the wallet`);
      return;
    }

    const ccpOrg = ccpUtil.buildCCP();
    const caClient = caUtil.buildCAClient(ccpOrg, process.env.CA_ORG ? process.env.CA_ORG : "");

    const enrollment = await caClient.enroll({
      enrollmentID: process.env.FABRIC_ADMIN_USER ? process.env.FABRIC_ADMIN_USER : "",
      enrollmentSecret: process.env.FABRIC_ADMIN_PASSWORD ? process.env.FABRIC_ADMIN_PASSWORD : "",
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: process.env.MSP_ID ? process.env.MSP_ID : "",
      type: "X.509",
    };
    await adminWallet.put(process.env.FABRIC_ADMIN_USER ? process.env.FABRIC_ADMIN_USER : "", x509Identity);
    console.info(`EnrollAdmin: Successfully enrolled admin user and imported it into the wallet`);
  } catch (error) {
    console.error(`EnrollAdmin: Failed to enroll admin user : ${error}`);
  }
};
