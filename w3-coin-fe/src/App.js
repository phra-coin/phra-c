import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PhraCoin from './contracts/PhraCoin.json';

function App() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            const networkId = await web3.eth.net.getId();
            console.log('Detected network ID:', networkId);
            const deployedNetwork = PhraCoin.networks && PhraCoin.networks[networkId];
            if (deployedNetwork) {
              console.log('Deployed network:', deployedNetwork);
              const contract = new web3.eth.Contract(
                PhraCoin.abi,
                deployedNetwork.address
              );
              setContract(contract);
              const balance = await contract.methods.balanceOf(accounts[0]).call();
              setBalance(web3.utils.fromWei(balance, 'ether'));
            } else {
              alert('Smart contract not deployed to detected network.');
            }
            setWeb3(web3);
          } else {
            console.error('No accounts detected.');
          }
        } catch (error) {
          console.error('Error loading blockchain data:', error);
        }
      } else {
        console.error('MetaMask not detected.');
      }
    }

    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>Phra Coin (PHRA)</h1>
      <p>Your account: {account}</p>
      <p>Your balance: {balance} PHRA</p>
    </div>
  );
}

export default App;
