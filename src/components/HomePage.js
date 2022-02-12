import React, { Component } from 'react';
import {Button, View} from 'react-native'; 



class HomePage extends Component {

  

  render() {
    return (
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
      <h1>InterPlanetary 721s</h1>
      
      <div class="marginButton">
      <Button
      title="Change to Images"
      onPress={() => this.props.navigation.navigate('Image')}
      />
      </div>

      
      <div class="container" >
      <div class="marginTitle"> This website uses the following (works only on in the Goerli testnetwork for the moment):</div>
        <ul>
          <li>Hardhat instead of Truffle</li>
          <li>Ether.js instead of Web3.js</li>
          <li>IPFS (Inter Planetary File System)</li>
          <li>ERC721 contracts</li>
          <li>OpenZeppelin</li>
          <li>OpenSea API</li>
        </ul>
      </div>
      <div class="container" >
      <div class="marginTitle"> Imporant Links:</div>

        <ul>
          <li><a href="https://www.linkedin.com/in/jared-samonte-9b9192157/">LinkedIn Account</a></li>
          <li><a href="https://github.com/jared-v-samonte/InterPlan721">GitHub Repository</a></li>
        </ul>
      </div>

      </View>
      
    )
  }
}
export default HomePage;