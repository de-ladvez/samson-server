import express from "express";
import {SensorModel} from "../models/sensorUnits";
import {RecordSensorSchema} from "../models/sensorItem";
import {parseError} from "../util/helper";
import {getSensorFilter} from "../validation/sensor";
import Joi from "@hapi/joi";

const sensorFilterRuter = express.Router();

// sensorRuter.post("", async (req, res) => {
//     console.log("123")
//
//     try {
//         let resData = [];
//         const arr = req.body;
//         await Joi.validate({...arr}, sensorRow);
//         const unitnumber = arr.unitnumber;
//
//         const prepaireData = arr.data.reduce((acum, item) => {
//             const timeshtamp = item.datetime_actual.slice(0, 8) + "000000";
//             if (!acum[timeshtamp]) {
//                 acum[timeshtamp] = [];
//             }
//             acum[timeshtamp].push(item);
//             return acum;
//         }, {});
//         for (let i in prepaireData) {
//             await resData.push({timeshtamp: i, data: [...prepaireData[i]]})
//         }
//
//         SensorModel(unitnumber).insertMany(resData, {
//             ordered: false
//         });
//
//         res.send("ok");
//     } catch (e) {
//         res.status(500).send(parseError(e));
//     }
// });

sensorFilterRuter.get("", async (req, res) => {
    try {
        const body = req.body;
        let response = {};
        // await Joi.validate({...body}, getSensorFilter);
        const start = body.start ? {datetime_actual: {$gte: body.start}} : {};
        const end = body.end ? {datetime_actual: {$lte: body.end}} : {};

        if(body.response) {
            switch (body.response) {
                case "notEmpty":
                    response = {$and: [{response: {$ne: 0}}, {response: {$ne: ""}}]};
                    break;
                default:
                    response = {response: {$eq: body.response}};
                    break;
            }
        }



        const query = {...response, ...start, ...end};
//TODO: обработать ошибку если нет коллекции, сейчас возвращает пустой массив
        await RecordSensorSchema(body.unitnumber)
            .find({...query})
            .sort("datetime_actual")
            .exec((err, answer) => {
                res.send(
                    answer
                );
                console.log(err)

            })
        // .eq("20200512075346")
        // .then(answer => {
        //     res.send({
        //             sensors: answer.map(item => {
        //                 return item.data;
        //             })[0]
        //         }
        //     );
        // }).catch(err => {
        //     console.log(err)
        // });
    } catch (e) {
        res.status(500).send(parseError(e));
    }
});

export {sensorFilterRuter};