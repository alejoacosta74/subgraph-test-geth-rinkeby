const Web3 = require('web3');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
const REGISTRY_ADDRESS='0xe072208C66B37F4f00fABded75CaFd5F88Fd43dC';
require('dotenv').config();
const GETH_URL = (process.env.GETH_HOST || "http://127.0.0.1:3000");


// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    try {
        //load private key and address
        const KEY_HEX = process.env.PRIVATE_KEY;
        const ADDRESS_HEX =process.env.ADDRESS; 
        //Create new wallet instance
        console.log("...connecting to ethereum and retrieving acocunt info");
        //const web3 = new Web3(GETH_URL);
        const web3 = new Web3(process.env.INFURA_HTTP)
        let account = web3.eth.accounts.create(web3.utils.randomHex(32));
        let wallet = web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(web3.utils.randomHex(32));
        console.log("account: ", account.address);
        let balance = await web3.eth.getBalance(account.address);
        console.log("Balance: ", web3.utils.fromWei(balance.toString(), "ether"));

        const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        console.log(`... calling getPerson(${ADDRESS_HEX})`);
        let result = await registry.methods.getPerson(ADDRESS_HEX).call({from: account.address});
        console.log("... result received: ", result);

        } catch(e) {
            console.log("getPerson failed:\n", e);
        }    
}


main();

