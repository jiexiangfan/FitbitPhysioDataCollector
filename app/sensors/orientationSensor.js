// sensors/orientationSensor.js
import { OrientationSensor } from "orientation";

// Function to start the orientation sensor and handle its readings
export function startOrientationSensor(sendData) {
  const orientation = new OrientationSensor({ frequency: 1 }); // Max frequency is 60
  orientation.addEventListener("reading", () => {
    sendData({
      // Prepare and send orientation data to companion
      type: "orientation",
      quaternion: orientation.quaternion,
      timestamp: orientation.timestamp,
    });
  });
  orientation.start();
  return orientation;
}
