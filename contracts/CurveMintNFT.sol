//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;

import "hardhat/console.sol";
import './NFTMinter.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/introspection/ERC165.sol';

contract CurveMintNFT is ERC165, NFTMinter {

    uint256 public currentPrice;
    uint256 public startingAt = 0.01 ether;
    uint16 public constant numerator = 1337;
    uint16 public constant denominator = 1000;


    //mapping(uint256 => uint256) public price;
    mapping(address => uint256) public balances;

    event Buy(address indexed buyer,uint256 price);
    event Sell(address indexed buyer, uint256 price);

    constructor() public {
        _registerInterface(IERC721Receiver.onERC721Received.selector);
    }

    fallback() external {
        buy('test');
    }

    function nextPrice() public view returns (uint256) {
        if (currentPrice == 0) return startingAt;
        return (uint256(currentPrice * numerator) / denominator);
    }

    function prevPrice() public view returns (uint256) {
        if (currentPrice <= startingAt) return startingAt;
        return (uint256(currentPrice * denominator) / numerator);
    }

    function buy(string memory tokenURI) public payable {
        currentPrice = nextPrice();
        require(msg.value == currentPrice, "WRONG AMOUNT SORRY");
        balances[msg.sender]++;
        NFTMinter.mintItem(msg.sender, tokenURI);
        emit Buy(msg.sender, currentPrice);
    }

    function sell(uint256 id) public payable {
        uint256 salePrice = currentPrice;
        currentPrice = prevPrice(); 
        if (currentPrice <= startingAt) currentPrice = startingAt;
        require(balances[msg.sender] > 0, "NONE TO SELL");
        balances[msg.sender]--;
        msg.sender.transfer(salePrice);
        NFTMinter.burn(id);
        emit Sell(msg.sender, salePrice);
    }

    function onERC721Received(address, address, uint256, bytes memory) public pure virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }
}