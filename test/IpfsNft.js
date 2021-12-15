const { expect } = require("chai");

describe("NFT contract", function () {
  it("Deployment should assign the total supply of NFTs to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("IpfsNft");

    const hardhatNFT = await NFT.deploy();

    const ownerBalance = await hardhatNFT.balanceOf(owner.address);
    expect(await hardhatNFT.totalSupply()).to.equal(ownerBalance);
  });
});