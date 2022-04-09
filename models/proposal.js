const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let proposalSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    author: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    votes: {
      type: Object,
    },
  },
  { timestamps: true }
);

let Proposal = mongoose.model("proposal", proposalSchema);

module.exports = Proposal;
