import React, { useState } from "react";
import { Loader2, Info } from "lucide-react";
import "../../../model.scss";
import ReactSelect from "react-select";
import Select from 'react-select';

const MarketTrading = () => {

	const [selectedTab, setSelectedTab] = useState("market"); 
	const [marketplaceState, setMarketplaceState] = useState({
		currencyOptions: [{label: 'ETH', value: '1'}, {label: 'USDT', value: '2'}, {label: 'BTC', value: '3'}],
		buyCurrencyFilter: [],
		sellCurrencyFilter: []
	});
	

	// toggle payment types tabs 
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	} 

	const changeDefaultCurreny = async (options) => {
		
	} 

	
	
	return (
        <div className="market_trading">
		    <div className="input_block form_input_field">
			  <label>Buy</label>	
			  <Select value={""} className="input_select" onChange={changeDefaultCurreny}
                      options={marketplaceState.currencyOptions} isSearchable="true" />
			  <input className="column_100 input" type="text" placeholder="What i am buying" />
			</div>

			<div className="input_block form_input_field">
			  <label>Sell</label>	
			  <Select value={""} className="input_select" onChange={changeDefaultCurreny}
                    options={marketplaceState.currencyOptions} isSearchable="true" />
			  <input className="column_100 input" type="text" placeholder="What i am selling" />
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
export default MarketTrading;
