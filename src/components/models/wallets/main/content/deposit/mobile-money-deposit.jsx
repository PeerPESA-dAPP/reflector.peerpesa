import React, { useState, useEffect } from "react";
//import { Loader2, Info } from "lucide-react";
import "../../../../model.scss";
import Select from 'react-select';
import { usePaymentMethods } from "../../../../../../providers/PaymentMethodsProvider";
import { useWallets } from "../../../../../../providers/WalletsProvider";
import { formatAmount } from "../../../../../../common/formatAmount";


const MobileMoneyDeposit = ({depositMethod, depositCountry, depositCurrency, depositAmount, openModelFunc, modelContent}) => {

	const { getWallet } = useWallets();
	const { paymentMethods, reloadPaymentMethods,  refreshingPaymentMethods}  = usePaymentMethods(); 
	const [selectedTab, setSelectedTab] = useState("market"); 
	const [selectedPhoneNumber, setSelectedPhoneNumber] = useState({}); 
	const [selectedCountry, setSelectedCountry] = useState({}); 
	const [marketplaceState, setMarketplaceState] = useState({
																buyCurrencyFilter:  [],
																sellCurrencyFilter: [],
																phonenumbers: [],
																currency:      depositCurrency,
																amount:        depositAmount,
																depositMethod: depositMethod,
																country:       depositCountry
															});
	
	useEffect(() => {
		const paymentCollectionLoad = async () => {
			try{	
			    // reloading paymentmenthods
			    // reloading paymentmenthods
			    await reloadPaymentMethods();
		    	await refreshingPaymentMethods();
			}catch(e){
				console.log("Error section ", e)
			}	
	    }	
		paymentCollectionLoad();
	}, []) //paymentMethods	
	
	
	// main  init collection 
	const initCollection = async () => {
		try{	
            
			const walletBalance = await getWallet({currency: depositCurrency});	
			if(walletBalance.currency !== ""){
			  setMarketplaceState((prevState) => ({
												  ...prevState,
												  totalBalance     : walletBalance.balance,
												  accountWalletFrom: walletBalance.id
											  }));
			}


			const walletCollection = paymentMethods.filter((w) => w.currency === depositCurrency && w.type === 'PHONE_NUMBER');
			const defaultWalletOptions  = [{ value: "", label: ""}];
			setSelectedPhoneNumber({});
			setMarketplaceState((prevState) => ({
													...prevState,
													accountWallets: defaultWalletOptions,
												}));
			

			if(walletCollection?.length > 0){

				const accountsOptionsDefault = [{ value: "", label: "Select payment method"}]; 
				const accountsOptionsCollection  = walletCollection.map((wallet) => ({
													value: wallet.id,
													label: `${wallet.phonenumber} - ${wallet.phonenumberLabel}` 
												})); 
				const accountsOptions = accountsOptionsDefault.concat(accountsOptionsCollection);										
				if(accountsOptions.length > 0){
					setMarketplaceState((prevState) => ({
						...prevState,
						phonenumbers: accountsOptions,
					}));
					setSelectedPhoneNumber(accountsOptions[0]);
				}
			}  else {
				  let nodataContent = {
											  value: "",
											  label: `You have no ${depositCurrency} phone number/s` 
										  };
				  setMarketplaceState((prevState) => ({
											  ...prevState,
											  phonenumbers: [nodataContent],
										  }));
				  setSelectedPhoneNumber(nodataContent);
		  }

		  const field = 'currency';
		  const amount = 'amount';
		  setMarketplaceState((prevState) => ({
									  ...prevState,
									  [field]: depositCurrency, // Dynamically update the field passed in the argument.
									  [amount]: depositAmount
								  }));
		}catch(e){
			alert(e.message)
			console.log("Error section ", e)
		}	
	}

	useEffect(() => {
	   initCollection();
	}, [depositCurrency, depositAmount, modelContent?.operation_method_type])
														

	// toggle payment types tabs 
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	}
	
	
	const changePhoneNumber = async (options) => {
		
	} 

	// adding missing phone number to deposit
	const addPhoneNumber = async (e) => {
		// open model to add bank account
		openModelFunc({operation_type:'add_phone_number', operation_type_step_2:'crediting', operation_method_type_step_2:'deposit', data: marketplaceState });
	}
	
	return (
        <div className="market_crypto_deposit">
		  <div className="market_trading_scroll">

		    <div className="input_block form_input_field padding_top_30">
			  <label>Phone number</label>	
			  <Select value={selectedPhoneNumber} className="input_select" onChange={changePhoneNumber}
                      options={marketplaceState.phonenumbers} isSearchable="true" />
			  <div className="add_new_paymentmethod_button column_100" onClick={(e) => addPhoneNumber(e)}> <button>Add a new phone number </button> </div>		  
			</div>
		   
		  </div>	


		  <div className="input_block_details">
		    <div>
				<p>Amount:  <span>{`${formatAmount(depositAmount)} ${depositCurrency}`}</span></p>	
			</div>
			<div>
				<p>Trx Fee:  <span>{`${formatAmount(marketplaceState?.transactionFee)} ${depositCurrency}`}</span></p>	
			</div>
            <div className="add_new_button column_100"> 
			   <button>Place order</button>
			</div>
		  </div>
	  </div>  
	);
};
export default MobileMoneyDeposit; 
