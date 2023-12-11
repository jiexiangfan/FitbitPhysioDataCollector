import * as messaging from "messaging";

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt) => {
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
};
