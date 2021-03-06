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
        //Create new wallet instance
        console.log("...creating new account & wallet");
        const web3 = new Web3(GETH_URL);
        let account = web3.eth.accounts.create(web3.utils.randomHex(32));
        let wallet = web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(web3.utils.randomHex(32));
        console.log("account: ", account.address);
        let balance = await web3.eth.getBalance(account.address);
        console.log("Balance: ", web3.utils.fromWei(balance.toString(), "ether"));

        //Create Tx Object
        let res = await rp(options);
        let movie = JSON.parse(res);
        let id = Math.floor(Math.random() * movie.actorList.length); 
        let name = movie.actorList[id].name;
        let url = movie.actorList[id].image;
        const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        console.log(`... creating TX object for "CreatePerson(${name})"`);
        let data = registry.methods.createPerson(name, url);
        let nonce = await web3.eth.getTransactionCount(account.address);
        const gas = web3.utils.toHex("30000000");
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from : account.address,
            to : REGISTRY_ADDRESS,
            nonce,
            data : data.encodeABI(),
            gasPrice,
            gas,
        }

        //Send TX
        console.log("...sending TX");
        const receipt = await web3.eth.sendTransaction(tx);
        console.log("Receipt:\n", receipt);
            
        } catch(e) {
            console.log("createPerson.send() failed:\n", e);
        }    
}


main();

