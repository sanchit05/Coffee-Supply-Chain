import { Client, types } from "cassandra-driver";

let dbClient: Client;

export const getDBClient = async (): Promise<Client> => {

  if(dbClient == null) {
    const DB_IP = process.env.SCYLLA_CONTACT_POINTS ? process.env.SCYLLA_CONTACT_POINTS : "";
    const DB_CENTRE = process.env.SCYLLA_DATACENTER ? process.env.SCYLLA_DATACENTER : "";
    const DB_KEYSPACE = process.env.SCYLLA_KEYSPACE ? process.env.SCYLLA_KEYSPACE : "";

    dbClient = new Client({
      contactPoints: [DB_IP],
      localDataCenter: DB_CENTRE,
      keyspace: DB_KEYSPACE,
      pooling: {
        coreConnectionsPerHost: {
          [types.distance.local]: 10,
          [types.distance.remote]: 1
        },
      },  queryOptions: {
        consistency: 5,
      }
    });

    await dbClient.connect();
  }
  return dbClient;
};

export const executeSimpleQuery = async (
  query: string,
): Promise<types.ResultSet> => {
  let client = await getDBClient()
  return client.execute(query);
};


export const executeQuery = async (
  client: Client,
  query: string,
  params: any[]
): Promise<types.ResultSet> => {
  return client.execute(query, params, { prepare: true });
};

export const executeBatchQueries = async (
  client: Client,
  queries: string[],
) => {
  for (const query of queries) {
    executeSimpleQuery(
      query
    );
  }
};

export const executeBatchQuery = async (
  query: string,
) => {
  executeSimpleQuery(
    query
  );
};

export const executePaginatedQuery = async (
  client: Client,
  query: string,
  params: any[],
  pageState: string,
  fetchSize: number
): Promise<types.ResultSet> => {
  const options = pageState
    ? { pageState: pageState, prepare: true, fetchSize: fetchSize }
    : { prepare: true, fetchSize: fetchSize };
  return client.execute(query, params, options);
};
