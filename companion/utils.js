// util.js
import { config } from "./config";

export function sendDataToServer(serverUrl, data) {
  fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) =>
      console.log("Data successfully sent to server, received response: ", data)
    )
    .catch((error) => console.error("Error sending data to server", error));
}

export function processSensorData(data) {
  let processedData;
  switch (data.type) {
    case "heartRate":
      processedData = {
        user: config.USER,
        type: "Heart Rate",
        value: data.value,
        timestamp: data.timestamp,
      };
      break;
    case "accelerometer":
      processedData = {
        user: config.USER,
        type: "Accelerometer",
        x: data.x,
        y: data.y,
        z: data.z,
        timestamp: data.timestamp,
      };
      break;
    case "gyroscope":
      processedData = {
        user: config.USER,
        type: "Gyroscope",
        x: data.x,
        y: data.y,
        z: data.z,
        timestamp: data.timestamp,
      };
      break;
    case "orientation":
      processedData = {
        user: config.USER,
        type: "Orientation",
        quaternion: data.quaternion,
        timestamp: data.timestamp,
      };
      break;
    default:
      processedData = {
        user: config.USER,
        type: "Unknown",
        message: "Unknown sensor data type",
      };
  }
  return processedData;
}
