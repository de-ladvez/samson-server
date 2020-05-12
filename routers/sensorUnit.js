import express from "express";
import {SensorModel} from "../models/sensorUnits";
import {parseError} from "../util/helper";
import {sensorRow, getSensor} from "../validation/sensor";
import Joi from "@hapi/joi";

const sensorRuter = express.Router();

sensorRuter.post("", async (req, res) => {
    try {
        let resData = [];
        const arr = req.body;
        await Joi.validate({...arr}, sensorRow);
        const unitnumber = arr.unitnumber;
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

        res.send("ok");
    } catch (e) {
        res.status(500).send(parseError(e));
    }
});

sensorRuter.get("", async (req, res) => {
    try {
        const body = req.body;
        await Joi.validate({...body}, getSensor);

//TODO: обработать ошибку если нет коллекции, сейчас возвращает пустой массив
        await SensorModel(body.unitnumber)
            .where("timeshtamp")
            .gte(body.start)
            .lte(body.end)
            .then(answer => {
                res.send({
                        sensors: answer.map(item => {
                            return item.data;
                        })[0]
                    }
                );
            }).catch(err => {
                console.log(err)
            });
    } catch (e) {
        res.status(500).send(parseError(e));
    }
});

export {sensorRuter};