import express from "express";
import UnitsModel from "../models/units";
import {units} from "../validation/units"
import Joi from "@hapi/joi"
import {parseError} from "../util/helper"

const unitsRouter = express.Router();

unitsRouter.post("", async (req, res) => {
        try {
            const arr = req.body;
            for (let item of arr) {
                await Joi.validate({...item}, units);
            }
            await UnitsModel.insertMany(arr, {
                ordered: false
            });
            res.send("success saved");
        }
        catch
            (err) {
            res.status(500).send(parseError(err));
        }
    }
);

unitsRouter.get("", async (req, res) => {
    try {
        const obj = req.body;

        await UnitsModel.find(obj).then(answer => {
            res.send(answer);
        })
    } catch (err) {
        res.status(500).send(parseError(err));
    }
});

export {unitsRouter};