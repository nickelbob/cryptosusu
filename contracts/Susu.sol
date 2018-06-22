pragma solidity ^0.4.22;

contract Susu {
    address public recipient;
    uint public howMuch;

    constructor() public payable {
    }

    function setHowMuch(uint _howMuch) public {
        howMuch = _howMuch;
    }

    function setRecipientAsMe() public {
        recipient = msg.sender;
    }

    function setRecipient(address _recipient) public {
        recipient = _recipient;
    }
}