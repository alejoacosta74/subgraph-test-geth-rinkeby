const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const Wallet = require('ethereumjs-wallet');
const fs = require('fs');
const homedir = require('os').homedir();
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
const utcFile = homedir.concat('/.ethereum/rinkeby/keystore/UTC--2021-06-07T23-53-17.245981261Z--3633aaa1151d44729272acce363c66f5da51e16a');
const GETH_URL = "http://127.0.0.1:3000";
// Run: $geth --rinkeby --syncmode "light" --http --http.addr 0.0.0.0 --http.port 3000 --http.rpcprefix / --http.corsdomain "*"

// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    const password = process.env.PASSWORD;
    //Read private key and address
    console.log("... Reading private key and address from keystore");
    myWallet =  await Wallet.default.fromV3(fs.readFileSync(utcFile).toString(), password, true);
    const KEY_HEX = myWallet.getPrivateKey().toString('hex');    
    const ADDRESS_HEX = myWallet.getAddress().toString('hex');
    console.log("Private Key:", KEY_HEX);
    console.log("Address: ", ADDRESS_HEX);

    //Connect to web3 and check accounts
    const web3 = new Web3(GETH_URL);
    console.log("...Reading accounts from Geth node at: ", GETH_URL);
    let accounts = await web3.eth.getAccounts();
    console.log("Accounts: \n", accounts);

    //create Tx Object

    const data = REGISTRY.bytecode;
    const gas = web3.utils.toHex(100000);
    const gasPrice = web3.utils.toHex
    const from = "0x" + ADDRESS_HEX;
}


main();

