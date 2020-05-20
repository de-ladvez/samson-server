import {header} from "./header";
import {apiRouters} from "./routers"
import {MONGO_URI, PORT} from "./config";
import mongoose from "mongoose";
const express = require('express');
const bodyParser = require("body-parser");


(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("conection to bd");
        const app = express();

        app.use(bodyParser.json());

        app.use(header);

        app.disable('x-powered-by');

        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use("/api", apiRouters);

        app.listen(PORT, () => {
            console.log(`listening on ${PORT} port`);
        });
    } catch (err) {
        console.error(err);

    }

})();
