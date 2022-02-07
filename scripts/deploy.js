const { ethers } = require("hardhat");
async function main() {
	const [deployer] = await ethers.getSigners("a0b177cc94c90b964045eb3893da7a56f996bdf616f045c0b3ff6ba43add4078");
	console.log(
	"Deploying contracts with the account:",
	deployer.address
	);
	console.log("Account balance:", (await deployer.getBalance()).toString());
    const contract = await ethers.getContractFactory("InterPlan721");
    const metaData = {
        "name": "Bolder and Brasher",
        "description": "Bikini B's most finest artowrok from its most finest artists",
        "image": "https://ipfs.io/ipfs/QmY3k2sUAnujNqs5ApfBqzkoD4qhJaFbpMNKLWbySwV3eD",
        "attributes": []
      }
    const deployed =  await contract.deploy(deployer.address, "Bolder and Brasher", "B&B", metaData);
    console.log("Contract deployed at:", deployed.address);
}
main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });