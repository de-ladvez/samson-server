import axios from "axios";
import dateFormat from "dateformat";
import {parseError} from "../util/helper";
import {MONGO_URI, PORT} from "../config";
import mongoose from "mongoose";
import {SensorModel} from "../models/sensorUnits";

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const unitnumber = "378272";
const dayCount = 6;

let year = 2020;
let month = 4;
let day = 18;

let date = new Date();
date.setFullYear(year, month, day);
date.setHours(0,0,0);
let localEnd = dateFormat(date, "yyyymmddHHMMss");
let localStart = dateFormat(date.setDate(date.getDate() - dayCount), "yyyymmddHHMMss");

setInterval(() => {
    axios.get(`https://mongol.brono.com/mongol/api.php?commandname=get_history&user=devsamson&pass=devsamson01&format=json&unitnumber=${unitnumber}&start=${localStart}&end=${localEnd}`)
        .then(async (res) => {
            const arr = res.data;
            console.log(localStart);
            console.log(arr.length);
            try {
                let resData = [];
                const prepaireData = arr.data.reduce((acum, item) => {
                    const timeshtamp = item.datetime_actual.slice(0, 8) + "000000";
                    if (!acum[timeshtamp]) {
                        acum[timeshtamp] = [];
                    }
                    acum[timeshtamp].push(item);
                    return acum;
                }, {});
                for (let i in prepaireData) {
                    await resData.push({timeshtamp: i, data: [...prepaireData[i]]})
                }

                SensorModel(unitnumber).insertMany(resData, {
                    ordered: false
                });

                localEnd = localStart;
                localStart = dateFormat(date.setDate(date.getDate() - dayCount), "yyyymmddHHMMss");
                console.log("ok");
            } catch (e) {
                console.log(parseError(e));
            }
        });
}, 10000);
