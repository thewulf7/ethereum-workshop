import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import Contract from './compile';

const provider = new HDWalletProvider(
    'traffic bind pitch electric plate harbor wait plunge permit regret hope year',
    'https://rinkeby.infura.io/Zx3CUf3W1iyVl86B1jvv'
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await new web3.eth.Contract(JSON.parse(Contract.interface))
                      .deploy({ data: Contract.bytecode, arguments: ['Hi there!'] })
                      .send({ gas: '1000000', from: accounts[0] });

        console.log(result.options.address)                      
    } catch (e) {
        console.info(e)
    }
};

deploy();
