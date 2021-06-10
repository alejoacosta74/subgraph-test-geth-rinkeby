const Web3 = require('web3');

async function main(){
    try {
        const web3 = new Web3('http://qtum:testpasswd@localhost:23889');
        let accounts = await web3.eth.getAccounts();
        console.log("accounts:\n", accounts);
        for (let index = 0; index < accounts.length; index++) {
            let balance = await web3.eth.getBalance(accounts[index]);
            console.log(`Balance for address ${accounts[index]}: `, balance);            
        }
        const latestBlockNumber = await web3.eth.getBlockNumber();
        console.log(`Latest block number: `, latestBlockNumber);
    }
    catch (e){
        console.log("Web3 script error: \n", e);
    }   
}

main();