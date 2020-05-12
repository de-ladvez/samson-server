import Joi from "@hapi/joi";

const boolean = Joi.boolean().truthy("1").truthy("yes").truthy("true").truthy(1).falsy("0").falsy("no").falsy("false").falsy(1);

const unitnumber = Joi.number().integer().required().min(2);
const datetime_actual = Joi.date().required();
const timeshtamp = Joi.date().required();
const data = Joi.array();
const altitude = Joi.string().empty("");
const datetime_utc = Joi.date();
const door = boolean;
const emergency = boolean;
const gps_connected = boolean;
const gps_valid = Joi.string().empty("");
const heading = Joi.string().empty("");
const latitude = Joi.number();
const light = boolean;
const longitude = Joi.number();
const main_voltage = Joi.number();
const mileage = Joi.number();
const reason = Joi.number().integer();
const response = Joi.string().empty("");
const rpm = Joi.number().integer();
const satellites = Joi.string().empty("");
const software_version = Joi.string().empty("");
const temperature_ext = Joi.number();
const velocity = Joi.number();

export const sensorRow = Joi.object().keys({
    unitnumber,
    data
});

export const sensor = Joi.object().keys({
    datetime_actual,
    altitude,
    datetime_utc,
    door,
    emergency,
    gps_connected,
    gps_valid,
    heading,
    latitude,
    light,
    longitude,
    main_voltage,
    mileage,
    reason,
    response,
    rpm,
    satellites,
    software_version,
    temperature_ext,
    velocity
});