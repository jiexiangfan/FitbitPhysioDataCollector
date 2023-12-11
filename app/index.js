// app/index.js
import document from "document";
import { sendData } from "./utils/messagingUtil";
import { startHeartRateSensor } from "./sensors/heartRateSensor";
import { startAccelerometer } from "./sensors/accelerometer";
import { startGyroscope } from "./sensors/gyroscope";
import { startOrientationSensor } from "./sensors/orientationSensor";

// Fetch UI element of heart rate
let heartLabel = document.getElementById("heart");

// Initialize the UI with some values
heartLabel.text = "Current heart rate: --";

// Function to update heart rate in UI
function updateHeartRateUI(heartRate) {
  heartLabel.text = `Current heart rate: ${heartRate}`;
}

// Start sensors with appropriate callbacks
const hrSensor = startHeartRateSensor(sendData, updateHeartRateUI);
const accelerometer = startAccelerometer(sendData);
const gyroscope = startGyroscope(sendData);
const orientation = startOrientationSensor(sendData);

// Function to stop all sensors
function stopAllSensors() {
  hrSensor?.stop();
  accelerometer?.stop();
  gyroscope?.stop();
  orientation?.stop();
}
