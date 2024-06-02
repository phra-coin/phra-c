import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(null);

  const tokenAddress = '0x06ffad1df61fc7089831afb2c7a4f9cf59bd46fd'; // contract address ของ TESTPHRA
  const tokenAbi = [
    // ABI ของ contract TESTPHRA
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          
          const provider = new ethers.BrowserProvider(window.ethereum);
          const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
          const balance = await tokenContract.balanceOf(accounts[0]);
          setBalance(ethers.formatUnits(balance, 0));
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      } else {
        console.log("No wallet detected");
      }
    };

    connectWallet();
  }, []);

  return (
    <div>
      <h1>Account: {account}</h1>
      <h2>Balance: {balance} TESTPHRA</h2>
    </div>
  );
};

export default WalletBalance;
