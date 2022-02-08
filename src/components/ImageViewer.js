//import NFT from '../artifacts/src/contracts/InterPlan721.sol/InterPlan721.json'
import React, { Component } from 'react';
import {Button, View} from 'react-native';
import {ContractFactory, providers} from 'ethers';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 



class ImageViewer extends Component {


  async uploadFile () {

    const provider = new providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner()

    var contract = {};
    fetch('./InterPlan721.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      // do something with data
      console.log(data)
      contract = data
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
    if (contract != null && contract.length < 1)
    {
      const factory = new ContractFactory(contract.abi, contract.bytecode, signer)
      
      console.log("Submitting file to IPFS...")
      for await (var result of ipfs.add(this.state.file, { pin: true }))
      {
        console.log('hash ', result.path)
        var metaData = '{ ';
        metaData +=  '"name": "' + this.state.name + '",';
        metaData +=  '"description": ' + this.state.description +'",';
        metaData +=  '"symbol": "' + this.state.symbol + '",';
        metaData +=  '"image": "https://ipfs.io/ipfs/' + result.path + '", ';
        metaData +=  '"attributes": [ ... ]'
        metaData += '}';
        console.log("Submitting file to IPFS...")
        for await (var meta of ipfs.add(metaData, { pin: true }))
        {
          console.log('hash ', meta.path)
          const InterPlan721 = await factory.deploy(provider.address, this.state.name, this.state.symbol, this.state.description, meta);
          console.log("Contract deployed at:", InterPlan721.address);
          this.setState({
            address: InterPlan721.address
          })
        }
      }
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
            type="text"
            className="form-control-sm"
            placeholder="Name of NFT"
            required
            ref={(input) => {this.name = input}}
          />


          <div className="form-group mr-sm-2"></div>
          <input    
            type="text"
            className="form-control-sm"
            placeholder="Description of NFT"
            required
            ref={(input) => {this.description = input}}
          />

          <input     
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