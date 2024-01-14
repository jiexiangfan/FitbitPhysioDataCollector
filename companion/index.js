import * as messaging from "messaging";

// Server endpoint
// const SERVER_URL = "http://localhost:3000/api/data";
const SERVER_URL = "http://127.0.0.1:3000";

function sendDataToServer(data) {
  fetch(SERVER_URL, {
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
    .then((data) => console.log("Data successfully sent to server"))
    .catch((error) => console.error("Error sending data to server", error));
}

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt) => {
  // Send data to server
  sendDataToServer(evt.data);

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
