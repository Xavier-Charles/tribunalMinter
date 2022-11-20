const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let tribunalSchema = new Schema(
  {
    tribunalName: {
      type: String,
    },
    email: {
      type: String,
    },
    walletAddress: {
      type: String,
    },
    about: {
      type: String,
    },
    contract_address: {
      type: String,
    },
    contract_address: {
      type: number,
    },
    fileUrl: {
      type: String,
    },
    mintFee: {
      type: Number,
    },
    creator: {
      type: String,
    },
    creatorName: {
      type: String,
    },
  },
  { timestamps: true }
);

let Tribunal = mongoose.model("tribunal", tribunalSchema);

module.exports = Tribunal;
