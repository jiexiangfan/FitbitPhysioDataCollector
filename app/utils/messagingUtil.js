// utils/messagingUtil.js
import * as messaging from "messaging";

// Function to send data to companion
export function sendData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("Connection is not open");
  }
}
