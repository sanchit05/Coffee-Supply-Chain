import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as userInterface from "../../interfaces/user.interface";
import * as auth from "../middleware/auth.middleware";

export const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  console.info(
    `Request received for register :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const registrationRequest: userInterface.User = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
      role: req.body.role,
      org: req.body.org,
    };
  
    const isRegistered = await userController.register(registrationRequest);
  
    res.status(isRegistered.statusCode).json(isRegistered.httpResponseMessage);
  } catch (err) {
    console.error(`Route register: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while registering user!",
    });
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  console.info(
    `Request received for login :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const loginRequest: userInterface.LoginRequest = {
      username: req.body.username,
      password: req.body.password,
    };
  
    const loginResponse = await userController.login(loginRequest);
  
    res.status(loginResponse.statusCode).json(loginResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route login: error occurred during login: ${err.message}`);

    res.status(500).json({
      message: "Error occurred during login!",
    });
  }
});

userRouter.use(auth.verifyToken);
