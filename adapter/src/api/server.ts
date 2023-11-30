import express from "express";
import * as dotenv from "dotenv";
dotenv.config({
	path: process.env.ENV_PATH,
});
import { init, configGenerated } from "../initialConfig";

import { userRouter } from "./routes/user.route";
import { batchRouter } from "./routes/batch.route";

const app = express();

const { BASE_ROUTE = "/api" } = process.env;

process.on('unhandledRejection', (reason, p) => {
	console.error(reason, 'Unhandled Rejection at Promise', p);
}).on('uncaughtException', err => {
	console.error(err, 'Uncaught Exception thrown');
});

app.set("port", process.env.PORT || 3000);

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: false, limit: '500mb' }));

// API routes
app.use(`${BASE_ROUTE}` + "/user", userRouter);
app.use(`${BASE_ROUTE}` + "/batch", batchRouter);

const server = app.listen(app.get("port"), async () => {
  init();

  // Wait for admin IDs to get generated
  setTimeout(configGenerated, 30);
});

export default server;
