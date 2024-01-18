import * as messaging from "messaging";

// send data to companion
export function sendData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("Connection is not open");
  }
}

// check for permissions and availability of sensors before starting them
export function startSensor(Sensor, sensorName, frequency, callback) {
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
