import express from "express";
import {unitsRouter} from "./units";
import {sensorRuter} from "./sensorUnit";
import {sensorFilterRuter} from "./sensorFilter";

const apiRouters = express.Router();

apiRouters.use("/units", unitsRouter);
apiRouters.use("/history_unit", sensorRuter);
apiRouters.use("/sensor_filter", sensorFilterRuter);

export {apiRouters}