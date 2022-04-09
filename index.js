// Add Express
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // import mongoose
const { Mint } = require("./scripts/mint-nft");
const Proposal = require("./models/proposal");

const { MONGO_URL } = process.env;

// Initialize Express
const app = express();
const router = express.Router();
mongoose.connect(MONGO_URL, {}, (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected");
});

app.use(cors());

//Enable prefligt
app.options("*", cors()); // include before other routes

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());
app.use(router);

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// // Create POST request
// app.post("/mint", async function requestHandler(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   if (req?.body?.address) {
//     const result = await Mint(req?.body?.address);
//     res.status(200).send(JSON.stringify({ message: "Sucessful", result }));
//   } else res.status(401).send({ error: "No address sent" });
// });

// Get proposals
router.get("/proposals", async (req, res) => {
  try {
    let data = await Proposal.find();
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Create a proposal
router.post("/proposal", async (req, res) => {
  try {
    let proposal = new Proposal(req.body);
    data = await proposal.save();
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Read a proposal
router.get("/proposal/:proposalId", async (req, res) => {
  try {
    let proposal = await Proposal.findOne({
      _id: req.params.proposalId,
    });
    if (proposal) {
      res.status(200).json({
        status: 200,
        data: proposal,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No proposal found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Update a proposal
router.put("/proposal/:proposalId", async (req, res) => {
  try {
    let data = await Proposal.findByIdAndUpdate(
      req.params.proposalId,
      req.body,
      {
        new: true,
      }
    );
    if (data) {
      res.status(200).json({
        status: 200,
        data: data,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No proposal found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Delete proposal
router.delete("/proposal/:proposalId", async (req, res) => {
  try {
    let data = await Proposal.findByIdAndRemove(req.params.proposalId);
    if (data) {
      res.status(200).json({
        status: 200,
        message: "Proposal deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No proposal found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
