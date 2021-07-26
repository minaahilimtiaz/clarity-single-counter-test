import { StacksMocknet } from '@stacks/network'
import {
  makeContractCall,
  broadcastTransaction
} from '@stacks/transactions';

const network = new StacksMocknet();

const deployerAddress = 'ST3EQ88S02BXXD0T5ZVT3KW947CRMQ1C6DMQY8H19';
const contractName = 'single-counter';
const privateKey = 'your private key';
const address = 'ST3EQ88S02BXXD0T5ZVT3KW947CRMQ1C6DMQY8H19';
console.log(`address ${address}`);

async function makeCall() {
  const txOptions = {
    contractAddress: deployerAddress,
    contractName: contractName,
    functionName: 'increment-counter',
    functionArgs: [],
    senderKey: privateKey,
    network,
  };

  const transaction = await makeContractCall(txOptions);
  console.log(transaction)
  const reply = await broadcastTransaction(transaction, network);
  console.log('transaction id of function call:',reply)
}

void (async () => {
  await makeCall();
})();