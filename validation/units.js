import Joi from "@hapi/joi";

const boolean = Joi.boolean().truthy("1").truthy("yes").truthy("true").truthy(1).falsy("0").falsy("no").falsy("false").falsy(1);

const unitnumber = Joi.number().integer().required().min(2);
const name = Joi.string();
const address = Joi.string();
const custom = Joi.array();
const vehiclemodel = Joi.string().empty("");
const vehiclecolor = Joi.string().empty("");
const unittype = Joi.string();
const icon = Joi.number();
const active = boolean;
const unitmodel = Joi.string();

export const units = Joi.object().keys({
    unitnumber,
    name,
    address,
    custom,
    vehiclemodel,
    vehiclecolor,
    unittype,
    icon,
    active,
    unitmodel
});