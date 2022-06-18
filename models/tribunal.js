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
    fileUrl: {
      type: String,
    },
    mintFee: {
      type: double,
    },
  },
  { timestamps: true }
);

let Tribunal = mongoose.model("tribunal", tribunalSchema);

module.exports = Tribunal;
