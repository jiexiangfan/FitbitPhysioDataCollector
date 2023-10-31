import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
let document = require("document");

// Fetch UI element of heart rate
let heartLabel = document.getElementById("heart");

// Initialize the UI with some values
heartLabel.text = "Current heart rate: --";

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrSensor = new HeartRateSensor({ frequency: 1 });
  hrSensor.addEventListener("reading", () => {
    console.log(`Current heart rate: ${hrSensor.heartRate}`);
    heartLabel.text = `Current heart rate: ${hrSensor.heartRate}`;
  });
  hrSensor.start();
}
