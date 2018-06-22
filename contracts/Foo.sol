pragma solidity ^0.4.22;

contract Foo {
    uint8 public aValue = 123;

    constructor() public payable {
    }

    function setAValue(uint8 newValue) public {
        aValue = newValue;
    }

}