import mongoose from "mongoose";

export const dinamicModel = (collectionName = "11", schema, prefix = "_dnc",) => {
    if( !(collectionName in dinamicModel)) {
        dinamicModel[collectionName] = mongoose.model(collectionName+prefix, schema);
    }
    return dinamicModel[collectionName];
};