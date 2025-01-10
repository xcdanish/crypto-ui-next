const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    amount: {
      type: Number,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("crypto", cryptoSchema);
