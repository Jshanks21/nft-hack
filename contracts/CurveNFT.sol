//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.7.0;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CurveNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 constant startingAt = 0.01 ether;
    uint16 constant numerator = 1337;
    uint16 constant denominator = 1000;

    mapping(uint256 => uint256) public price;
    mapping(bytes32 => uint256) public uriToTokenId;
    mapping(uint256 => mapping(address => uint256)) public balances;

    event Buy(address indexed buyer, uint256 indexed id, uint256 price /*, bytes data*/);
    event Sell(address indexed buyer, uint256 indexed id, uint256 price);

    constructor() public ERC721("Curve NFT", "CNFT") {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function mintItem(address to, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        bytes32 uriHash = keccak256(abi.encodePacked(tokenURI));
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(to, id);
        _setTokenURI(id, tokenURI);

		uriToTokenId[uriHash] = id;

        return id;
    }

    function nextPrice(
        uint256 id
    ) public view returns (uint256) {
        if (price[id] == 0) return startingAt;
        return (uint256(price[id] * numerator) / denominator);
    }

    function prevPrice(
        uint256 id
    ) public view returns (uint256) {
        if (price[id] <= startingAt) return startingAt;
        return (uint256(price[id] * denominator) / numerator);
    }

    function buy(
        uint256 id
		/*, bytes memory data*/
    ) public payable {
        price[id] = nextPrice(id);
        require(msg.value == price[id], "WRONG AMOUNT SORRY");
        balances[id][msg.sender]++;
        safeTransferFrom(address(this), msg.sender, id);
        emit Buy(
            msg.sender,
            id,
            price[id] 
			/*, data*/
        );
    }

    function sell(
        uint256 id
    ) public payable {
        uint256 salePrice = price[id];
        price[id] = prevPrice(id);
        if (price[id] <= startingAt) price[id] = startingAt;
        require(balances[id][msg.sender] > 0, "NONE TO SELL");
        balances[id][msg.sender]--;
        msg.sender.transfer(salePrice);
        safeTransferFrom(msg.sender, address(this), id);
        emit Sell(msg.sender, id, salePrice);
    }
}
