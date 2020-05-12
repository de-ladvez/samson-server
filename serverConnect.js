// import db from "./connectDB";
import {header} from "./header";
import {apiRouters} from "./routers"

const express = require('express');
const bodyParser = require("body-parser");
import {unitsRouter} from "./routers/units"
import {MONGO_URI} from "./config";
import mongoose from "mongoose";


(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log("conection to bd");
        const app = express();
        // const {
        //     unitsCollection
        // } = res;

        app.use(bodyParser.json());

        app.use(header);

        app.disable('x-powered-by');

        app.use(express.urlencoded({extended: true}));
        app.use(express.json());

        // const api = express.Router();
        // app.use("/api", api);
        // api.use("/units", unitsRouter);
        app.use("/api", apiRouters);


        // app.get();
        // app.post("/units", (req, res) => {
        //     unitsCollection.insertOne(req.body)
        //         .then(res => console.log(res))
        //         .catch(err => console.log(err));
        // });

        app.listen(5000, () => {
            console.log("listening on 5000 port");
        });
    } catch (err) {
        console.error(err);

    }

})();
