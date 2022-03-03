const { expect } = require("chai");
const hre = require('hardhat');


describe("testing name", function () {
  it("check contract name", async function () {
    const contract = await hre.ethers.getContractFactory("HexProfilePic");
  
    const deployed = await contract.deploy();
    expect(await deployed.name()).to.equal("Hex Profile Pic");
  });
});

describe("testing symbol", function () {
  it("check contract symbol", async function () {
    const contract = await hre.ethers.getContractFactory("HexProfilePic");
  
    const deployed = await contract.deploy();
    expect(await deployed.symbol()).to.equal("HXP");
  });
});

  describe("testing tokenURI", function () {
    it("Should be correct should be the same tokeURI", async function () {
      // Connect to mainnet with a Project ID and Project Secret
      const [owner] = await hre.ethers.getSigners();

      const contract = await hre.ethers.getContractFactory("HexProfilePic");
    
      const deployed = await contract.deploy();

      const ID = await deployed.mintHexProfilePic(owner.address, "https://ipfs.io/ipfs/QmZNkrZ54QroSmQvzoA633tG3rKCNPyiDkFJKquG78QRMZ");
      expect(await deployed.tokenURI(1)).to.equal("https://ipfs.io/ipfs/QmZNkrZ54QroSmQvzoA633tG3rKCNPyiDkFJKquG78QRMZ");
    });
  });