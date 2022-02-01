//import NFT from '../artifacts/src/contracts/InterPlan721.sol/InterPlan721.json'
import React, { Component } from 'react';
import {Button, View} from 'react-native';
const { ethers } = require("ethers");

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0'}) 



class ImageViewer extends Component {

    /*
  async componentWillMount() {
    await this.loadEthers()
    await this.loadBlockchainData()
  }

  async loadEthers() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    const contractSigner = contract.connect(signer);

    const [owner] = await ethers.getSigners();

    const InterPlan721 = await ethers.getContractFactory("InterPlan721");

    // You can also use an ENS name for the contract address
    const contractAddress = "0x7d4e3eb10F681C4b309FC4A9a11aE9D2a1d143dc";//dai.tokens.ethers.eth";

    const daiAbi = [
      // Some details about the token
      "function getTokenId(string memory input) public view returns(uint256)",
      "function grantItem(address owner, string memory tokenURI) public",
    ];

    // The Contract object
    const contract = new ethers.Contract(contractAddress, daiAbi, provider);

    // A filter for when a specific address receives tokens

    // Send 1 DAI to "ricmoo.firefly.eth"
    const tx = contractSigner.grantItem(owner.address, "https://giphy.com/gifs/rick-astley-Ju7l5y9osyymQ");

    filter = contract.filters.Transfer(null, myAddress)
    contract.on("Transfer", (from, to, amount, event) => {

      console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
  });

  }
  */

  async uploadFile () {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const [owner] = await ethers.getSigners();
    //const InterPlan721 = await ethers.getContractFactory("InterPlan721");
    const contractAddress = "0x7d4e3eb10F681C4b309FC4A9a11aE9D2a1d143dc";//dai.tokens.ethers.eth";
    const daiAbi = [
      // Some details about the token
      "function getTokenId(string memory input) public view returns(uint256)",
      "function grantItem(address owner, string memory tokenURI) public",
    ];
    const contract = new ethers.Contract(contractAddress, daiAbi, provider);
    const contractSigner = contract.connect(signer);
    
    console.log("Submitting file to IPFS...")
    ipfs.add(this.state.file, { pin: true }).then(result => {
      console.log('hash ', result.path)
      contractSigner.grantItem(owner.address, "https://ipfs.io/ipfs/${result.path}")
      .once('receipt', (receipt) => {
        this.setState({
          ipfsHash: result.path,
          files: [...this.state.files, result.path]
        })
    }) //const tx = 
    })
  }

  captureFile = event => 
  {
    console.log('capturing ', this.state.file)
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
      ipfsHash: '',
      file: null,
      contract: null,      
      files: [],
      title: null,
      loading: false
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

      <h3>"something"</h3>


      <form onSubmit={(event) => {
          event.preventDefault()
          const tempTitle = this.fileTitle.value
          this.uploadFile(tempTitle)
          this.setState({title: tempTitle})
        }}>
          &nbsp;


          <input 
            type='file' 
            accept=".jpg, .png, .jpeg" 
            onChange={this.captureFile}
          />
          <div className="form-group mr-sm-2">
          <h1> </h1>

          </div>
          <input
          type='submit'
          className='btn btn-block btn-primary'
          value='MINT'
          />
      </form>
      
      <div className="row text-center">
      { 
        this.state.files.map((file, key) => {
        return(
          <div key={key} className="col-md-6 pt-2 "> 
          <img 
            src={file}
            alt="NULL"
            width="480"
            heigth= "480"
          />
          <div>Token URI: {file}</div>
          </div>
        )})
      }
      </div> 
      </View>
    )
  }
}
export default ImageViewer;