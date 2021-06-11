const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
const REGISTRY_ADDRESS='0xe072208C66B37F4f00fABded75CaFd5F88Fd43dC';
require('dotenv').config();
const GETH_URL = (process.env.GETH_HOST || "http://127.0.0.1:3000");


// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    try {
        const web3 = new Web3(GETH_URL);
        let account = web3.eth.accounts.create(web3.utils.randomHex(32));
        let wallet = web3.eth.accounts.wallet.add(account);
        let keystore = wallet.encrypt(web3.utils.randomHex(32));
        console.log({
        account: account,
        wallet: wallet,
        keystore: keystore
        });
        // console.log("...Reading account data from Geth node at: ", GETH_URL);
        // let accounts = await web3.eth.getAccounts();
        // const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        // console.log(`calling method createPerson with name: ${name} from account #${idx}: `, accounts[idx]);
        // let receipt = await registry.methods.createPerson(name, "dummy url").send({from : accounts[idx], gas: 300000});
        // console.log("Send receipt: \n", receipt);

    
        } catch(e) {
            console.log("createPerson.send() failed:\n", e);
        }    
}


main();

