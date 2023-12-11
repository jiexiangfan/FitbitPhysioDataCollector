// sensors/accelerometer.js
import { Accelerometer } from "accelerometer";

// Function to start the accelerometer and handle its readings
export function startAccelerometer(sendData) {
  const accelerometer = new Accelerometer({ frequency: 1 });
  accelerometer.addEventListener("reading", () => {
    sendData({
      // Prepare and send accelerometer data to companion
      type: "accelerometer",
      x: accelerometer.x,
      y: accelerometer.y,
      z: accelerometer.z,
      timestamp: accelerometer.timestamp,
    });
  });
  accelerometer.start();
  return accelerometer;
}
