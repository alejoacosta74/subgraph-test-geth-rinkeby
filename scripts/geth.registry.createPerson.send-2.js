const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
const REGISTRY_ADDRESS='0xe072208C66B37F4f00fABded75CaFd5F88Fd43dC';
var rp = require('request-promise');
require('dotenv').config();
const GETH_URL = (process.env.GETH_HOST || "http://127.0.0.1:3000");

var options = {
    method: 'GET',
    url: 'https://imdb-api1.p.rapidapi.com/Title/k_5dl7qdss/tt4154796', // Query imdb for "The avengers"
    headers: {
        'x-rapidapi-key': 'f27033c285msh5fee6331060b2a1p1aaf88jsna6e56b3d50c6'
    }
};

// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    try {

        //load private key and address
        const KEY_HEX = process.env.PRIVATE_KEY;
        const ADDRESS_HEX =process.env.ADDRESS; 
        // console.log("Private Key:", KEY_HEX);
        // console.log("Address: ", ADDRESS_HEX);

        //Connect to blockchain and get account data
        const web3 = new Web3(GETH_URL);
        console.log("...Reading account data from Geth node at: ", GETH_URL);
        console.log("Accounts: ", ADDRESS_HEX);
        let balance = await web3.eth.getBalance(ADDRESS_HEX);
        console.log("Balance: ", web3.utils.fromWei(balance.toString(), "ether"));
        const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        let old_name = await registry.methods.getPerson(ADDRESS_HEX).call({from: ADDRESS_HEX});
        console.log("Current Name: ", old_name[0]);

        //Create Tx Object
        let res = await rp(options);
        let movie = JSON.parse(res);
        let id = Math.floor(Math.random() * movie.actorList.length); 
        let name = movie.actorList[id].name;
        let url = movie.actorList[id].image;

        console.log(`... creating TX object for "CreatePerson(${name})"`);
        let data = registry.methods.createPerson(name, url);
        let nonce = await web3.eth.getTransactionCount(ADDRESS_HEX);
        const gas = web3.utils.toHex("10000000")
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from : ADDRESS_HEX,
            to : REGISTRY_ADDRESS,
            nonce,
            data : data.encodeABI(),
            gasPrice,
            gas,
        }

        console.log("...signing Tx");
        let signedTx = await web3.eth.accounts.signTransaction(tx, KEY_HEX);
        //console.log("signedTx: \n", signedTx);
        console.log("...sending Tx");
        let result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("...Tx receipt:\n", result);
        console.log("\n\n... reading new name for address: ", ADDRESS_HEX);
        let new_name = await registry.methods.getPerson(ADDRESS_HEX).call({from: ADDRESS_HEX});
        console.log("New Name: ", new_name[0]);
            
        } catch(e) {
            console.log("createPerson.send() failed:\n", e);
        }    
}


main();

