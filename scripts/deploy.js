const { ethers } = require("hardhat");
const ipfsClient = require('ipfs-http-client')
var fs = require('fs')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 


async function main() {
	const [deployer] = await ethers.getSigners("a0b177cc94c90b964045eb3893da7a56f996bdf616f045c0b3ff6ba43add4078")
	console.log(
	  "Deploying contracts with the account:",
	  deployer.address
	)
	console.log("Account balance:", (await deployer.getBalance()).toString())
  const contract = await ethers.getContractFactory("InterPlan721")
  const image = "https://ipfs.io/ipfs/QmVLpQhvbXh1HuS9xP5rc7cBGPZsNsFBGoA1FUm7RULw1p";
  var metaData = '{ '
  metaData +=  '"description": "Bold and Brasher but more", '
  metaData +=  '"name": "Bolder and Brasher", '
  metaData +=  '"image": "' + image + '", ' 
  metaData +=  '"attributes": [ ]'
  metaData += '}'
  var jsonObj = JSON.stringify(metaData)
  fs.writeFileSync("metaData.json", metaData, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
  console.log(jsonObj);

// add the metadata itself as well
  var file;
  var deployed;
  for await (file of ipfs.add(metaData, { pin: true }))
  {
    console.log("Hash: ", file.path)
    deployed =  await contract.deploy(deployer.address, "Bold and Brasher", "B++", "../metaData.json")
    console.log("Address: ", deployed.address)
  }
  console.log(await contract.tokenURI(1))
  fs.unlinkSync("../metaData.json");
}
main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });
  