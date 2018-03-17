import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';

import Contract from '../compile';

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    // get list of all account
    accounts = await web3.eth.getAccounts();

    // use one of accounts to deploy conctracts
    inbox = await new web3.eth.Contract(JSON.parse(Contract.interface))
            .deploy({ data: Contract.bytecode, arguments: ['Hi there!'] })
            .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!')
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    });
});