pragma solidity ^0.4.22;

contract Susu {
    address[3] public orderedRecipients;
    address public lastRecipient;
    mapping(address => uint) public currentRoundBalances;
    uint8 public susuAmount = 1;

    constructor() public payable {
        orderedRecipients[0] = 0x8B05E5243e34C02D92673C95E32AA25Ff443734A;
        orderedRecipients[1] = 0x62DFc3c870BD76708bB72b4E66682881a3812C63;
        orderedRecipients[2] = 0xf38952b9032710c6C0e901db7108ed3983e016d1;

        lastRecipient = 0xf38952b9032710c6C0e901db7108ed3983e016d1;
    }

    function PaySusu() public payable {
        //Did they pay the correct amount?
        require(msg.value == susuAmount);
        //Are they among the people who can use this contract?
        require(isRecipient(msg.sender));

        TrackPayment();

        if(EveryonePaid()) {
            ResetBalances();
            PayOut();
            IterateLastRecipient();
        }
    }

    function IterateLastRecipient() private {
        for (uint i = 0; i < orderedRecipients.length ; i++)
        {
            if(orderedRecipients[i] == lastRecipient) {
                if(i < orderedRecipients.length - 1) {
                    lastRecipient = orderedRecipients[i+1];
                    return;
                }

                lastRecipient = orderedRecipients[0];
            }
        }
    }

    function PayOut() private {
        lastRecipient.transfer(3 * susuAmount);
    }

    function ResetBalances() private {
        for (uint i = 0; i < orderedRecipients.length ; i++)
        {
            currentRoundBalances[orderedRecipients[i]] = 0;    
        }
    }

    function EveryonePaid() private view returns (bool) {
        for (uint i = 0; i < orderedRecipients.length ; i++)
        {
            if(currentRoundBalances[orderedRecipients[i]] != susuAmount)
                return false;
        }
        return true;
    }

    function TrackPayment() private {
        require(currentRoundBalances[msg.sender] == 0);
        currentRoundBalances[msg.sender] = msg.value;
    }

    function isRecipient(address addr) private view returns (bool) {
        for (uint i = 0; i < orderedRecipients.length ; i++)
        {
            if(orderedRecipients[i] == addr)
                return true;
        }
        return false;
    }
}