// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IpfsNft is ERC721URIStorage {


   mapping(string => bool) _hashExists;
   mapping(string => uint) _idToHash;

   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("IpfsNft", "IPFSNFT") {}

   function getTokenId(string memory input) public view returns(uint256)
   {
      return  _idToHash[input];
   }

   function awardItem(address owner, string memory tokenURI) public 
    {
      _tokenIds.increment();
      require(!_hashExists[tokenURI]);
      _idToHash[tokenURI] = _tokenIds.current();
      uint256 newItemId = _tokenIds.current();
      _mint(owner, newItemId);
      _setTokenURI(newItemId, tokenURI);
      _hashExists[tokenURI] = true;
    }
}