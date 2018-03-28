pragma solidity ^0.4.17;

contract Inbox {
    string private message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMesssage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
