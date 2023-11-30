import * as enrollAdmin from "./utils/createIdentity/enrollAdmin";
import * as registerUser from "./utils/createIdentity/registerUser";
import * as dotenv from "dotenv";
import * as configUtil from "./utils/hlfClient/makeConnectionConfig";

dotenv.config({
  path: process.env.ENV_PATH,
});

export const init = async () => {
  configUtil.makeConfig().then(() => {
    console.info(`Bootstrap init :: CCP config creation is successfull`);
  }).catch(async (err) => {
    console.error(`Bootstrap init :: CCP config creation Failed due to ${err.message}`);
  });

  await enrollAdmin.enrollAdmin().then(async () => {
    console.info(`Bootstrap init :: Admin certificates created`);
    await registerUser.registerAndEnrollUser(process.env.CLIENT_USER_ID ? process.env.CLIENT_USER_ID : "", "", "client")
      .then(() => {
        console.info(`Bootstrap init :: User certificates for ${process.env.CLIENT_USER_ID} created`);
      }).catch(async (err) => {
        console.error(`Bootstrap init :: User creation Failed due to ${err.message}`);
      });
  }).catch(async (err) => {
    console.error(`Bootstrap init :: Admin creation Failed due to ${err.message}`);
  });
}

export const configGenerated = () => {
  console.info(`Configs generated`);
}