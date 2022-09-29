const expect = require('chai');
const ethers = require('hardhat');
const data = require('../artifacts/chain/contracts/logistic.sol/logistic.json');

describe ('App starting...', () => {
    
    let seller, buyer, transport;

    beforeEach(async () => {
        const logisticContract = await ethers.getContractFactory('logistic');
        logistic = await logisticContract.deploy(data.abi, data.bytecode, buyer);
        await logistic.deployed;

        seller = await ethers.getSigners();
    });

    describe('Check enums...', async ()=> {
        console.log(await logistic['getState']());
    });


});
