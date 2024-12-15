import React, {useEffect, useState} from 'react';
import '../styles/MainSection.css';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import {getAvailableReflectorTickers} from '@reflector/subscription-client'
import { Server, Keypair, TransactionBuilder, BASE_FEE, Networks, Operation } from 'stellar-sdk';
import StellarSdk from 'stellar-sdk';



const Stellar_Pubnet_Testnet   = 'CAVLP5DH2GJPZMVO7IJY4CVOD5MWEFTJFVPD2YY2FQXOQHRGHK4D6HLP';
const CEX_DEX_Testnet = 'CCYOZJCOPG34LLQQ7N24YXBM7LL62R7ONMZ3G6WZAAYPB5OYKOMJRN63';

// import SubscriptionClient from '@reflector/subscription-client'
// import {Keypair, Networks, TransactionBuilder} from '@stellar/stellar-sdk'
const priceAPIUrl = 'https://api.reflector.network/price';
const server      = new Server('https://horizon-testnet.stellar.org'); // Use Server instead of StellarSdk.Server
      

function Home() {

  const [stellarSkd, SetStellarSkd] = useState("");
  const [walletDetails, SetWalletDetails] = useState("");
  const createAccount = async () => {
    try {

      const pair = Keypair.random(); // Group's keypair
      SetWalletDetails(pair);
      console.log("Public Key:", pair.publicKey());
      console.log("Secret Key:", pair.secret());
      await fundAccount(pair);

      return pair;
    } catch (error) {
      console.error("Error creating group account:", error);
    }
  };

  const fundAccount = async (walletDetails) => {
    try {
      // Fund the account using the testnet friendbot
      const response = await fetch(
        `https://friendbot.stellar.org/?addr=${walletDetails.publicKey()}`
      );
      if (response.ok) {
        console.log("Account funded successfully.");
      } else {
        throw new Error("Failed to fund account. Check the network or API.");
      }
    } catch (error) {
      console.error("Error creating group account:", error);
    }
  };
  

  // Example of creating a transaction and submitting it to Stellar network
  const createTransaction = async (sourceSecretKey, destinationPublicKey, amount) => {
    try {
      
      const sourceKeypair = Keypair.fromSecret(sourceSecretKey);
      const account = await server.loadAccount(sourceKeypair.publicKey());
  
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          Operation.payment({
            destination: destinationPublicKey,
            asset: StellarSdk.Asset.native(), // XLM
            amount: amount.toString(),
          })
        )
        .setTimeout(30)
        .build();
  
      transaction.sign(sourceKeypair);
  
      const result = await server.submitTransaction(transaction);
      console.log('Transaction result:', result);
    } catch (error) {
      console.error('Error creating or submitting transaction:', error);
    }
  };

  useEffect(() => {

    const initRun = async () =>{
      const pubnetTickers = await getAvailableReflectorTickers('pubnet')
      const externalTickers = await getAvailableReflectorTickers('exchanges')
      //console.log(pubnetTickers)
      //console.log("-------------------1----------------")
      //console.log(externalTickers)
      //console.log("------------------2-----------------")
    }
    
    initRun()
    //createAccount();
    fetchPrice();

  }, []);


  const setupMultisig     = async (groupSecret, memberKeys) => {
      
      const groupKeypair  = StellarSdk.Keypair.fromSecret(groupSecret);
      const account       = await server.loadAccount(groupKeypair.publicKey());
      const transaction   = new StellarSdk.TransactionBuilder(account, {
                                                                        fee: StellarSdk.BASE_FEE,
                                                                        networkPassphrase: StellarSdk.Networks.TESTNET,
                                                                      });
      memberKeys.forEach((key) => {
        transaction.addOperation(
          StellarSdk.Operation.setOptions({
            signer: {
              ed25519PublicKey: key,
              weight: 1, // the member signer weight
            },
          })
        );
      });

      transaction.setTimeout(30).build().sign(groupKeypair);
      await server.submitTransaction(transaction);
      console.log("Multisig account setup completed successfully.");
  };






  async function fetchPrice() {
    try {

      // Your Stellar secret key (keep it secure, do NOT expose in production)
      const sourceSecret    = 'SA7BHFVQSSNMF6FL4LOP22KMJCGRBQJ5NS77V7AHNL4GQTC6SNVX7GVW'; // Replace with your actual secret key
      const sourceAccount   = Keypair.fromSecret(sourceSecret);

      //const server        = new Server('https://horizon-testnet.stellar.org');
      //const accountx      = await server.loadAccount(sourceAccount.publicKey());
      console.log('Balances:', sourceAccount.publicKey());
      return;

      // // Reflector contract address (replace with the actual Reflector contract address)
      // const reflectorContractAddress = Stellar_Pubnet_Testnet; // Replace with actual address

      // // Token or asset associated with Reflector contract (replace with the actual asset details)
      // const asset = new StellarSdk.Asset('USDC', reflectorContractAddress); // Assuming XRF token

      // // Load the source account from the Stellar server
      // const account = await server.loadAccount(sourceAccount.publicKey());

      // // Create the transaction to interact with the Reflector contract
      // const transaction = new StellarSdk.TransactionBuilder(account, {
      //     fee: StellarSdk.BASE_FEE,
      //     networkPassphrase: StellarSdk.Networks.PUBLIC, // Replace with 'TESTNET' for Testnet
      // })
      //     // Example: Adding a payment operation (replace with correct operation for the contract)
      //   .addOperation(
      //         StellarSdk.Operation.payment({
      //             destination: reflectorContractAddress,
      //             asset: asset,
      //             amount: '1', // Sending 1 XRF (adjust based on the contract logic)
      //         })
      //   )
      //   .setTimeout(30) // Set the timeout for the transaction
      //   .build();

      // // Sign the transaction with the source account
      // transaction.sign(sourceAccount);

      // // Submit the transaction to the Stellar network
      // const result = await server.submitTransaction(transaction);
      // console.log('Transaction successful:', result);

  } catch (error) {
      console.error('Error interacting with Reflector contract:', error);
  }
}


    
  //   //callback for signing generated trasnactions
  //   const sign = async (xdr, opts) =>{
  //     const tx = TransactionBuilder.fromXDR(xdr, opts.networkPassphrase) //parse a transaction from raw XDR
  //     tx.sign(Keypair.fromSecret('SC7L...8LOI')) //sign it
  //     return tx.toEnvelope().toXDR('base64') //return signed transaction
  //     //alternatively, you can call wallet here to sign the transaction
  //   }


  //   //callback for signing generated trasnactions
  //   const sc = async (pubkey, sign, rpc_url) =>{
  //       //create a new instance of the client
  //       return new SubscriptionClient({
  //         publicKey: pubkey, //'GAD4...F06D',  //address of the account that will own subscriptions
  //         signTransaction: sign, //tx signing callback
  //         rpcUrl: rpc_url // 'https://rpc.url/' //RPC URL
  //       })

  //       // const sc = new SubscriptionClient({
  //       //   publicKey: 'GAD4...F06D',  //address of the account that will own subscriptions
  //       //   signTransaction: sign, //tx signing callback
  //       //   rpcUrl: 'https://rpc.url/' //RPC URL
  //       // })
  //   }

  //   const created = async () =>{

  //        //create new subscription
  //        const created = await sc.createSubscription({
  //             webhook: 'https://your.site/endpoint-that-will-receive-notifications',
  //             base: {asset: 'AQUA:GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA', source: 'pubnet'}, //base symbol
  //             quote: {asset: 'SOL', source: 'exchanges'}, //quote symbol
  //             threshold: 3,  //trigger subscription if the price changed more than 0.3%
  //             heartbeat: 20, //send updates to the server once every 20 minutes regardless of the price changes
  //             initialBalance: '300' //deposit 300 tokens
  //         })

  //  }

  //  const subscriptionId = async () =>{
      
  //       const  created = await created();
  //       console.log(created)
  //       return created.id;
  //  }


  //  const generalRun = async (option) =>{

  //     if(option === 'run') {
  //       const sc = await sc(pubkey, sign, rpc_url);
  //       //retrieve subscription from the ledger
  //       const fetched = await sc.getSubscription(subscriptionId)
  //       console.log(fetched) //sholuld be identical to the previosuly created subscription

  //       //estimate daily retention fee
  //       console.log(await sc.getRetentionFee(subscriptionId))

  //       //deposit additional tokens to the subscription balance
  //       await sc.deposit(subscriptionId, '100')
  //     }

  //     if(option === 'cancel') {

  //       //cancel the subscription and get back the remaining deposit balance
  //       await sc.cancel(subscriptionId)
  //     }
  // }

return (
    <div className="App">
      <Header />
      <HeroSection />
    </div>
  );
}

export default Home;
