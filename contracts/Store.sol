pragma solidity ^0.4.22;

contract SimpleStorage {
    address public recipient;
    uint public howMuch;

    function setHowMuch(uint _howMuch) public {
        howMuch = _howMuch;
    }

    function setRecipientAsMe() public {
        recipient = msg.sender;
    }

    function setRecipient(address _recipient) public {
        recipient = _recipient;
    }

    function giveMoolah() public payable {
        recipient.transfer(howMuch);
    }

}
