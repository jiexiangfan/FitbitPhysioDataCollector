import * as messaging from "messaging";
import * as fs from "fs";
import * as cbor from "cbor";

// Buffer to store sensor data temporarily
let sensorDataBuffer = [];

function saveDataToFile() {
  const fileName = `sensor_data_${Date.now()}.cbor`;
  try {
    fs.writeFileSync(fileName, cbor.encode(sensorDataBuffer), "cbor");
    console.log(`Data saved to ${fileName}`);
  } catch (e) {
    console.log(`Failed to save data: ${e}`);
  }
  // Clear the buffer after saving
  sensorDataBuffer = [];
}

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt) => {
  sensorDataBuffer.push(evt.data);

  // Example condition to save data (e.g., every 100 readings)
  if (sensorDataBuffer.length >= 480) {
    saveDataToFile();
  }
  switch (evt.data.type) {
    case "heartRate":
      console.log(
        `Heart Rate: ${evt.data.value}, Timestamp: ${evt.data.timestamp}`
      );
      break;
    case "accelerometer":
      console.log(
        `Accelerometer: x=${evt.data.x}, y=${evt.data.y}, z=${evt.data.z}, Timestamp: ${evt.data.timestamp}`
      );
      break;
    case "gyroscope":
      console.log(
        `Gyroscope: x=${evt.data.x}, y=${evt.data.y}, z=${evt.data.z}, Timestamp: ${evt.data.timestamp}`
      );
      break;
    case "orientation":
      console.log(
        `Orientation: Quaternion=${evt.data.quaternion}, Timestamp: ${evt.data.timestamp}`
      );
      break;
    default:
      console.log("Unknown sensor data type");
  }
  // Add logic to save or send this data as needed
};
