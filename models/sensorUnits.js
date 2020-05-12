import mongoose from "mongoose";
import {dinamicModel} from "../util/dinamicModel";

// const RecordSchema = mongoose.Schema({
//     altitude: String,
//     datetime_actual: {
//         type: Date,
//         unique: true
//     },
//     datetime_utc: Date,
//     door: Boolean,
//     emergency: Boolean,
//     gps_connected: Boolean,
//     gps_valid: String, //? "1"
//     heading: String, //? "0"
//     latitude: mongoose.Decimal128,
//     light: Boolean,
//     longitude: mongoose.Decimal128,
//     main_voltage: mongoose.Decimal128,
//     mileage: mongoose.Decimal128,
//     reason: Number,
//     response: String,
//     rpm: Number, //? 0
//     satellites: String, //? "0"
//     software_version: String,
//     temperature_ext: mongoose.Decimal128,
//     velocity: mongoose.Decimal128
// });

const SensorShema = mongoose.Schema({
    timeshtamp: {
        type: String,
        unique: true
    },
    data: []
});

export const SensorModel = (collectionName) => dinamicModel(collectionName, SensorShema, "_unit_sensors");

