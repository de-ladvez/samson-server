import express from "express";
import {unitsRouter} from "./units";
import {sensorRuter} from "./sensorUnit";

const apiRouters = express.Router();

apiRouters.use("/units", unitsRouter);
apiRouters.use("/history_unit", sensorRuter);

export {apiRouters}