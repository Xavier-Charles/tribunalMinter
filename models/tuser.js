const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let tuserSchema = new Schema(
  {
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

let TUser = mongoose.model("tuser", tuserSchema);

module.exports = TUser;
