import React, { useState, useEffect } from "react";
//import { Loader2, Info } from "lucide-react";
import "../../../../model.scss";
//import ReactSelect from "react-select";
import Select from 'react-select';
import { usePaymentMethods } from "../../../../../../providers/PaymentMethodsProvider";
import { useWallets } from "../../../../../../providers/WalletsProvider";
import { formatAmount } from "../../../../../../common/formatAmount";

const MobileMoneyWithdraw = ({withdrawMethod, withdrawCurrency, withdrawAmount, openModelFunc, modelContent}) => {

	const { getWallet } = useWallets();
	const { paymentMethods, reloadPaymentMethods, refreshingPaymentMethods }  = usePaymentMethods(); 
	const [selectedTab, setSelectedTab] = useState("market"); 
	const [selectedPhoneNumber, setSelectedPhoneNumber] = useState({}); 
	const [selectedCountry, setSelectedCountry] = useState({}); 
	const [marketplaceState, setMarketplaceState] = useState({
																	currencyOptions:      [],
																	accountWallets:       [],
																	withdrawCurrency:     withdrawCurrency, 
																	withdrawAmount:       withdrawAmount, 
																	requestId:            "1",
																	currency:             withdrawCurrency,
																	walletId:             "",
																	amount:               withdrawAmount,
																	transType:            "WITHDRAW",
																	paymentType:          "PHONE",
																	paymentTypeId:        "1",
																	paymentReference:     "",
																	accountWalletFrom:    "",
																	totalBalance  :       0,
																	transactionFee:       0,
																	phonenumbers: [],
																	withdrawMethod: withdrawMethod 
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
            
			const walletBalance = await getWallet({currency: withdrawCurrency});	
			if(walletBalance.currency !== ""){
			  setMarketplaceState((prevState) => ({
												  ...prevState,
												  totalBalance     : walletBalance.balance,
												  accountWalletFrom: walletBalance.id
											  }));
			}


			const walletCollection = paymentMethods.filter((w) => w.currency === withdrawCurrency && w.type === 'PHONE_NUMBER');
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
											  label: `You have no ${withdrawCurrency} phone number/s` 
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
									  [field]: withdrawCurrency, // Dynamically update the field passed in the argument.
									  [amount]: withdrawAmount
								  }));
		}catch(e){
			console.log("Error section ", e)
		}	
	}

	useEffect(() => {
	   initCollection();
	}, [withdrawCurrency, withdrawAmount, modelContent?.operation_method_type])

	//  toggle payment types tabs 
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	}
		
	const changeDefaultCurreny = async (options) => {
		
	} 

	// adding missing phone number to withdraw
	const addPhoneNumber = async (e) => {
	  // open model to add bank account
	  openModelFunc({operation_type:'add_phone_number', operation_type_step_2:'crediting', operation_method_type_step_2:'withdraw', data: marketplaceState });
	}
	
	return (
        <div className="market_crypto_deposit">
		  <div className="market_trading_scroll">

		    <div className="input_block form_input_field padding_top_30">
			  <label>Phone number</label>	
			  <Select value={selectedPhoneNumber} className="input_select" onChange={changeDefaultCurreny}
                      options={marketplaceState.phonenumbers} isSearchable="true" />
			  <div className="add_new_paymentmethod_button column_100" onClick={(e) => addPhoneNumber(e)}> 
				<button>Add a new phone number </button> 
			  </div>		  
			</div>
		   
		  </div>	
		  <div className="input_block_details">
			<div>
				<p>Total balance:  <span>{`${formatAmount(marketplaceState?.totalBalance)} ${withdrawCurrency}`}</span></p>	
			</div>
			<div>
				<p>Amount:  <span>{`${formatAmount(withdrawAmount)} ${withdrawCurrency}`}</span></p>	
			</div>
			<div>
				<p>Trx Fee:  <span>{`${formatAmount(marketplaceState?.transactionFee)} ${withdrawCurrency}`}</span></p>	
			</div>
			 <div className="add_new_button column_100"> 
			   <button>Place order</button>
			 </div>
		  </div>
	  </div>  
	);
};
export default MobileMoneyWithdraw; 
