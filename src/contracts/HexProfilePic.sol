// SPDX-License-Identifier: The MIT Licence.
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HexProfilePic is ERC721URIStorage
{
    address private collector = 0x72eF01d29b300460e44537e24b3eC535889E08D6;
    uint256 private five_percent_fee = msg.value / 2000;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("Hex Profile Pic", "HXP")  { }

    function mintHexProfilePic(address owner, string memory tokenURI) public payable {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        (bool sent, bytes memory data) = collector.call{value: five_percent_fee}("");
        require(sent, "Failed to send Ether");
    }
}