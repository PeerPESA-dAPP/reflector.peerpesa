import React, { useState, useEffect } from "react";
import { Loader2, Info } from "lucide-react";
import "../../model.scss";
import Select from 'react-select';
import { useRates } from "../../../../providers/Rates/RatesProvider";
import { countries } from "../../../../common/countries";
import { paymentOptions } from "../../../../common/paymentOptions";
import CrypotWalletDeposit from "./content/deposit/crypto-wallet-deposit";
import BankDeposit from "./content/deposit/bank-deposit";
import MobileMoneyDeposit from "./content/deposit/mobile-money-deposit";

const DepositAccount = ({openModelFunc, modelContent}) => {

	const { currencies } = useRates();
	const [selectedAmount, setSelectedAmount] = useState(""); 
	const [selectedCurrency,  setSelectedCurrency] = useState({});
	const [selectedCountry,  setSelectedCountry] = useState({});
	const [depositMethodType, setDepositMethodType] = useState();
	const [marketplaceState, setMarketplaceState]  = useState({
																  currencyOptions: [],
																  countryOptions: [],
																  depositMethods: []
															  });
		
	useEffect(() => {

		// loading payment methods
		setMarketplaceState((prevState) => ({
			...prevState,
			depositMethods: paymentOptions,
		}));

		// continuation of deposit amount
		if(modelContent?.data && modelContent?.data?.amount !== undefined){
		   setSelectedAmount(modelContent?.data?.amount);
        }

		let payOption  = paymentOptions.filter((option) => option.value === 'bank');
		// continuation of deposit process
		if(modelContent?.data && modelContent?.data?.depositMethod?.value !== undefined){
		  payOption  = paymentOptions.filter((option) => option.value === modelContent?.data?.depositMethod?.value);
        }
		setDepositMethodType(payOption[0]);
		

		//  loading country options
		const countriesOptions = countries.map((country) => ({
			label: country.name,
			value: country.code
		}));
		setMarketplaceState((prevState) => ({
			...prevState,
			countryOptions: countriesOptions,
		}));

		let defaultCountry = countriesOptions.filter((option) => option.value === "UG");
		// continuation of deposit process
		if(modelContent?.data && modelContent?.data?.country !== undefined){
			defaultCountry = countriesOptions.filter((option) => option.value === modelContent?.data?.country);
		}
		setSelectedCountry(defaultCountry[0]);

		//  loading currencies options
		//  default is fiat currencies using isCrypto flag
		const currencyOptions = currencies.filter((currency) => currency.isCrypto === false).map((currency) => ({
			value: currency.code,
			label: currency.code,
		}));

		if(currencyOptions.length > 0){

		  setMarketplaceState((prevState) => ({
			...prevState,
			currencyOptions: currencyOptions,
		  }));
		  

		  let defaultCurrency = currencyOptions.filter((option) => option.value === "UGX");
		  // continuation of deposit process
		  if(modelContent?.data && modelContent?.data?.currency !== undefined){
			defaultCurrency = currencyOptions.filter((option) => option.value === modelContent?.data?.currency);
		  }
		  setSelectedCurrency(defaultCurrency[0]);
		}

	}, [])

	// update the currency on selecting
	const changeDefaultCurreny = (options) => {
		setSelectedCurrency(options)
	}

	// update the country on selecting
	const changeDefaultCountry = (options) => {
		setSelectedCountry(options)
	}

	// update the payment type on selecting
	const changeDefaultPaymentType = async (options) => {

		setDepositMethodType(options)
		// updating currencyList
		await selectCurrencyGroup(options);
	}

	const selectCurrencyGroup = (options) => {

		let letOption = false;
		if(options.value === 'wallet'){
			letOption = true;
		}

		//  loading currencies options
		//  default is fiat currencies using isCrypto flag
		const currencyOptions = currencies.filter((currency) => currency.isCrypto === letOption).map((currency) => ({
			value: currency.code,
			label: currency.code,
		}));

		if(currencyOptions.length > 0){
		  setMarketplaceState((prevState) => ({
			...prevState,
			currencyOptions: currencyOptions,
		  }));

		  let defaultCurrency2 = currencyOptions[0];
		  // continuation of deposit process
		  if(modelContent?.data && modelContent?.data?.currency !== undefined){
			defaultCurrency2 = currencyOptions.filter((option) => option.value === modelContent?.data?.currency);
		  } else if(selectedCurrency?.value !== undefined){
            defaultCurrency2 = selectedCurrency;
		  }
		  setSelectedCurrency(defaultCurrency2);
		  
		}
	}

	return (
	  <div className="pop_moddule_pops_model_main">
		<div className="market_trading pop_model_section">
		
		    <div className={depositMethodType?.value !== 'wallet'? "pop_model_section_blocks":"hidden"}>
			 <div className="input_block form_input_field">
				<label>Country</label>	
				<Select value={selectedCountry} 
							className="input_select" 
							onChange={changeDefaultCountry}
							options={marketplaceState.countryOptions} 
							isSearchable="true" />
			 </div>
			</div> 
			
			<div className="pop_model_section_blocks">
			 <div className="input_block form_input_field">
				<label>Currency</label>	
				<Select value={selectedCurrency} 
							className="input_select" 
							onChange={changeDefaultCurreny}
							options={marketplaceState.currencyOptions} 
							isSearchable="true" />
			 </div>
			</div> 

			<div className="pop_model_section_blocks">
			  <div className="input_block form_input_field">
			  <label>Deposit method </label>	
			  <Select value={depositMethodType} 
			          className="input_select" 
					  onChange={changeDefaultPaymentType}
					  options={marketplaceState.depositMethods} 
					  isSearchable="true" />
			  </div>
			</div> 
			


			{(depositMethodType?.value === 'bank')? <BankDeposit depositMethod={depositMethodType} depositCountry={selectedCountry.value} depositCurrency={selectedCurrency.value} depositAmount={selectedAmount} openModelFunc={openModelFunc} modelContent={modelContent} />:''}
			{(depositMethodType?.value === 'wallet')? <CrypotWalletDeposit depositMethod={depositMethodType} depositCountry={selectedCountry.value} depositCurrency={selectedCurrency.value} openModelFunc={openModelFunc} modelContent={modelContent}/> : ''}
			{(depositMethodType?.value === 'mobile')? <MobileMoneyDeposit depositMethod={depositMethodType} depositCountry={selectedCountry.value} depositCurrency={selectedCurrency.value} depositAmount={selectedAmount} openModelFunc={openModelFunc} modelContent={modelContent}/> :''}

		</div> 

	  </div>
	);
};
export default DepositAccount;
