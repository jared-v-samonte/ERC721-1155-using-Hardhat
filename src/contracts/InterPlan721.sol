// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract InterPlan721 is ERC721URIStorage
{

   string private _tokenURI;

   constructor(address owner, string memory name, string memory symbol, string memory tokURI) ERC721(name, symbol) 
   {
      uint256 oneAndOnly = 1;
      _tokenURI = tokURI;
      _mint(owner, oneAndOnly);
      _setTokenURI(oneAndOnly, tokURI);
   }
}