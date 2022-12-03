// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


/**
 * @title Tribunal Creator 
 * @author Xavier-Charles
 * @dev Create a tribunal contract 
 */


contract Tribunal is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping (address => uint) pendingWithdrawals;


    string tribURI;
    uint256 mintFee;

    constructor (string memory name, string memory _tribURI, uint256 _mintFee, address _owner) ERC721(name, "TRIBC") {
       transferOwnership(_owner);
       tribURI = _tribURI;
       mintFee = _mintFee;
    }

    function _baseURI() internal view override returns (string memory) {
        return tribURI;
    }

    function mintTribNFT (address recipient)
        public virtual payable 
    {
        require(msg.value >= mintFee, "msg.value less than mintFee; check price!"); 
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(recipient, tokenId);
    }

    function withdraw() public onlyOwner {
      uint amount = pendingWithdrawals[msg.sender];
      pendingWithdrawals[msg.sender] = 0;
      payable(msg.sender).transfer(amount);
    }

}

contract TribunalFactory is Ownable {
    address[] tribunals;
    mapping (address => uint) pendingWithdrawals;
    event childContract(address newContract);

    Tribunal public child;


    constructor() {}

    function createTribunal (string memory name, string memory tribURI, uint256 mintFee, address tribunalOwner) public  {
        Tribunal newContract = new Tribunal(name, tribURI, (mintFee * 8 / 10) / 1e18, tribunalOwner);
        tribunals.push(address(newContract));
        emit childContract(address(newContract));
    } 

    function mintTribNFT(Tribunal _contract, address recipient) public payable {
        _contract.mintTribNFT(recipient);
    } 

    function withdraw() public onlyOwner {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

}
