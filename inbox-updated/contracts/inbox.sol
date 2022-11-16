//specifies the version
// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.9;

// defines a new contract (class) that will have some number of methods and variables
contract Inbox {

// declares all of the instance variables (and their types) that will exist in this contract
    string public message;
// defines different functions that will be members of this contract
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

   function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    // function getMessage() public view returns (string) {
    //     return message;
    // }
}