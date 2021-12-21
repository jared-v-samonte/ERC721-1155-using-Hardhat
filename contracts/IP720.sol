// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IP720 is ERC721URIStorage {


   mapping(string => bool) _hashExists;
   mapping(string => uint) _idToHash;

   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("Inter Planetary 720", "IP720") {}

   function getTokenId(string memory input) public view returns(uint256)
   {
      return  _idToHash[input];
   }

   function grantItem(address owner, string memory tokenURI) public 
   {
      _tokenIds.increment();

      //make sures there is not an Identical file
      require(!_hashExists[tokenURI]);

      // assign current increment to newItemId
      uint256 newItemId = _tokenIds.current();

      
      _mint(owner, newItemId);
      _setTokenURI(newItemId, tokenURI);

       _idToHash[tokenURI] = newItemId;
      _hashExists[tokenURI] = true;
   }
}