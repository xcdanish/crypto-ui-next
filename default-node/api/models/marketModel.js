const mongoose = require("mongoose");
let aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let mongoosePaginate = require("mongoose-paginate-v2");

const marketSchema = mongoose.Schema(
  {
    open: {
      type: String,
    },
    high: {
      type: String,
    },
    low: {
      type: String,
    },
    close: {
      type: String,
    },
    volumn: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

marketSchema.plugin(aggregatePaginate);
marketSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("market", marketSchema);
