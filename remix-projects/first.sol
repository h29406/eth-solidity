 //specifies the version
pragma solidity ^0.4.17;

// defines a new contract (class) that will have some number of methods and variables
contract Inbox {

// declares all of the instance variables (and their types) that will exist in this contract
    string public message;  

// defines different functions that will be members of this contract
    function Inbox(string initialMessage) public {          
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    // function getMessage() public view returns (string) {
    //     return message;
    // }
}
