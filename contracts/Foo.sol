pragma solidity ^0.4.22;

contract Foo {
    uint public value;
    address public seller;
    address public buyer;
    enum State {Created, Locked, Inactive}
    State public state;

    constructor() public payable {
        seller = msg.sender;
        value = msg.value / 2;
        require((2 * value) == msg.value, "Value has to be even.");
    }

    modifier condition(bool _condition) {
        require(_condition);
        _;
    }

    modifier inState(State _state) {
        require(state == _state, "Invalid state.");
        _;
    }

    function testMe() public inState(State.Created) condition(msg.value == (2 * value)) payable {
        buyer = msg.sender;
        state = State.Locked;
    }
}