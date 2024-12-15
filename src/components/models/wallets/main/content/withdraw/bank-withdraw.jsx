import { toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import { Loader2, Info } from "lucide-react";
import "../../../../model.scss";
import ReactSelect from "react-select";
import Select from 'react-select';
import { usePaymentMethods } from "../../../../../../providers/PaymentMethodsProvider";
import { useWallets }        from "../../../../../../providers/WalletsProvider";
import { formatAmount }      from "../../../../../../common/formatAmount";

const BankWithdraw = ({withdrawMethod, withdrawCurrency, withdrawAmount, openModelFunc, modelContent}) => {

	const { getWallet } = useWallets();
	const { paymentMethods, reloadPaymentMethods,  refreshingPaymentMethods }  = usePaymentMethods(); 
	const [selectedTab, setSelectedTab] = useState("market"); 
	const [selectedAccountWallet, setSelectedAccountWallet] = useState({}); 
	const [marketplaceState, setMarketplaceState] = useState({
																currencyOptions:    [],
																buyCurrencyFilter:  [],
																sellCurrencyFilter: [],
																bankAccounts:       [],
																accountWallets:     [],
																withdrawCurrency:   withdrawCurrency, 
																withdrawAmount:     withdrawAmount, 
																requestId:          "1",
																currency:           withdrawCurrency,
																walletId:           "",
																amount:             withdrawAmount,
																transType:          "WITHDRAW",
																paymentType:        "BANK",
																paymentTypeId:      "1",
																paymentReference:   "",
																accountWalletFrom:   "",
																totalBalance  :   0,
																transactionFee:   0,
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
            
			let accountWallets = 'accountWallets';
			let bankAccounts = 'bankAccounts';
			const walletBalance = await getWallet({currency: withdrawCurrency});	
			if(walletBalance.currency !== ""){
			  setMarketplaceState((prevState) => ({
												  ...prevState,
												  totalBalance     : walletBalance.balance,
												  accountWalletFrom: walletBalance.id
											  }));
			}

			const walletCollection = paymentMethods.filter((w) => w.currency === withdrawCurrency && w.type === 'BANK_ACCOUNT');
			const defaultWalletOptions  = [{ value: "", label: ""}];
			setSelectedAccountWallet({});
			setMarketplaceState((prevState) => ({
													...prevState,
													accountWallets: defaultWalletOptions,
												}));


			let walletDataContent = { value: "",
									  label: `You have no ${withdrawCurrency} bank accounts`};
			
			if(modelContent?.data?.bankAccounts !== undefined && modelContent?.data?.walletId !== undefined){
				let walletDataContent2 = modelContent?.data?.bankAccounts?.filter((option) => option.value === modelContent?.data?.walletId);
				const verifyAcc = walletCollection.filter((wallet) => wallet.id === walletDataContent2[0]?.value)
				if(verifyAcc.length > 0){
                    walletDataContent = walletDataContent2[0];
				}
			    
			}

			if(walletCollection?.length > 0){

				const accountsOptionsDefault = [{ value: "", label: "Select payment method"}]; 
				const accountsOptionsCollection  = walletCollection.map((wallet) => ({
																						value: wallet.id,
																						label: `${wallet.bankName} - ${wallet.accountNumber}` 
																					})); 
				const accountsOptions = accountsOptionsDefault.concat(accountsOptionsCollection);	
				setMarketplaceState((prevState) => ({
														...prevState,
														bankAccounts: accountsOptions,
													}));

				  setSelectedAccountWallet(accountsOptions[0]);
				if(walletDataContent.value !== ""){
				  setSelectedAccountWallet(walletDataContent);
				}											

			} else{
				setMarketplaceState((prevState) => ({
														...prevState,
														accountWallets: [walletDataContent],
													}));
                setSelectedAccountWallet(walletDataContent);
			}
				
			const field = 'currency';
			const amount = 'amount';
			setMarketplaceState((prevState) => ({
										...prevState,
										[field]: withdrawCurrency, // Dynamically update the field passed in the argument.
										[amount]: withdrawAmount
									}));

		}catch(e){console.log("Error section ", e)}	
	}

	useEffect(() => {	 
		let accountWallets = 'accountWallets';
		let bankAccounts   = 'bankAccounts';
		let walletId       = 'walletId';
		const accountsOptionsDefault = [{ value: "", label: "Select payment method"}];
		setSelectedAccountWallet(accountsOptionsDefault);
		setMarketplaceState((prevState) => ({
											...prevState,
											[accountWallets]: [], // Dynamically update the field passed in the argument.
											[bankAccounts]: [], // Dynamically update the field passed in the argument.
											[walletId]: ""
										}));
	}, [withdrawCurrency, modelContent?.operation_method_type]);

	useEffect(() => {	 
	   initCollection();
	}, [withdrawCurrency, withdrawAmount, modelContent?.operation_method_type]);

	
	// toggle payment types tabs 
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	}

	useEffect(() => {
		initCollection();
	}, []);
		

	const addBankAccount = async (e) => {
	   // open model to add bank account
	   openModelFunc({operation_type:'add_bank_account', operation_type_step_2:'crediting', operation_method_type_step_2:'withdraw', data: marketplaceState});
	}

	const confirmAccountWithdraw = async (options) => {
	
		if(marketplaceState.currency === ""){
            return toast.error("Provide withdraw currency");
		}
		
		if(marketplaceState.amount === "" || isNaN(parseFloat(marketplaceState.amount)) || parseFloat(marketplaceState.amount) <= 0){
			return toast.error("Provide withdraw amount");
		}

		if(parseFloat(marketplaceState.totalBalance) < (parseFloat(marketplaceState.transactionFee) + parseFloat(marketplaceState.amount) )){
			return toast.error(`Wallet has less balance of ${marketplaceState.totalBalance} ${marketplaceState.currency} to withdraw`);
		}

		if(marketplaceState.walletId === ""){
			return toast.error("Select payment method to send money to");
		}

	    // open model to add bank account
	    openModelFunc({data: marketplaceState, operation_type:'confirm_withdraw',  operation_type_step_2:'crediting', operation_method_type_step_2:'withdraw'});
	} 

	const changeDefaultBankAccount = async (options) => {
		// open model to add bank account
		setSelectedAccountWallet(options);
		const field = 'walletId';
		setMarketplaceState((prevState) => ({
										...prevState,
										[field]: options.value, // Dynamically update the field passed in the argument.
									}));
	} 

	

	return (

		
		<div className="market_crypto_deposit">
		<div className="market_trading_scroll">
		  <div className="input_block form_input_field padding_top_30">
			<label>Bank account </label>	
			<Select value={selectedAccountWallet} 
			        className="input_select" 
					onChange={changeDefaultBankAccount}
					options={marketplaceState.bankAccounts} isSearchable="true" />

			<div className="add_new_paymentmethod_button column_100" onClick={(e) => addBankAccount(e)}> 
				 <button>Add a new bank account </button> 
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
		   <div className="add_new_button column_100" onClick={(e) => confirmAccountWithdraw(e)}> 
			 <button> Place order </button>
		   </div>
		</div>
	</div>  
	);

	
	
};
export default BankWithdraw;
