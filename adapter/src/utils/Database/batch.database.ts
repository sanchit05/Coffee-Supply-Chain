import * as db from "./dbClient";
import { Client } from "cassandra-driver";

const GET_BATCH_BY_ID =
  "SELECT * from coffee_batch WHERE batch_id = ? AND batch_type = ?  ALLOW FILTERING";

export const getBatchById = async (
  dbClient: Client,
  batchId: string,
  batchType: string
) => {
  const result = await db.executeQuery(
    dbClient, 
    GET_BATCH_BY_ID, 
    [batchId, batchType]);
    
  return result.rows;
}