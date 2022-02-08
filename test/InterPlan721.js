const { expect } = require("chai");
const hre = require("hardhat");



describe("testing URI", function () {
  it("Deployment should assign URI of the NFT's URI", async function () {
    const [owner] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractFactory("InterPlan721");

    const deployed = await contract.deploy(owner.address, "Bolder and Brasher", "B&B", "https://ipfs.io/ipfs/QmZNkrZ54QroSmQvzoA633tG3rKCNPyiDkFJKquG78QRMZ");
    expect(await deployed.tokenURI(1)).to.equal("https://ipfs.io/ipfs/QmZNkrZ54QroSmQvzoA633tG3rKCNPyiDkFJKquG78QRMZ");
  });
});

  
  describe("testing name", function () {
    it("Deployment should assign name to NFT's name", async function () {
      const [owner] = await hre.ethers.getSigners();
  
      const contract = await hre.ethers.getContractFactory("InterPlan721");
    
      const deployed = await contract.deploy(owner.address, "Bolder and Brasher", "B&B", "https://ipfs.io/ipfs/QmZNkrZ54QroSmQvzoA633tG3rKCNPyiDkFJKquG78QRMZ");
      expect(await deployed.name()).to.equal("Bolder and Brasher");
    });
  });
