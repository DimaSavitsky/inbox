const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

let initialMessage = 'Initial test message'

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the tested contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  // it('runs tests', () => {
  //   assert.equal(true, true);
  // });

  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.getMessage().call();
    assert.equal(message, initialMessage);
  });

  it('can change a message', async () => {
    const newMessage = 'Hello';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0], gas: '1000000' });
    const resultMessage = await inbox.methods.getMessage().call();
    assert.equal(resultMessage, newMessage);
  });
});
