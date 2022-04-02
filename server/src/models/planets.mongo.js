const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: { type: String, required: true, default: 100 },
});

module.exports = mongoose.model("planet", planetsSchema);
