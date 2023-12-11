// sensors/gyroscope.js
import { Gyroscope } from "gyroscope";

// Function to start the gyroscope and handle its readings
export function startGyroscope(sendData) {
  const gyroscope = new Gyroscope({ frequency: 1 });
  gyroscope.addEventListener("reading", () => {
    sendData({
      // Prepare and send gyroscope data to companion
      type: "gyroscope",
      x: gyroscope.x,
      y: gyroscope.y,
      z: gyroscope.z,
      timestamp: gyroscope.timestamp,
    });
  });
  gyroscope.start();
  return gyroscope;
}
