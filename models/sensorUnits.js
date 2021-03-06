import mongoose from "mongoose";
import {dinamicModel} from "../util/dinamicModel";

const RecordSchema = mongoose.Schema({
    altitude: String,
    datetime_actual: String,
    datetime_utc: String,
    door: String,
    emergency: String,
    gps_connected: String,
    gps_valid: String, //? "1"
    heading: String, //? "0"
    latitude: String,
    light: String,
    longitude: String,
    main_voltage: String,
    mileage: String,
    reason: Number,
    response: String,
    rpm: Number, //? 0
    satellites: String, //? "0"
    software_version: String,
    temperature_ext: String,
    velocity: String
});

const SensorShema = mongoose.Schema({
    timeshtamp: {
        type: String,
        unique: true
    },
    data: {type: [RecordSchema]}
});

export const SensorModel = (collectionName) => dinamicModel(collectionName, SensorShema, "_unit_sensors");

