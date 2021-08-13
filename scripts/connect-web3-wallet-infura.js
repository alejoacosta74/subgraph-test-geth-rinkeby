const Web3 = require('web3');
require('dotenv').config();
const Wallet = require('ethereumjs-wallet');
const fs = require('fs');
const homedir = require('os').homedir();
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
const utcFile = homedir.concat('/.ethereum/rinkeby/keystore/UTC--2021-06-07T23-53-17.245981261Z--3633aaa1151d44729272acce363c66f5da51e16a');

let main = async () => {
    const password = process.env.PASSWORD;
    //Read private key and address
    console.log("... Reading private key and address from keystore");
    myWallet =  await Wallet.default.fromV3(fs.readFileSync(utcFile).toString(), password, true);
    const KEY_HEX = myWallet.getPrivateKey().toString('hex');    
    const ADDRESS_HEX = myWallet.getAddress().toString('hex');
    console.log("Address: ", ADDRESS_HEX);

    const web3 = new Web3(process.env.INFURA_HTTP);
    console.log("... Importing private key and address to web3 wallet");
    let account = web3.eth.accounts.wallet.add({
        privateKey: ('0x'+ KEY_HEX),
        address: ('0x'+ADDRESS_HEX) 
    })
    console.log("Account: ", account);

    console.log("...reading account balance for: ", account.address)
    let balance = await web3.eth.getBalance(account.address);
    console.log("balance: ", web3.utils.fromWei(balance, 'ether'));
    console.log("...reading network specs")
    let networkType = await web3.eth.net.getNetworkType();
    let networkId = await web3.eth.net.getId();
    console.log(`Network Type: ${networkType}, networkId: ${networkId}\n`)
}

main()