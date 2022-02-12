// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract InterPlan721 is ERC721URIStorage
{
   string private _tokenURI;
   uint256 oneAndOnly = 1;

   constructor(address owner, string memory name, string memory symbol, string memory inputURI) ERC721(name, symbol) 
   {
      _tokenURI = inputURI;
      _mint(owner, oneAndOnly);
      _setTokenURI(oneAndOnly, inputURI);
   }

   function tokenURI(uint256 tokenId)  public view virtual override returns (string memory)
   {
         return _tokenURI;
   }
}