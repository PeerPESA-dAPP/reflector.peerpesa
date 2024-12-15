import React, { useState } from "react";
import { Loader2, Info } from "lucide-react";
import "../../../../model.scss";
import ReactSelect from "react-select";
import Select from 'react-select';

const CryptoWalletWithdraw = ({withdrawMethod, withdrawCurrency, withdrawAmount, openModelFunc, modelContent}) => {

	const [selectedTab, setSelectedTab] = useState("market"); 
	const [marketplaceState, setMarketplaceState] = useState({
																currencyOptions: [{label: 'ETH', value: '1'}, {label: 'USDT', value: '2'}, {label: 'BTC', value: '3'}],
																buyCurrencyFilter: [],
																sellCurrencyFilter: [],
																cryptoWallets: [],
																withdrawMethod: withdrawMethod 
															});
	
	// toggle payment types tabs {label: 'mqtWRXtVySmX1en5XSDMumVzdrXc4tqzZR', value: '1'},{label: 'mqtWRXtVySmX1en5XSDMumVzdrXc4tqzZm', value: '2'}
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	}
	
	const changeDefaultCurreny = async (options) => {
		
	} 

	const changeCryptoWallet = async (feild, options) => {
		
	} 





	return (
	  <div className="market_crypto_deposit">
		<div className="market_trading_scroll">
		  <div className="input_block form_input_field padding_top_10">
				<label className="column_100 text-left">Withdraw to</label>
				<input
						className="column_100 input"
						type="text"
						placeholder="Enter crypto wallet"
						value={""}
						name="cryptoWallet"
						onChange={(e) => changeCryptoWallet("cryptoWallet", e.target.value)} />
		  </div>
          <div className="input_block form_input_field padding_top_10">
			 <label>Select network</label>	
			 <Select value={""} className="input_select" options={marketplaceState.cryptoWalletsNetworks} isSearchable="true" />	  
		  </div>

		</div>	
		<div className="input_block_details">
		   <div>
			 <p>Total balance:  <span>14.63 USDT</span></p>	
		   </div>
		   <div className="add_new_button column_100"> 
			 <button>Place order</button>
		   </div>
		</div>
	</div>   
	);
};
export default CryptoWalletWithdraw; 
