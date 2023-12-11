// sensors/heartRateSensor.js
import { HeartRateSensor } from "heart-rate";

// Function to start the heart rate sensor and handle its readings
export function startHeartRateSensor(sendData, updateUI) {
  const hrSensor = new HeartRateSensor({ frequency: 1 });
  hrSensor.addEventListener("reading", () => {
    updateUI(hrSensor.heartRate); // Update the UI with the current heart rate
    sendData({ // Prepare and send data to companion
      type: "heartRate",
      value: hrSensor.heartRate,
      timestamp: hrSensor.timestamp,
    });
  });
  hrSensor.start();
  return hrSensor;
}
