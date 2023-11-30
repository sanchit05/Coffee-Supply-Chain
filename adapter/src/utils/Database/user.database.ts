import * as db from "./dbClient";
import { Client } from "cassandra-driver";
import * as constants from "../constants";

const GET_USER = "SELECT * FROM user WHERE username = ? ALLOW FILTERING";

const GET_USER_ROLES =
  "SELECT user_id,role_id FROM user_role WHERE user_id = ? ALLOW FILTERING";

const GET_ROLE = "SELECT * FROM role WHERE id = ?";

const REGISTER_USER =
  "INSERT INTO USER (id,username,email,password,address,role,status) VALUES (?, ?, ?, ?, ?, ?, ?)";

const GET_ALL_USER = "SELECT * FROM USER";

const GET_MAX_USER_ID = "SELECT MAX(id) as userId FROM USER";

export const getUser = async (dbClient: Client, username: string) => {
  const result = await db.executeQuery(dbClient, GET_USER, [username]);
  return result.rows;
};

export const getAllUsers = async (dbClient: Client, username: string) => {
  const result = await db.executeQuery(dbClient, GET_ALL_USER, []);
  return result.rows;
};

export const getRole = async (dbClient: Client, roleId: string) => {
  const result = await db.executeQuery(dbClient, GET_ROLE, [roleId]);
  return result.rows;
};

export const getRoles = async (dbClient: Client, userId: string) => {
  const result = await db.executeQuery(dbClient, GET_USER_ROLES, [userId]);
  return result.rows;
};

export const getMaxUserID = async (dbClient: Client) => {
  const result = await db.executeQuery(dbClient, GET_MAX_USER_ID, []);
  return result.rows[0];
};

export const registerUser = async (
  dbClient: Client,
  userId: string,
  username: string,
  email: string,
  hashedPassword: string,
  address: string,
  role: string
) => {
  console.info(`User DB :: Inserting user details for ${username}`);

  try {
    await db.executeQuery(dbClient, REGISTER_USER, [
      userId,
      username,
      email,
      hashedPassword,
      address,
      role,
      constants.USER_STATUS_ACTIVE
    ]);

    console.info(`User DB :: Inserted user details for ${username}`);

    return {
      status: "success",
      message: `User ${username} has been registered successfully`,
    };
  } catch (e) {
    console.info(
      `User DB :: Failed to insert user details for ${username}: ${e}`
    );

    return {
      status: "error",
      message: `Failed to register user ${username}`,
    };
  }
};
