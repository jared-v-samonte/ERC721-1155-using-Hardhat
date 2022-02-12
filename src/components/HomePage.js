import React, { Component } from 'react';
import {Button, View} from 'react-native'; 



class HomePage extends Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>InterPlanetary 721s</h1>
      
      <Button
      title="Change to Images"
      onPress={() => this.props.navigation.navigate('Image')}
      />


      <div >Currently functioning in the Goerli test network. </div>

      <div class="container">
      <p>
        Uses :
        * Hardhat instead of Truffle
        * Ether.js instead of Web3.js
        * OpenZeppelin
        * OpenSea API
        * Goerli
      </p>
      </div>
      <a href="https://www.linkedin.com/in/jared-samonte-9b9192157/">LinkedIn Account</a>
      <a href="https://github.com/jared-v-samonte/ERC721-with-Hardhat">GitHub Repository</a>


      </View>
      
    )
  }
}
export default HomePage;