import { HeartRateSensor } from "heart-rate";
import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { Gyroscope } from "gyroscope";
import { OrientationSensor } from "orientation";
import document from "document";

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
  console.log(
    `Current heart rate: ${hrSensor.heartRate} [${hrSensor.timestamp}]`
  );
  heartLabel.text = `Current heart rate: ${hrSensor.heartRate}`;
});

accelerometer = startSensor(Accelerometer, "accelerometer", 1, () => {
  console.log(`Accelerometer Reading: \
  ts: ${accelerometer.timestamp}, \
  x: ${accelerometer.x}, \
  y: ${accelerometer.y}, \
  z: ${accelerometer.z}`);
});

gyroscope = startSensor(Gyroscope, "gyroscope", 1, () => {
  console.log(`Gyroscope Reading: \
  timestamp=${gyroscope.timestamp}, \
  [${gyroscope.x}, \
  ${gyroscope.y}, \
  ${gyroscope.z}]`);
});

orientation = startSensor(OrientationSensor, "orientation", 1, () => {
  // max frequency is 60
  console.log(`Orientation Reading: \
  timestamp=${orientation.timestamp}, \
  [${orientation.quaternion[0]}, \
  ${orientation.quaternion[1]}, \
  ${orientation.quaternion[2]}, \
  ${orientation.quaternion[3]}]`);
});

// Function to stop all sensors
function stopAllSensors() {
  hrSensor?.stop();
  accelerometer?.stop();
  gyroscope?.stop();
  orientation?.stop();
}

// // Function to start all sensors (if needed)
// function startAllSensors() {
//   hrSensor = startSensor(HeartRateSensor, "heart_rate", 1, () => {
//     console.log(`Current heart rate: ${hrSensor.heartRate}`);
//     heartLabel.text = `Current heart rate: ${hrSensor.heartRate}`;
//   });

//   accelerometer = startSensor(Accelerometer, "accelerometer", 1, () => {
//     console.log(`Accel raw: ${accelerometer.readings}`);
//   });

//   barometer = startSensor(Barometer, "barometer", 1, () => {
//     console.log(`Barometer pressure: ${barometer.pressure}`);
//   });

//   gyroscope = startSensor(Gyroscope, "gyroscope", 1, () => {
//     console.log(`Gyro raw: ${gyroscope.readings}`);
//   });

//   orientation = startSensor(OrientationSensor, "orientation", 60, () => {
//     console.log(`Orientation: ${orientation.quaternion}`);
//   });
// }

// // Call startAllSensors to initialize sensor readings when app starts
// startAllSensors();
