//import NFT from '../artifacts/src/contracts/InterPlan721.sol/InterPlan721.json'
import React, { Component } from 'react';
import {Button, View} from 'react-native';
import {ContractFactory, providers} from 'ethers';
import bytecode from './Bytecode.js'; 
import abi from './Abi.js'; 
const ipfsClient = require('ipfs-http-client')
require('dotenv').config();
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 



class ImageViewer extends Component {


  async uploadFile () {

    await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner()
    const signersAddress = await signer.getAddress()
    console.log("Account:", signersAddress);

      const factory = new ContractFactory(abi(), bytecode(), signer)
      
      console.log("Submitting file to IPFS...")
      var metaData = '{ ';
      for await (var result of ipfs.add(this.state.file, { pin: true }))
      {
        console.log('hash ', result.path)
        metaData +=  '"name": "' + this.state.name + '",';
        metaData +=  '"description": ' + this.state.description +'",';
        metaData +=  '"symbol": "' + this.state.symbol + '",';
        metaData +=  '"image": "https://ipfs.io/ipfs/' + result.path + '", ';
        metaData +=  '"attributes": [ ... ]'
        metaData += '}';
    }
    console.log("Metadata: ", metaData)
    console.log("Submitting file to IPFS...")
    for await (var meta of ipfs.add(metaData, { pin: true }))
        {
          console.log('hash ', meta.path)
          console.log(signersAddress)
          console.log(this.state.name)
          console.log(this.state.symbol)
          const tokenURI = '"image": "https://ipfs.io/ipfs/' + meta.path + '"'
          const InterPlan721 = await factory.deploy(signersAddress, this.state.name, this.state.symbol, tokenURI);
          console.log("Contract deployed at:", InterPlan721.signersAddress);
          this.setState({
            address: InterPlan721.address
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
      name: null,
      description: null,
      symbol: null,
      file: null,
      address: null,
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>InterPlanetary Image</h1>

      <Button
      title="Home Page"
      onPress={() => this.props.navigation.navigate('Home')}
      />



      <form onSubmit={(event) => {
          event.preventDefault()
          const temp_name = this.name.value
          const temp_description = this.description.value
          const temp_symbol = this.symbol.value
          this.setState({
            name: temp_name,
            description: temp_description,
            symbol: temp_symbol,
          })
          this.uploadFile()
        }}>
          &nbsp;


          <input 
            type='file' 
            accept=".jpg, .png, .jpeg" 
            onChange={this.captureFile}
          />
          <div className="form-group mr-sm-2">
          <h1> </h1>

          <input 
            id= 'name'  
            type="text"
            className="form-control-sm"
            placeholder="Name of NFT"
            required
            ref={(input) => {this.name = input}}
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

          <input 
            id= 'symbol'    
            type="text"
            className="form-control-sm"
            placeholder="Symbol of NFT"
            required
            ref={(input) => {this.symbol = input}}
          />

          <div className="form-group mr-sm-2"></div>
          <input
          type='submit'
          className='btn btn-block btn-primary'
          value='MINT'
          />
          </div></form>

          <div>Contract Address: {this.state.address}</div>
      

      </View>
    )
  }
}
export default ImageViewer;