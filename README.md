# Fitbit Sensor Collector

A Fitbit watch application that collects data from sensors and forward to local android app.

## Overview

A simple Fitbit watch application built with [Fitbit SDK](https://dev.fitbit.com/), specifically for Fitbit Versa. The application is to achieve two major features listed below:

1. Collect physiological data of users (nursing students and teachers) as frequent as reasonable (1Hz). Sensors that can be accessed by this application are:

   - Heart Rate Sensor
   - Accelerometer
   - Gyroscope (commented out)
   - Orientation Sensor (commented out)

2. Forward (POST) the data read from sensors to local android app (same device) or HTTPS (must be non-self-signed certificate).

## How to install

To install this Fitbit application to Fitbit Versa, you'll need the following prerequisites/steps:

- A Fitbit user account for each phone and watch pair (different Google accounts as Fitbit only accept sign in with Google since 2024)
- Official Fitbit app installed on the paired Android phone
- Same Fitbit account logged in to Fitbit app, Fitbit CLI (`logout` and do `npx fitbit` again to switch account)
- Run `npx fitbit` in root directory
- Run `bi` to build and install the Fitbit watch application

## File structure

This Fitbit watch application consist of two components: `/app` and `/companion`.

The `/app` folder is application running on the watch. It has access and permission to the sensors. It reads the sensor data forward the data to the companion app using `Messaging API`.

The `/companion` folder is the companion side-loaded in the official Fitbit mobile application. Once companion receive data from watch application, it `POST` it to the target IP using `Fetch API`.

## Configuration

To change the targeted IP of the companion (the IP of the system which is receiving the sensor data), go `/companion/config.js` and edit `SERVER_URL`.
