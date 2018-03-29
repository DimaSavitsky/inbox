const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

var dotenv = require('dotenv');
dotenv.load();

const provider = new HDWalletProvider(
  process.env.ACCOUNT_MNEMONIC,
  process.env.DEPLOY_ENDPOINT
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const accountUsed = accounts[0];
  console.log('Attempting to deploy from account', accountUsed);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accountUsed });
  console.log('Contract deployed to', result.options.address);
};

deploy();
