

export const batchGrownTxnProcessor = async (
  eventObj: any,
  eventName: string,
  transactionId: string,
  blockNumber?: string
) => {
  try {
    if (eventObj.org != process.env.ORG_NAME) {
      console.info(`EventListener batchGrownTxnProcessor :: Ignoring ${eventName} event. Org not involved. TransactionId: ${transactionId}`);
      return;
    }

    console.info(`EventListener batchGrownTxnProcessor :: Processing ${eventName} on org ${process.env.ORG_NAME}. TransactionId: ${transactionId}`);

    // Update the request in DB
    
    return true;
  } catch (e) {
    console.error(`EventListener batchGrownTxnProcessor :: Error occured while handling the event for transactionId ${transactionId} due to ${e.message}`);
  }
};