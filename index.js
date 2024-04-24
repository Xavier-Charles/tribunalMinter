// Add Express
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Proposal = require("./models/proposal");
const UserNFTs = require("./models/userNFTs");
const Tribunal = require("./models/tribunal");
const TUser = require("./models/tuser");

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

// Get userNFTs
router.get("/user-nfts", async (req, res) => {
  try {
    let data = await UserNFTs.find();
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

// Get userNFTs from userAddress
router.get("/user-nfts/user/:userAddress", async (req, res) => {
  try {
    let data = await UserNFTs.find({
      userAddress: req.params.userAddress,
    });
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

// Create a userNFT
router.post("/user-nft", async (req, res) => {
  try {
    let userNFT = new UserNFTs(req.body);
    data = await userNFT.save();
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

// Read a userNFT
router.get("/user-nft/:userNFTId", async (req, res) => {
  try {
    let userNFT = await UserNFTs.findOne({
      _id: req.params.userNFTId,
    });
    if (userNFT) {
      res.status(200).json({
        status: 200,
        data: userNFT,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No userNFT found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Update a userNFT
router.put("/user-nft/:userNFTId", async (req, res) => {
  try {
    let data;
    if (req.body.nftOwnerAddress) {
      data = await UserNFTs.findOneAndUpdate(
        { nftId: req.body.nftId },
        { nftOwnerAddress: req.body.nftOwnerAddress },
        {
          new: true,
        }
      );
    } else {
      data = await UserNFTs.findByIdAndUpdate(req.params.userNFTId, req.body, {
        new: true,
      });
    }
    if (data) {
      res.status(200).json({
        status: 200,
        data: data,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No userNFT found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

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

// Get tribunals
router.get("/tribunals", async (req, res) => {
  try {
    let data = await Tribunal.find();
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

// Create a tribunal
router.post("/tribunal", async (req, res) => {
  try {
    let tribunal = new Tribunal(req.body);
    data = await tribunal.save();
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

// Read a tribunal
router.get("/tribunal/:tribunalId", async (req, res) => {
  try {
    let tribunal = await Tribunal.findOne({
      _id: req.params.tribunalId,
    });
    if (tribunal) {
      res.status(200).json({
        status: 200,
        data: tribunal,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No tribunal found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Update a tribunal
router.put("/tribunal/:tribunalId", async (req, res) => {
  try {
    let data = await Tribunal.findByIdAndUpdate(
      req.params.tribunalId,
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
        message: "No tribunal found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Delete tribunal
router.delete("/tribunal/:tribunalId", async (req, res) => {
  try {
    let data = await Tribunal.findByIdAndRemove(req.params.tribunalId);
    if (data) {
      res.status(200).json({
        status: 200,
        message: "Tribunal deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No tribunal found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Get tUsers Count
router.get("/t-users/count", async (req, res) => {
  try {
    let count = await TUser.countDocuments();
    res.status(200).json({
      status: 200,
      data: { count: count },
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Get tUsers
router.get("/t-users", async (req, res) => {
  try {
    let data = await TUser.find();
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

// Create a tUser
router.post("/t-user", async (req, res) => {
  try {
    let tUser = new TUser(req.body);
    data = await tUser.save();
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

// Read a tUser
router.get("/t-user/:tUserId", async (req, res) => {
  try {
    let tUser = await TUser.findOne({
      _id: req.params.tUserId,
    });
    if (tUser) {
      res.status(200).json({
        status: 200,
        data: tUser,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No tUser found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Update a tUser
router.put("/t-user/:tUserId", async (req, res) => {
  try {
    let data = await TUser.findByIdAndUpdate(req.params.tUserId, req.body, {
      new: true,
    });
    if (data) {
      res.status(200).json({
        status: 200,
        data: data,
      });
    } else
      res.status(400).json({
        status: 400,
        message: "No tUser found",
      });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// Delete tUser
router.delete("/t-user/:tUserId", async (req, res) => {
  try {
    let data = await Proposal.findByIdAndRemove(req.params.tUserId);
    if (data) {
      res.status(200).json({
        status: 200,
        message: "Proposal deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No tUser found",
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
app.listen(5500, () => {
  console.log("Running on port 5500.");
});

// Export the Express API
module.exports = app;

// redeploy to vercel = please remove next time