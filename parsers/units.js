import axios from "axios";
import dateFormat from "dateformat";
import {parseError} from "../util/helper";
import {MONGO_URI} from "../config";
import mongoose from "mongoose";
import UnitModel from "../models/units";
import {SensorModel} from "../models/sensorUnits";

const log = require('simple-node-logger').createSimpleLogger('/home/ubuntu/samson-server/logs/parserCron.log');
// const log = require('simple-node-logger').createSimpleLogger('logs/parserCron.log');

const date = new Date();
const dayCount = 1;
date.setHours(0, 0, 0);
let localEnd = dateFormat(date, "yyyymmddHHMMss");
let localStart = dateFormat(date.setDate(date.getDate() - dayCount), "yyyymmddHHMMss");

log.info('ok ','----------- ', new Date().toJSON());

//
// (async () => {
//     mongoose.connect(MONGO_URI, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     });
//
//     await axios.get("https://mongol.brono.com/mongol/api.php?commandname=get_units&user=devsamson&pass=devsamson01&format=json")
//         .then(async result => {
//             const arr = result.data;
//             for (let item of arr) {
//                 console.log(item.unitnumber);
//                 await UnitModel.findOneAndUpdate({unitnumber: item.unitnumber}, {$set: item}, res => {
//                     axios.get(`https://mongol.brono.com/mongol/api.php?commandname=get_history&user=devsamson&pass=devsamson01&format=json&unitnumber=${item.unitnumber}&start=${localStart}&end=${localEnd}`)
//                         .then(async (res) => {
//                             const arr = res.data;
//                             console.log(localStart);
//                             console.log(localEnd);
//                             console.log(arr.length);
//                             try {
//                                 let resData = [];
//                                 const prepaireData = arr.reduce((acum, ditem) => {
//                                     const timeshtamp = ditem.datetime_actual.slice(0, 8) + "000000";
//                                     if (!acum[timeshtamp]) {
//                                         acum[timeshtamp] = [];
//                                     }
//                                     acum[timeshtamp].push(ditem);
//                                     return acum;
//                                 }, {});
//                                 for (let i in prepaireData) {
//                                     await
//                                         resData.push({timeshtamp: i, data: [...prepaireData[i]]})
//                                 }
//                                 await SensorModel(item.unitnumber).create(resData, (r)=> {
//                                     console.log(r)
//                                 });
//                                 log.info('ok ',item.unitnumber,'----------- ', new Date().toJSON());
//
//                             } catch (e) {
//                                 log.info('error', ' -- ', e, ' -- ', new Date().toJSON());
//                             }
//                         })
//                         .catch((e) => {
//                             log.info('error', ' -- ', e, ' -- ', new Date().toJSON());
//
//                         })
//
//                     console.log(res)
//                 });
//             }
//             // res.n; // Number of documents matched
//             // res.nModified; // Number of documents modified
//         })
//         .catch(err => {
//             log.info('error', ' -- ', err, ' -- ', new Date().toJSON());
//         });
//
//     let connTime = setTimeout(()=> {mongoose.connection.close();clearTimeout(connTime);}, 120000);
//
// })();
