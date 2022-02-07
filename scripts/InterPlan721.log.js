const { ethers } = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners("a0b177cc94c90b964045eb3893da7a56f996bdf616f045c0b3ff6ba43add4078");

    const contract = await ethers.getContractFactory("InterPlan721");

    const deployed = await contract.deploy(deployer.address, "Bolder and Brasher", "B&B", "https://ipfs.io/ipfs/QmZNkrZ54QroSmQvzoA633tG3rKCNPyiDkFJKquG78QRMZ");

    console.log("Contract deployed at:", deployed.tokenURI(1));

    console.log("Contract deployed at:", deployed.name());


    console.log("Contract deployed at:", deployed.symbol());

}
main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });
