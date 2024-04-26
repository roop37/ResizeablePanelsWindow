const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  textData: { type: String, required: true },
});

module.exports = mongoose.model("DataModel", dataSchema);
