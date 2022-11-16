const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

// using web3 to get unlocked accounts from ganache
let accounts;
let inbox;

beforeEach(async () => {
  //get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those account to deploy the contract
  // tells web3 about what methods an inbox crontract has
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    // tells web3 that we want to deploy a new copy of this contract
    .deploy({
      data: bytecode,
      arguments: ["Hi there"],
    })
    //instructs web3 to send out a transtaction that creates this contract
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    //making sure address is givens
    assert.ok(inbox.options.address);
    console.log(inbox);
  });
  // call a methods to verify if the initial message
  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});

//  list of all accounts
//   "0xdA4c8A0dBb33DdFC29535a6A5aa735EEd535235d",
//   "0xfEC25BE44C5A69c06e7aFf9CEB229aEf6F28951A",
//   "0x9730eCfb6AB3094D6179747bB3AE2809E6CB4eA7",
//   "0x5fd0eC7095f5CE17FDcc02dA8ab1b51cbaccb848",
//   "0xA7653d2Bfe38060908A9f887f2954210810dB5C1",
//   "0x40b212a4A69C4170CfDF926AF73b61A5cD0E66cd",
//   "0x3D3f673FcC5cD883D7032268263Bc25F45476d91",
//   "0x4F3275393dbACe05dDfd427dA91a676863345Efc",
//   "0xc3b66618F919A51A5746f72A024533D607b6DfA4",
//   "0xbb232d90d3DDa5956e86c2A8A72FE9DECf944b6e";

// test with mocha
// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
