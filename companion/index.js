import * as messaging from "messaging";
import { config } from "./config";
import { sendDataToServer, processSensorData } from "./utils";

messaging.peerSocket.onmessage = (evt) => {
  let processedData = processSensorData(evt.data);
  sendDataToServer(config.SERVER_URL, processedData);
  console.log(JSON.stringify(processedData));
};
