import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Gyroscope } from "gyroscope";
import { OrientationSensor } from "orientation";
import document from "document";
import * as messaging from "messaging";
import { me as appbit } from "appbit";

// Disable app timeout
appbit.appTimeoutEnabled = false;

// Function to send data to companion
function sendData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("Connection is not open");
  }
}

// Fetch UI element of heart rate
let heartLabel = document.getElementById("heart");

// Initialize the UI with some values
heartLabel.text = "Current heart rate: --";

// Declare sensor variables at the top so they are in scope for the entire file
let hrSensor, accelerometer, gyroscope, orientation;

// Check for permissions and availability of sensors before starting them
function startSensor(Sensor, sensorName, frequency, callback) {
  if (Sensor) {
    let sensor = new Sensor({ frequency: frequency });
    sensor.addEventListener("reading", callback);
    sensor.start();
    return sensor; // Return the sensor instance
  } else {
    console.log(`${sensorName} is not available or permission is denied.`);
    return null;
  }
}

// Start sensors
hrSensor = startSensor(HeartRateSensor, "heart_rate", 1, () => {
  // console.log(
  //   `Current heart rate: ${hrSensor.heartRate} [${hrSensor.timestamp}]`
  // );
  heartLabel.text = `Heart rate: ${hrSensor.heartRate}`;
  let data = {
    type: "heartRate",
    value: hrSensor.heartRate,
    timestamp: hrSensor.timestamp,
  };
  sendData(data);
});

accelerometer = startSensor(Accelerometer, "accelerometer", 1, () => {
  let accelData = {
    type: "accelerometer",
    x: accelerometer.x,
    y: accelerometer.y,
    z: accelerometer.z,
    timestamp: accelerometer.timestamp,
  };
  sendData(accelData);
});

gyroscope = startSensor(Gyroscope, "gyroscope", 1, () => {
  let gyroData = {
    type: "gyroscope",
    x: gyroscope.x,
    y: gyroscope.y,
    z: gyroscope.z,
    timestamp: gyroscope.timestamp,
  };
  sendData(gyroData);
});

// orientation has max frequency of 60
orientation = startSensor(OrientationSensor, "orientation", 1, () => {
  let orientationData = {
    type: "orientation",
    quaternion: orientation.quaternion,
    timestamp: orientation.timestamp,
  };
  sendData(orientationData);
});

// Function to stop all sensors
function stopAllSensors() {
  hrSensor?.stop();
  accelerometer?.stop();
  gyroscope?.stop();
  orientation?.stop();
}
