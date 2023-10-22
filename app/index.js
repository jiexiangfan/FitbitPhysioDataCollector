import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    console.log(`Current heart rate: ${hrm.heartRate}`);
  });
  hrm.start();
}
