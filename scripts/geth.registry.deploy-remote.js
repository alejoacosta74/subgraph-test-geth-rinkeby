const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
require('dotenv').config();
const GETH_URL = (process.env.GETH_HOST || "http://127.0.0.1:3000");

// Run: $geth --rinkeby --syncmode "light" --http --http.addr 0.0.0.0 --http.port 3000 --http.rpcprefix / --http.corsdomain "*"

// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    try {
        //load private key and address
        const KEY_HEX = process.env.PRIVATE_KEY;
        const ADDRESS_HEX =process.env.ADDRESS; 
        console.log("Private Key:", KEY_HEX);
        console.log("Address: ", ADDRESS_HEX);

        //Connect to web3 and get account data
        const web3 = new Web3(GETH_URL);
        console.log("...Reading account data from Geth node at: ", GETH_URL);
        let accounts = await web3.eth.getAccounts();
        console.log("Accounts: \n", accounts);
        let balance = await web3.eth.getBalance(accounts[0]);
        console.log("Balance: ", web3.utils.fromWei(balance.toString(), "ether"));
        let nonce = await web3.eth.getTransactionCount(accounts[0]);
        console.log("Nonce: ", nonce);


        //create Tx Object
        console.log("...Creating TX object:");

        const data = REGISTRY.bytecode;
        const gas = web3.utils.toHex("10000000");
        //const gasPrice = web3.utils.toHex(web3.utils.toWei('10', 'gwei'));
        //const gas = "20e9";
        const gasPrice = await web3.eth.getGasPrice();
        const from = ADDRESS_HEX;
        const tx = {
            nonce,
            data,
            gasPrice,
            gas,
        }
        //console.log(JSON.stringify(tx));

        console.log("...signing Tx");
        let signedTx = await web3.eth.accounts.signTransaction(tx, KEY_HEX);
        //console.log("signedTx: \n", signedTx);
        console.log("...sending Tx");
        let result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("...Tx receipt:\n", result);

    } catch (e) {
        console.log("Script failed with error:\n", e);
    }

}


main();

