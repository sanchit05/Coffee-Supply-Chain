import * as HTTPResponseUtil from "../../utils/httpResponseUtils";
import * as userService from "../services/user.service";
import * as userInterface from "../../interfaces/user.interface";

export const register = async (registrationRequest: userInterface.User) => {
  console.info(`Controller register :: User ${registrationRequest.username}`);

  const userRegister = await userService.register(registrationRequest);

  return userRegister
};

export const login = async (userLoginRequest: userInterface.LoginRequest) => {
  console.info(`Controller login :: User ${userLoginRequest.username}`);

  const userLogin = await userService.login(userLoginRequest);

  return userLogin;
};
