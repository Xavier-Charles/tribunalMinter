// Add Express
const express = require("express");
const { Mint } = require("./scripts/mint-nft");

// Initialize Express
const app = express();

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Create POST request
app.post("/mint", async function requestHandler(req, res) {
  if (req?.body?.address) {
    const result = await Mint(req?.body?.address);
    res.status(200).send({ message: "Sucessful", result });
  } else res.status(401).send({ error: "No address sent" });
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
