const { ethers } = require("hardhat");
require('dotenv').config();


async function main() {
	const [deployer] = await ethers.getSigners(process.env.PRIVATE_KEY)
	console.log(
	  "Deploying contracts with the account:",
	  deployer.address
	)
  await console.log(
	  "Account balance:",
	  deployer.getBalance().toString()
	)
  const contract = await ethers.getContractFactory("HexProfilePic")
  const deployed =  await contract.deploy()
  console.log("Address: ", deployed.address)
}
main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });
  