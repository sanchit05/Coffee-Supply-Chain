import { ContractEvent, Network } from "fabric-network";
import * as constants from "../utils/constants";
import * as txnProcessor from "./txnProcessor";

export const eventMapping = {
  BatchGrown: txnProcessor.batchGrownTxnProcessor,
  // BatchProcessed: txnProcessor.batchProcessedHandler,
  // BatchRoasted: txnProcessor.batchRoastedHandler,
  // BatchSupplied: txnProcessor.batchSuppliedHandler,
  // BatchRetail: txnProcessor.batchRetailHandler,
};

export const listener = async (event: ContractEvent) => {
  try {
    if (event.payload === undefined) {
      throw new Error("Event payload is undefined");
    }

    const eventPayload = JSON.parse(event.payload.toString());
    const transactionEvent = event.getTransactionEvent();

    // Check if event Name is present inside eventMapping
    if (event.eventName in eventMapping) {
      // Retrieve and call method configured for event
      let handlerMethod =
        eventMapping[event.eventName as keyof typeof eventMapping];

      console.info(
        `EventListener listener :: Event configured for event name ${event.eventName}`
      );

      await handlerMethod(
        eventPayload,
        event.eventName,
        transactionEvent.transactionId,
        event.getTransactionEvent().getBlockEvent().blockNumber.toString()
      );
    } else {
      console.error(`EventListener listener :: Event is not configured`);
    }
  } catch (e) {
    console.error(
      `EventListener listener :: Error occoured in listener due to ${e.message}`
    );
  }
};
