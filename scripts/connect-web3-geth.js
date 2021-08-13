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
    console.log("...connecting to geth node");
    const web3 = new Web3(GETH_URL);
    let address, accounts;
    accounts = await web3.eth.getAccounts();
    if (accounts.length == 0) {
        const password = process.env.PASSWORD;
        //Read private key and address
        console.log("... Reading private key and address from keystore file");
        myWallet =  await Wallet.default.fromV3(fs.readFileSync(utcFile).toString(), password, true);
        const KEY_HEX = myWallet.getPrivateKey().toString('hex');    
        const ADDRESS_HEX = myWallet.getAddress().toString('hex');
        console.log("Address: ", ADDRESS_HEX);

        console.log("... Importing private key to node keystore and getting address");
        address = await web3.eth.personal.importRawKey(KEY_HEX, 'primera1');
        console.log("address: ", address);

    } else {
        address = accounts[0];
    } 
    console.log("...reading account balance for: ", address)
    let balance = await web3.eth.getBalance(address);
    console.log("balance: ", web3.utils.fromWei(balance, 'ether'));
    console.log("...reading network specs")
    let networkType = await web3.eth.net.getNetworkType();
    let networkId = await web3.eth.net.getId();
    console.log(`Network Type: ${networkType}, networkId: ${networkId}\n`)
    //let block = await web3.eth.getBlock("latest");
    //console.log("... latest block: ", block);
}

main()