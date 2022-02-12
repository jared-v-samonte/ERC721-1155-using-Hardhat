// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract InterPlan721 is ERC721URIStorage
{

   uint256 oneAndOnly = 1;

   constructor(address owner, string memory name, string memory symbol, string memory URI) ERC721(name, symbol) 
   {
      tokenURI = URI;
      _mint(owner, oneAndOnly);
      _setTokenURI(oneAndOnly, URI);
   }

   function _baseURI() public view virtual returns (string memory)
   {
      string memory URIString = tokenURI.toSlice().concat(Strings.toString(oneAndOnly).toSlice());
      return URIString;
   }

   function _tokenURI() public view virtual returns (string memory)
   {
      return tokenURI;
   }
   
}