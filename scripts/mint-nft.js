require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/myNFT.sol/TribunalNFT.json");
const contractAddress = "0x64da298bdd8200482b821951308eac0732d3a5e8";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const TEST_TOKEN_URI = "ipfs://QmNkTdmZMHaSaaA2HbJYXpv6dvpSBD3aUKH6tJ25PAJCpQ";

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

async function mintNFT2(tokenURI, req_addr) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  console.log(tokenURI);
  console.log(req_addr);
  //the transaction
  const tx = {
    from: req_addr,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const mint = await signPromise
    .then(async (signedTx) => {
      const transaction =  await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
            return hash;
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
            return err;
          }
        }
      );
      return transaction
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
  console.log("mint ==>++>+>+>+", mint);
  return mint;
}

// mintNFT(TOKEN_URI);

const MintTestNFT = async (req_addr) =>
  await mintNFT2(TEST_TOKEN_URI, req_addr);

module.exports = {
  Mint: MintTestNFT,
};
