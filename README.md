# Fitbit Sensor Collector

A Fitbit watch application that collects data from sensors and forward to local android app.

## Overview

A simple Fitbit watch application built with [Fitbit SDK](https://dev.fitbit.com/), specifically for Fitbit Sense. The application is to achieve two major features listed below:

1. Collect physiological data of users (nursing students and teachers) as frequently as reasonable (1Hz). Sensors that can be accessed by this application are:

   - Heart Rate Sensor
   - Accelerometer
   - Gyroscope (commented out)
   - Orientation Sensor (commented out)

2. Forward (POST) the data read from sensors to local android app (same device) or HTTPS (must be non-self-signed certificate).

## How to install

### Prerequisite

If the app is yet to be published, the only way is to install using developer mode. To enable developer mode, make sure:

- A Google account is set up. (Fitbit does not use email to sign in anymore, you MUST use Sign In With Google option)
- In order to gain access to the developer functionality, you must first login to [Gallery Admin](https://gam.fitbit.com/), and accept the Fitbit Platform Terms of Service (Developer functions will not be shown otherwise).
- Each device (watch) MUST have its own pairing account and pairing phone (one phone cannot support more than one watch at a time).
- Fitbit device (watch), pairing phone, and pc must be using the same wifi.
- The wifi connected cannot be Eduroam (Eduroam has security and networking features that prevent fitbit device connecting to wifi)
- Fitbit device (watch), pairing phone, and pc must be logged into the same fitbit account.

### Installation

To install this Fitbit application to Fitbit Sense, you'll need the following steps:

- Make sure Official Fitbit app installed on the paired Android phone
- Same Fitbit account logged in to Fitbit app, Fitbit CLI (do `npx fitbit` and do `logout` again to switch account)
- Double check the user (students, teachers) and the IP address of data destination (Android local server) in `/companion/config.js`
- Run `npx fitbit` in root directory
- Run `bi` to build and install the Fitbit watch application

### Enable notification from teamwork-analysis-dashboard
After installing this Fitbit application on the phone, follow the instructions on the repository of [android-fitbit-middleman](https://github.com/Teamwork-Analytics/android-fitbit-middleman) to install the Android app required. Then:
- Go to the Fitbit app on the device
- Navigate to the paired device (Fitbit watch), which is likely to be an icon located on the top left in the application home page.
- Select the device and navigate to `General`>`Notifications`>`App Notification`.
- Enable (tick) the notification for our Android app (System Fitbit Connector).

## File structure

This Fitbit watch application consist of two components: `/app` and `/companion`.

The `/app` folder is application running on the watch. It has access and permission to the sensors. It reads the sensor data forward the data to the companion app using `Messaging API`.

The `/companion` folder is the companion side-loaded in the official Fitbit mobile application. Once companion receive data from watch application, it `POST` it to the target IP using `Fetch API`.

## Configuration

To change the targeted IP of the companion (the IP of the system which is receiving the sensor data), go `/companion/config.js` and edit `SERVER_URL`.

To change the user of the device before students or teachers wearing the watch, go `/companion/config.js` and edit `USER`.
