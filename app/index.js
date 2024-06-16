import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { OrientationSensor } from "orientation";
import document from "document";
import { me as appbit } from "appbit";
import { sendData, startSensor } from "./utils";

// Disable app timeout
appbit.appTimeoutEnabled = false;

// Fetch UI element of heart rate
let heartLabel = document.getElementById("heart");

// Initialize the UI with some values
heartLabel.text = "Current heart rate: --";

// Declare sensor variables at the top so they are in scope for the entire file
let hrSensor, accelerometer, gyroscope, orientation;

// Start sensors
hrSensor = startSensor(HeartRateSensor, "heart_rate", 1, () => {
  heartLabel.text = `Heart rate: ${hrSensor.heartRate}`;
  let data = {
    type: "heartRate",
    value: hrSensor.heartRate,
    timestamp: hrSensor.timestamp,
  };
  sendData(data);
});

// accelerometer = startSensor(Accelerometer, "accelerometer", 1, () => {
//   let accelData = {
//     type: "accelerometer",
//     x: accelerometer.x,
//     y: accelerometer.y,
//     z: accelerometer.z,
//     timestamp: accelerometer.timestamp,
//   };
//   sendData(accelData);
// });

// gyroscope = startSensor(Gyroscope, "gyroscope", 1, () => {
//   let gyroData = {
//     type: "gyroscope",
//     x: gyroscope.x,
//     y: gyroscope.y,
//     z: gyroscope.z,
//     timestamp: gyroscope.timestamp,
//   };
//   sendData(gyroData);
// });

// // orientation has max frequency of 60
// orientation = startSensor(OrientationSensor, "orientation", 1, () => {
//   let orientationData = {
//     type: "orientation",
//     quaternion: orientation.quaternion,
//     timestamp: orientation.timestamp,
//   };
//   sendData(orientationData);
// });

// Function to stop all sensors
function stopAllSensors() {
  hrSensor?.stop();
  accelerometer?.stop();
  gyroscope?.stop();
  orientation?.stop();
}
