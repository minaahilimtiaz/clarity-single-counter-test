import { StacksMocknet } from '@stacks/network'
import {
  makeContractCall,
  callReadOnlyFunction,
  broadcastTransaction,
  cvToJSON
} from '@stacks/transactions';

const network = new StacksMocknet();

const deployerAddress = 'ST3EQ88S02BXXD0T5ZVT3KW947CRMQ1C6DMQY8H19';
const contractName = 'single-counter';
const privateKey = 'your private key';
const address = 'ST3EQ88S02BXXD0T5ZVT3KW947CRMQ1C6DMQY8H19';
console.log(`address ${address}`);

const basicOptions = {
  contractAddress: deployerAddress,
  contractName: contractName,
  senderKey: privateKey,
  network,
}

const txOptions = {
  ...basicOptions,
  functionName: 'increment-counter',
  functionArgs: [],
};

const readOnlyOptions = {
  ...basicOptions,
  functionName: 'get-counter',
  functionArgs: [],
  senderAddress: deployerAddress
};


async function testCounter() {
  const result = await callReadOnlyFunction(readOnlyOptions);
  console.log('counter current value', cvToJSON(result))
  const transaction = await makeContractCall(txOptions);
  console.log(transaction)
  const functionCallTransaction= await broadcastTransaction(transaction, network);
  console.log('transaction id of function call:', functionCallTransaction)
}

void (async () => {
  await testCounter();
})();