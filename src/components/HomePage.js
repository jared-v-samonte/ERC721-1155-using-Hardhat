import React, { Component } from 'react';
import {Button, View} from 'react-native'; 



class HomePage extends Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>InterPlanetary NFTs</h1>
      
      <Button
      title="Change to Images"
      onPress={() => this.props.navigation.navigate('Image')}
      />
      <h3></h3>


      <div >Currently functioning in the Goerli test network. </div>
      <h3></h3>

      <div class="container">
      <p>The smart contract does not allow for duplicate hashes, so hashes can only be used once. This is a demonstration of Jared V. Samonte's capabilities in developing in Ethereum, IPFS, Web3.js, the Hardhat framework, OpenZeppelin ERC721 library, and Goerli test network.</p>
      </div>
      <a href="https://www.linkedin.com/in/jared-samonte-9b9192157/">LinkedIn Account</a>
      <a href="https://github.com/jared-v-samonte/ERC721-with-Hardhat">GitHub Repository</a>


      </View>
      
    )
  }
}
export default HomePage;