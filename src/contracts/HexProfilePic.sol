// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HexProfilePic is ERC721URIStorage
{
    
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() public ERC721("Hex Profile Pic", "HXP")  { }

   function mintHexProfilePic(address owner, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}