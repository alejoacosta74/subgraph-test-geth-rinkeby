const Registry= artifacts.require("PersonRegistry");

module.exports = async function(deployer) {    
    let accounts = await web3.eth.getAccounts();
    console.log("Account[2]:", accounts[2]);
    await deployer.deploy(Registry, {from: accounts[2], gas: 3000000});
}