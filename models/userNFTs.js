const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userNFTSchema = new Schema(
  {
    userAddress: {
      type: String,
    },
    nftAddress: {
      type: String,
    },
    tribunalAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

let UserNFTs = mongoose.model("userNFT", userNFTSchema);

module.exports = UserNFTs;