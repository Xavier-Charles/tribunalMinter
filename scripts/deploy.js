async function main() {
  const TribunalNFT = await ethers.getContractFactory("TribunalNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const tribunalNFT = await TribunalNFT.deploy();
  await tribunalNFT.deployed();
  console.log("Contract deployed to address:", tribunalNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
