const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  addCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("CountModel", countSchema);
