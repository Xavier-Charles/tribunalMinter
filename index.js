// Add Express
const express = require("express");
const cors = require("cors");
const { Mint } = require("./scripts/mint-nft");

// Initialize Express
const app = express();

// Use this soon
// var allowedOrigins = ["http://localhost:3000", "http://yourapp.com"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );


app.use(cors())

//Enable prefligt
app.options('*', cors()) // include before other routes

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Create POST request
app.post("/mint", async function requestHandler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req?.body?.address) {
    const result = await Mint(req?.body?.address);
    res.status(200).send(JSON.stringify({ message: "Sucessful", result }));
  } else res.status(401).send({ error: "No address sent" });
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
