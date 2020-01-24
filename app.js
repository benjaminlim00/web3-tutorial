var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3(
  'https://mainnet.infura.io/v3/6fba48276c644286aab3d5b7e3a1c3d9',
);

const acc2 = web3.eth.accounts.create();
const acc1add = '0x3DAF713B8e225F81D95d36910Db36586B119dB8D';
const acc2add = acc2.address;

const pK = Buffer.from(process.env.PRIVATE_KEY, 'hex');

web3.eth.getTransactionCount(acc1add, (err, txCount) => {
  //Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: acc2add,
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  };

  //sign the txn
  const tx = new Tx(txObject);
  tx.sign(pK);

  const serializedTxn = tx.serialize();
  const raw = '0x' + serializedTxn.toString('hex');

  //broadcast the transaction
  web3.eth
    .sendSignedTransaction(raw, (err, txHash) => {
      console.log('txHash', txHash);
    })
    .catch(err => {
      console.log(err);
    });
});
