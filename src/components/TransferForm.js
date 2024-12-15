import React, { useState } from "react";
// import Select from 'react-select';
import '../styles/TransferForm.css';
import { useNavigate } from "react-router-dom";

const TransferForm = () => {
  
  const navigate = useNavigate();
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
                                                      }
                                                    ],
                                                currencyFlagsCollection: [
                                                      {
                                                        value: 'usdt',
                                                        label: 'USDT',
                                                        imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035',
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
        <button className="send-button">
          <span onClick={() => navigate('/app')}>Start App</span>
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
