import React, { useState, useEffect } from "react";
import { Loader2, Info } from "lucide-react";
import { CustomScroll } from "react-custom-scroll";
import { toast } from 'react-toastify'
import "../../../../model.scss";
import { useWallets } from "../../../../../../providers/WalletsProvider";

//import ReactSelect from "react-select";
import Select from 'react-select';

const BankDeposit = ({depositMethod, depositCountry, depositCurrency, depositAmount, openModelFunc, modelContent}) => {

	const { getWallet, getMudaWallet, mudaWallets } = useWallets();
	const [selectedTab, setSelectedTab] = useState("market"); 
	const [selectedAccountWallet, setSelectedAccountWallet] = useState({}); 
	const [marketplaceState, setMarketplaceState] = useState({
																currencyOptions: [],
																buyCurrencyFilter: [],
																sellCurrencyFilter: [],
																accountWallets:[],

																requestId: "1234",
																currency: depositCurrency,
																amount:   depositAmount,
																depositMethod: depositMethod,
																transType: "DEPOSIT",
																paymentType: "BANK",
																paymentTypeId: "1",
																walletId:"",
																paymentReference: "",
																country: depositCountry,
																mudaAccounts: [],
																mudaAccountsFullCollection: [],
																selectedMudaAccount: {}
															});






	useEffect(() => {
	  const initCollection = async () => {

		try{				

			const walletCollection = await getWallet({currency: depositCurrency});	
			const defaultWalletOptions  = [{ value: "", label: ""}];
			setSelectedAccountWallet({});
			setMarketplaceState((prevState) => ({
													...prevState,
													accountWallets: defaultWalletOptions,
												}));

			if(walletCollection?.currency !== undefined){
				let walletCollectionGroup = [];
				walletCollectionGroup.push(walletCollection);
                const walletOptions  = walletCollectionGroup.map((wallet) => ({
					                                value: wallet.id,
													label: wallet.description
				                                }));
				if(walletOptions.length > 0){
					
					setMarketplaceState((prevState) => ({
						...prevState,
						accountWallets: walletOptions,
					}));

					setSelectedAccountWallet(walletOptions[0]);
                    let walletId = 'walletId';
					setMarketplaceState((prevState) => ({
															...prevState,
															[walletId]: walletOptions[0].value
														}));

				}
			}else {
				
				let nodataContent = {
										value: "",
										label: `You have no ${depositCurrency} wallets yet` 
									};
				setMarketplaceState((prevState) => ({
											...prevState,
											accountWallets: [nodataContent] }));
				setSelectedAccountWallet(nodataContent);
			}
		
			const currency   = 'currency';
			const amount  = 'amount';
			const country = 'country';
		    setMarketplaceState((prevState) => ({
										...prevState,
										[currency]: depositCurrency,
										//[amount]: depositAmount,
										[country]: depositCountry
									}));

	    }catch(e){console.log("Error section ", e)}	
	  }
	  initCollection();


	  getMudaWallet({ country: depositCountry, currency: depositCurrency, paymode: "bank"});	
	  const handleResize = () => {
		const viewportHeight = window.innerHeight;
        const topDiv         = document.getElementById("modelContentTopDiv");
		let topDivHeight     = "";
        // if (topDiv) {
		// 	topDivHeight = topDiv.offsetHeight; // Get pixel height
		// 	topDivHeight     = (topDivHeight / viewportHeight) * 100; // Convert to vh
		// }
		console.log({
			width: window.innerWidth,
			height: window.innerHeight,
			topDivHeight: topDivHeight
		  })
	  };
	  window.addEventListener("resize", handleResize);
  	  return () => {
		window.removeEventListener("resize", handleResize);
	  }	  
	}, [depositCurrency, depositAmount, depositCountry])


	//consider muda selected accounts
	useEffect(() => {
		const mudaAccounts         = 'mudaAccounts';
		const selectedMudaAccount  = 'selectedMudaAccount';
		const mudaAccountsFullCollection = 'mudaAccountsFullCollection';
		let mudaWalletsCollection  = mudaWallets.map((account) => ({
																		value:  account.id,
																		label: 	`${account.accountName} (${account.bankName})`	 
																	}));

		let selectedMudaAcc = (mudaWalletsCollection.length > 0)? mudaWalletsCollection[0]: {};
		if(modelContent?.data?.selectedMudaAccount !== undefined ){
			selectedMudaAcc	= modelContent?.data?.selectedMudaAccount;							
		}

		setMarketplaceState((prevState) => ({
												...prevState,
												[mudaAccountsFullCollection]: mudaWallets,
												[mudaAccounts]: mudaWalletsCollection,
												[selectedMudaAccount]: selectedMudaAcc
											}));														
	},[mudaWallets]);





	
	// toggle payment types tabs 
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	}

	const changeAccountWallets = async (options) => {
		setSelectedAccountWallet(options)
		const field = 'walletId';
		setMarketplaceState((prevState) => ({
										...prevState,
										[field]: options.value, // Dynamically update the field passed in the argument.
									}));
	}



	const confirmAccountDeposit = async (options) => {
    	
		// open model to add bank account
		if(marketplaceState.currency === ""){
          return toast.error("Provide deposit currency");
		}

		if(marketplaceState.country === ""){
          return toast.error("Select country");
		}

		if(marketplaceState.amount === "" || isNaN(parseFloat(marketplaceState.amount))){
		  return toast.error("Provide deposit amount");
		}

		if(marketplaceState.walletId === ""){
		  return toast.error("Select account wallet to credit");
		}

		if(marketplaceState?.selectedMudaAccount?.value === "" || marketplaceState?.selectedMudaAccount?.value === undefined){
			return toast.error("Select MUDA credit account");
		}

		openModelFunc({data: marketplaceState, operation_type:'confirm_deposit',  operation_type_step_2:'crediting', operation_method_type_step_2:'deposit'});
	} 


	const onInputChange = (field, e) => {
		setMarketplaceState((prevState) => ({
		  ...prevState,
		  [field]: e.target.value, // Dynamically update the field passed in the argument.
		}));
	};






	const changeMudaAccountWallets = async (e) => {
	   const selectedMudaAccount = e;
	   const selectedAcc = 'selectedMudaAccount'
	   setMarketplaceState((prevState) => ({
												...prevState,
												[selectedAcc]: e
										   }));
	}

	return (
      <div className="market_crypto_deposit market_bank_deposit_scroll_over">
        <div className="market_bank_deposit_scroll padding_top_30"> 
	      <CustomScroll className="custom_scrollbar" id="modelContentTopDiv" heightRelativeToParent="100%" allowOuterScroll="true">
		  
		    <div className="pop_model_section_blocks">
				<div className="input_block form_input_field">	
				  <label>Muda Account</label>	
				  <Select value={marketplaceState.selectedMudaAccount} 
						  className="input_select" 
						  onChange={changeMudaAccountWallets}
						  options={marketplaceState.mudaAccounts} 
						  isSearchable="true" />
				</div>
			</div> 
			<div className="pop_model_section_blocks">
			 <div className="input_block form_input_field">
				<label>Amount</label>	
				<input className="column_100 input hide_pointer_number" 
				       value={marketplaceState?.amount} 
					   onChange={(e) => onInputChange("amount", e)} 
					   type="number" placeholder="Enter amount to deposit" />
			 </div>
			</div> 

		   </CustomScroll>
          </div>

		  <div className="input_block_details">
			 <div>
			   <p>Total amount:  <span>{marketplaceState?.amount} {depositCurrency}</span></p>	
			 </div>
			 <div className="add_new_button column_100" onClick={(e) => confirmAccountDeposit(e)}> 
			   <button> Place order </button>
			 </div>
		  </div>
	  </div> 
	);
};
export default BankDeposit;
