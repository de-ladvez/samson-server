import axios from "axios";
import dateFormat from "dateformat";
import {parseError} from "../util/helper";
import {MONGO_URI} from "../config";
import mongoose from "mongoose";
import UnitModel from "../models/units";
import {SensorModel} from "../models/sensorUnits";
import {RecordSensorSchema} from "../models/sensorItem";

const log = require('simple-node-logger').createSimpleLogger('/home/ubuntu/samson-server/logs/parserCron.log');
const date = new Date();
const dayCount = 1;
date.setHours(0, 0, 0);
let localEnd = dateFormat(date, "yyyymmddHHMMss");
let localStart = dateFormat(date.setDate(date.getDate() - dayCount), "yyyymmddHHMMss");

(async () => {
    mongoose.connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    await axios.get("https://mongol.brono.com/mongol/api.php?commandname=get_units&user=devsamson&pass=devsamson01&format=json")
        .then(async result => {
            const arr = result.data;
            for (let item of arr) {
                console.log(item.unitnumber);
                await UnitModel.findOneAndUpdate({unitnumber: item.unitnumber}, {$set: item}, res => {
                    axios.get(`https://mongol.brono.com/mongol/api.php?commandname=get_history&user=devsamson&pass=devsamson01&format=json&unitnumber=${item.unitnumber}&start=${localStart}&end=${localEnd}`)
                        .then(async (res) => {
                            const arr = res.data;
                            // console.log(localStart);
                            // console.log(localEnd);
                            // console.log(arr.length);
                            try {
                                await RecordSensorSchema(item.unitnumber).insertMany(arr, (r)=> {
                                    // console.log(r)
                                });
                                log.info('ok ',item.unitnumber,'----------- ', new Date().toJSON());

                            } catch (e) {
                                log.info('error', ' -- ', e, ' -- ', new Date().toJSON());
                            }
                        })
                        .catch((e) => {
                            log.info('error', ' -- ', e, ' -- ', new Date().toJSON());

                        })
                    // console.log(res)
                    // log.info('error', ' -- ', e, ' -- ', new Date().toJSON());
                });
            }
        })
        .catch(err => {
            log.info('error', ' -- ', err, ' -- ', new Date().toJSON());
        });

    let connTime = setTimeout(()=> {mongoose.connection.close();clearTimeout(connTime);}, 120000);
})();
