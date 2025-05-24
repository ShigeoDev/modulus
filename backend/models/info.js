const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const infoSchema = new Schema({

  info: { type: String, required: true },

});

const infoModel = model("Info", infoSchema);

module.exports = infoModel;

