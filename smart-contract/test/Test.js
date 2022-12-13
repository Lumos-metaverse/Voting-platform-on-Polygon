const {assert} = require('chai');

//import contract
const Voting = artifacts.require("Voting");

require('chai').use(require('chai-as-promised')).should();
contract('Voting', ([deployer, author, tipper]) => {
    let voting;

    before(async () => {
        voting = await Voting.deployed();
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await voting.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
    })
})