import mongoose from "mongoose";

const UnitsSchema = new mongoose.Schema({
    unitnumber: {
        type: Number,
        unique: true
    },
    name: String,
    address: String,
    custom: Array,
    vehiclemodel: String,
    vehiclecolor: String,
    unittype: String,
    icon: Number,
    active: Boolean,
    unitmodel: String,
});

const UnitModel = mongoose.model("Unit", UnitsSchema);

export default UnitModel;