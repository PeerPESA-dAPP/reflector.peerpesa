import React, { useState } from "react";
import Select from 'react-select';
import '../styles/TransferForm.css';
import sendIcon   from "../assets/other/send.svg";
//import { useNavigate } from "react-router-dom";

const TransferForm = () => {
  
  //const navigate = useNavigate();
  const [currencyCollection, setCurrencyCollection] = useState({
                                                currencyOptions: [
                                                    { value: '1', label: 'Bank' },
                                                    { value: '2', label: 'Mobile Money' }
                                                ],
                                                buyCurrencyFilter: [],
                                                sellCurrencyFilter: [],
                                                currencyCountryFlagsCollection: [
                                                      {
                                                        value: 'ugx',
                                                        label: 'UGX',
                                                        imageUrl: 'https://www.worldometers.info/img/flags/ug-flag.gif',
                                                      },
                                                      {
                                                        value: 'kes',
                                                        label: 'KES',
                                                        imageUrl: 'https://www.worldometers.info/img/flags/ke-flag.gif',
                                                      }
                                                    ],
                                                currencyFlagsCollection: [
                                                      {
                                                        value: 'usdt',
                                                        label: 'USDT',
                                                        imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035',
                                                      },
                                                      {
                                                        value: 'btc',
                                                        label: 'BTC',
                                                        imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035',
                                                      },
                                                      {
                                                        value: 'eth',
                                                        label: 'ETH',
                                                        imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035',
                                                      },
                                                      {
                                                        value: 'sol',
                                                        label: 'SOLANA',
                                                        imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035',
                                                      },
                                                      {
                                                        value: 'usdc',
                                                        label: 'USDC',
                                                        imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035',
                                                      },
                                                      {
                                                        value: 'tron',
                                                        label: 'TRON',
                                                        imageUrl: 'https://cryptologos.cc/logos/tron-trx-logo.png?v=035',
                                                      }
                                                    ]
                                             });    
  
  const changeDefaultCurreny = () => {
      
  }   

  // Custom option label with image and text
  const formatOptionLabel = ({ label, imageUrl }) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={imageUrl} alt={label} style={{ width: 20, height: 20, marginRight: 10 }} />
        <span>{label}</span>
      </div>
  );
    
  return (
    <div className="card">
      <form className="form">
       
       
        {/* <div className="buy-currency">
          <label> Selling </label>
          <input className="column_1000 input" type="text" value="200"/>
          <Select
			           	className="selection "
                  value={currencyCollection.currencyFlagsCollection[0]}
                  options={currencyCollection.currencyFlagsCollection}
                  formatOptionLabel={formatOptionLabel}
                  placeholder=""
                />
        </div>
        <div className="sell-currency">
          <label>What you get </label>
          <input className="column_1000 input"  type="text" value="20"/>
          <Select
			        	className="selection"
                value={currencyCollection.currencyCountryFlagsCollection[0]}
                options={currencyCollection.currencyCountryFlagsCollection}
                formatOptionLabel={formatOptionLabel}
                placeholder=""
              />
        </div>      
        <div className="form-inputs">
          <label> Mode of payment </label>
          <div className="selection-payment-method clearfix group">
            <Select
                   value={currencyCollection.currencyOptions[2]}
                   placeholder="select payment method"
				           className="selection-other"
                   onChange={changeDefaultCurreny}
                   options={currencyCollection.currencyOptions}
				           isSearchable="true" />
          </div>
        </div> */}
        {/* <div className="payment-details">
          <p  className="group clearfix"> 
              <b>Network Fee</b><span className="float-right">0.23 CELO</span></p>
          <p  className="group clearfix"> 
              <b>Transfer Time</b> <span className="float-right">Approx 2 days </span></p>
          <p  className="group clearfix"> 
              <b>Amount</b> <span className="float-right">3200 CELO</span></p>
          <p  className="group clearfix"> 
              <b>Total Amount</b> <span className="float-right">320,000 UGX</span></p>
        </div>  */}
        <button className="send-button">
           <span>Start App</span>
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
