import mongoose from "mongoose";
import {dinamicModel} from "../util/dinamicModel";

const RecordSchema = mongoose.Schema({
    altitude: String,
    datetime_actual: {
        type: String,
        unique: true
    },
    datetime_utc: String,
    door: Number,
    emergency: Number,
    gps_connected: Number,
    gps_valid: String, //? "1"
    heading: String, //? "0"
    latitude: String,
    light: Number,
    longitude: String,
    main_voltage: String,
    mileage: String,
    reason: Number,
    response: String,
    rpm: Number, //? 0
    satellites: String, //? "0"
    software_version: String,
    temperature_ext: Number,
    velocity: String
});

export const RecordSensorSchema = (collectionName) => dinamicModel(collectionName, RecordSchema, "_unit_sensors");

