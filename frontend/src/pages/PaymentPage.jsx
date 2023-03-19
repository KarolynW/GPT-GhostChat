import React, { useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Replace with the contract address and ABI after deployment
        const contractAddress = '0xE6feD16FCBC7B21C10963a3a99d3aB1EC8E0221c';
        const contractABI = [
            {
                "inputs": [],
                "name": "pay",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Replace with the amount you want the user to pay (0.01 MATIC)
        const amount = web3.utils.toWei('0.01', 'ether');

        // Call the pay function from the contract
        const result = await contract.methods.pay().send({ from: account, value: amount });

        if (result.status) {
          setPaymentProcessed(true);
        }

      } catch (error) {
        console.error('Error processing the payment', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  const goToGhostInteraction = () => {
    navigate('/ghost-interaction');
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title" style={{ textAlign: 'center' }}>Cross my Palm</h1>
      <p style={{ textAlign: 'center' }}>One conversation is 0.1 MATIC - accept the transaction to talk</p>
      {!paymentProcessed ? (
        <button className="payment-button" onClick={handlePayment}>
          Pay with MetaMask
        </button>
      ) : (
        <>
          <p>Payment processed! You can now talk to a ghost.</p>
          <button className="payment-button" onClick={goToGhostInteraction}>
            Continue
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
