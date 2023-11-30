import * as ccpUtil from "../fabricCCPUtils";
import * as caUtil from "../fabricCAUtils";
import * as path from "path";
import * as HTTPResponseUtil from "../httpResponseUtils";
import { Identity } from "fabric-network";

export const registerAndEnrollUser = async (
  userId: string,
  affiliation: string,
  role: string
) => {
  try {
    const walletPath = path.resolve(process.env.USER_WALLET_PATH ? process.env.USER_WALLET_PATH : "");
    const userWallet = await ccpUtil.buildWallet(walletPath);

    const userIdentity = await userWallet.get(userId);
    if (userIdentity) {
      console.error(`An identity for the user ${userId} already exists in the wallet`);
      return HTTPResponseUtil.internalServerErrorResponse(
        "An identity for the user already exists in the wallet."
      );
    }

    const adminWalletPath = path.resolve(process.env.ADMIN_WALLET_PATH ? process.env.ADMIN_WALLET_PATH : "");
    const adminWallet = await ccpUtil.buildWallet(adminWalletPath);

    const adminIdentity = await adminWallet.get(process.env.FABRIC_ADMIN_USER ? process.env.FABRIC_ADMIN_USER : "");
    if (!adminIdentity) {
      console.error(`An identity for the admin user does not exist in the wallet. Enroll the admin user before retrying`);
      return HTTPResponseUtil.internalServerErrorResponse(
        "An identity for the admin user does not exist in the wallet."
      );
    }

    const ccpOrg = ccpUtil.buildCCP();
    const caClient = caUtil.buildCAClient(ccpOrg, process.env.CA_ORG ? process.env.CA_ORG : "");

    const provider = userWallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(
      adminIdentity,
      process.env.FABRIC_ADMIN_USER ? process.env.FABRIC_ADMIN_USER : ""
    );

    const secret = await caClient.register(
      {
        affiliation,
        enrollmentID: userId,
        role,
      },
      adminUser
    );
    const enrollment = await caClient.enroll({
      enrollmentID: userId,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: process.env.MSP_ID ? process.env.MSP_ID : "",
      type: "X.509",
    };
    await userWallet.put(userId, x509Identity);
    console.info(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
    return await HTTPResponseUtil.okResponse(
      null,
      "Successfully registered and enrolled user"
    );
  } catch (error) {
    console.error(`Failed to register user : ${error}`);
    return await HTTPResponseUtil.internalServerErrorResponse(
      "Failed to register user"
    );
  }
};
