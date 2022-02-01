const { expect } = require("chai");


describe("NFT contract", function () {
  it("Deployment should assign the total supply of NFTs to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("InterPlan721");

    const hardhatNFT = await NFT.deploy();

    //const ownerBalance = await hardhatNFT.balanceOf(owner.address);

    hardhatNFT.grantItem(owner.address, "https://giphy.com/gifs/rick-astley-Ju7l5y9osyymQ")
    expect(await hardhatNFT.tokenURI(1)).to.equal("https://giphy.com/gifs/rick-astley-Ju7l5y9osyymQ");
  });
});