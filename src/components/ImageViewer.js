import React, { Component } from 'react';
import {Button, View} from 'react-native';
import {ContractFactory, providers} from 'ethers';
import bytecode from './Bytecode.js'; 
import abi from './Abi.js'; 
const ipfsClient = require('ipfs-http-client')
require('dotenv').config();
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 



class ImageViewer extends Component {


  async deploySmartContract () {

    await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner()
    const signersAddress = await signer.getAddress()
    console.log("Account:", signersAddress);

    const factory = new ContractFactory(abi(), bytecode(), signer)
    const InterPlan721 = await factory.deploy(this.state.name, this.state.symbol);
    console.log("Contract Address:", InterPlan721.address);
    this.setState({
        deployed_address: InterPlan721.address
      })
    }



  async uploadFile () {

    await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner()
    const signersAddress = await signer.getAddress()
    console.log("Account:", signersAddress);

    const factory = new ContractFactory(abi(), bytecode(), signer).attach(this.state.contract_address)
    var image_path;
    
    console.log("Submitting file to IPFS...")
    var metaData = '{ ';
    for await (var result of ipfs.add(this.state.file, { pin: true }))
    {
      console.log('hash ', result.path)
      metaData +=  '\n' + '\t' + '"' + 'name' + '"'  + ':' + " " + '"' +  'Hex Profile Pic'  +  '"' + ', ';
      metaData +=  '\n' + '\t' + '"' + 'description' + '"'  + ':' + " " + '"' +  this.state.description + '"' + ', ';
      metaData +=  '\n' + '\t' + '"' + 'symbol' + '"'  + ':' + " " + '"' + 'HXP' +  '"' + ', ';
      metaData +=  '\n' + '\t' + '"' + 'image' + '"'  + ':' + " " + '"' + 'ipfs://' + result.path + '"';// + ', ';
      metaData += '\n' + '}';
      image_path = result.path
    }
    console.log(metaData)
    console.log("Submitting file to IPFS...")
    const jsonDATA = JSON.parse(metaData);
    for await (var meta of ipfs.add(JSON.stringify(jsonDATA), { pin: true }))
    {
      console.log(signersAddress)
      const imageURI = 'https://ipfs.io/ipfs/' + image_path
      const tokenURI = 'https://ipfs.io/ipfs/' + meta.path
      console.log('URL: ', tokenURI)
      console.log('image: ', imageURI)
      const InterPlan721 = await factory.mintInterPlan721(signersAddress, tokenURI);
      console.log("Transaction Hash:\t", InterPlan721.hash)
      this.setState({
        transactionHash: InterPlan721.hash
      })
    }
  }


  captureFile = event => 
  {
    console.log('capturing ', this.state.image)
    event.preventDefault()
    const temp = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(temp)

    reader.onloadend = () => {
      this.setState({ file: temp })
      console.log('file', temp)
    }
  }

  constructor(props) 
  {
    super(props)
    this.state = 
    {
      description: null,
      file: null,
      address: null,
      name: null,
      symbol: null,
      contract_address: null,
      transactionHash: null,
      deployed_address: null,
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.deploySmartContract = this.deploySmartContract.bind(this)
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>InterPlanetary Image</h1>

      <h8></h8>
      <Button
      title="Home Page"
      onPress={() => this.props.navigation.navigate('Home')}
      />


    <form onSubmit={(event) => {
      event.preventDefault()
      const temp_name = this.name.value
      const temp_symbol = this.symbol.value
      this.setState({
        name: temp_name,
        symbol: temp_symbol
      })
      this.deploySmartContract()
    }}>


    <div className="form-group mr-sm-2">

    <div className="form-group mr-sm-2"></div>
    <input
      id= 'name'   
      type="text"
      className="form-control-sm"
      placeholder="Name of Smart Contract"
      required
      ref={(input) => {this.name = input}}
    />


    <div className="form-group mr-sm-2"></div>
    <input
      id= 'symbol'   
      type="text"
      className="form-control-sm"
      placeholder="Symbol of Smart Contract"
      required
      ref={(input) => {this.symbol = input}}
    />

    <div className="form-group mr-sm-2"></div>
    <input
      type='submit'
      className='btn btn-block btn-primary'
      value='Deploy Smart Contract'
    />
    </div></form>

    <div>Contract Address Hash: {this.state.deployed_address}</div>



    <form onSubmit={(event) => {
        event.preventDefault()
        const temp_contract_address = this.contract_address.value
        const temp_description = this.description.value
        this.setState({
          description: temp_description,
          contract_address: temp_contract_address
        })
        this.uploadFile()
      }}>



      <input 
        type='file' 
        accept=".jpg, .png, .jpeg" 
        onChange={this.captureFile}
      />
      <div className="form-group mr-sm-2">
      <h1> </h1>

      <div className="form-group mr-sm-2"></div>
      <input
        id= 'contract_address'   
        type="text"
        className="form-control-sm"
        placeholder="Address of smart contract"
        required
        ref={(input) => {this.contract_address = input}}
      />


      <div className="form-group mr-sm-2"></div>
      <input
        id= 'description'   
        type="text"
        className="form-control-sm"
        placeholder="Description of NFT"
        required
        ref={(input) => {this.description = input}}
      />

      <div className="form-group mr-sm-2"></div>
      <input
      type='submit'
      className='btn btn-block btn-primary'
      value='Mint NFT'
      />
      </div></form>

      <div>Transaction Hash:{this.state.transactionHash}</div>
      <div>Use this hash in a website that can ether scan to find tokenID and for more information.</div>   
    </View>
    )
  }
}
export default ImageViewer;