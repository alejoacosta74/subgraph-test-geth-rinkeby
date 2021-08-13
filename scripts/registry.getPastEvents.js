const Web3 = require('web3');
const {CONTRACT_ABI, CONTRACT_ADDRESS, BLOCK} = require("./constants");
require('dotenv').config();
let main = async () => {
    try {
        const web3 = new Web3(process.env.INFURA_HTTP);
	//const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:23889/ws"))
        const registry = new web3.eth.Contract(CONTRACT_ABI.abi, CONTRACT_ADDRESS);
	console.log("...reading 'UpdatePerson' events")
	registry.getPastEvents(
		"UpdatedPerson",
		{ fromBlock: BLOCK, toBlock: "latest" },
		(errors, events) => {
		    if (!!errors) {
			console.log("Error while getting event 'UpdatedPerson: \n", errors);
			//console.log("Arguments ", arguments);
		    }
		    else {
			    console.log("Event: \n", events)
		    }
		}
	    );
    } catch (e){
        console.log("script getPastEvents failed: \n", e);
    }
}

main();