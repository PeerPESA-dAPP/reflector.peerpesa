import React, { useState } from "react";
import { Loader2, Info } from "lucide-react";
import "../../../model.scss";
import ReactSelect from "react-select";
import Select from 'react-select';

const OTCTrading = () => {

	const [selectedTab, setSelectedTab] = useState("market"); 
	const [marketplaceState, setMarketplaceState] = useState({
		currencyOptions: [{label: 'ETH', value: '1'}, {label: 'USDT', value: '2'}, {label: 'BTC', value: '3'}],
		buyCurrencyFilter: [],
		sellCurrencyFilter: [],
		paymentRate:  [{label: 'Rate', value: '1'}, {label: 'Percentage', value: '2'}],
		paymentWindow:  [{label: 'Minutes', value: '1'}, {label: 'Hours', value: '2'}, {label: 'Days', value: '3'}],
		orderWindow:  [{label: 'Minutes', value: '1'}, {label: 'Hours', value: '2'}, {label: 'Days', value: '3'}]
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
		    
		  <div className="market_trading_scroll">
			
		    <div className="input_block form_input_field">
			  <label>Buy</label>	
			  <Select value={""} className="input_select" onChange={changeDefaultCurreny}
                      options={marketplaceState.currencyOptions} isSearchable="true" />
			  <input className="column_100 input" type="text" placeholder="what i am buying" />
			</div>

			<div className="input_block form_input_field">
			  <label>Sell</label>	
			  <Select value={""} className="input_select" onChange={changeDefaultCurreny}
                    options={marketplaceState.currencyOptions} isSearchable="true" />
			  <input className="column_100 input" type="text" placeholder="what i am selling" />
			</div>

			<div className="flexing_content flex_container input_block form_input_field nopadding_left">
			  <div className="column_50">
				<Select value={""} className="input_select" onChange={changeDefaultCurreny}
                    options={marketplaceState.paymentRate} isSearchable="true" />
				<input className="column_100 input" type="text" placeholder="" />	
			  </div>

			  <div className="column_50 relative padding_top_30">
			    <label>Min. order volume</label>
				<input className="column_100 input" type="text" placeholder="" />
				<span className="max_tab">Max</span>
			  </div>
         	</div>

			
			 <div className="flexing_content flex_container input_block form_input_field">
				<div className="column_50">
					<label>Payment window</label>
					<Select value={""} className="input_select" onChange={changeDefaultCurreny}
						options={marketplaceState.paymentWindow} isSearchable="true" />
					<input className="column_100 input" type="text" placeholder="" />
				</div>

				<div className="column_50">
					<label>Order window</label>
					<Select value={""} className="input_select" onChange={changeDefaultCurreny}
						options={marketplaceState.orderWindow} isSearchable="true" />
					<input className="column_100 input" type="text" placeholder="" />
				</div>
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
export default OTCTrading;
