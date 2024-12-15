import React, { useState } from "react";
import { Loader2, Info } from "lucide-react";
import { CustomScroll } from "react-custom-scroll";
import "../../../../model.scss";
import successIcon from "../../../../../../assets/successful.svg"; 
import { toast } from 'react-toastify'


import api from "../../../../../../api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../../../../providers/AuthProvider";
import { formatAmount } from "../../../../../../common/formatAmount";

const ConfirmWithdraw = ({modelContent, openModelFunc}) => {

	const { authTokens, isLoggedIn } = useAuth();
	const [successPosted,  setSuccessPosted] = useState(false);
	const [marketplaceState, setMarketplaceState] = useState({
																currencyOptions: [],
																buyCurrencyFilter: [],
																sellCurrencyFilter: []
															});
	const handleModelClose = async (options) => {
		openModelFunc();
	} 

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const process = useMutation({
		mutationFn: (fields) => {

		   return api.addWithdrawOrder({ withdrawOrder: fields, token: authTokens.IdToken});
		},
		onError: (error, variables, context) => {
		   
		   const errors = error.response.data.detail;
		   return toast.error(error?.response?.data?.errors[0]?.detail);
		},
		onSuccess: (data, variables, context) => {

		   const responseData = data?.data?.attributes || "";
		   if(data.status === 201 || data.status === 200){
			setSuccessPosted(true);
		   }
		},
	});

	const onSaving = (fields) => {
		fields = {
			...fields,
			requestId:     "5af1bec8",
            currency:      modelContent?.data?.currency,
            walletId:      modelContent?.data?.accountWalletFrom,
            amount:        modelContent?.data?.amount,
            transType:     modelContent?.data?.transType,
            paymentType:   modelContent?.data?.paymentType,
            paymentTypeId: "1",
			paymentMethodId: modelContent?.data?.walletId,
            paymentReference: modelContent?.data?.paymentReference
		};
        process.mutate(fields);
	};

	const capitalizeFirstChar = (fields) => {	
		if (!fields) return "";
		return fields.charAt(0).toUpperCase() + fields.slice(1).toLowerCase();
	}


	return (

	   <>
		<div className={successPosted? "success_form": "hidden"}>
			<div className="text_center model_title_section text_center">
			  

			  <img src={successIcon} alt="successful"/>
			  <h3 className="text_center"> {capitalizeFirstChar(modelContent?.data?.transType)} {modelContent?.data?.paymentType?.toLowerCase()} request submitted </h3>	
			  <h4>The withdrawal request for {modelContent?.data?.currency} {formatAmount(modelContent?.data?.amount)} has successfully been placed </h4>
			  <div className="add_new_button column_100"> 
				<button onClick={() => handleModelClose()}> Ok </button>
			  </div>
			
			</div>
		</div>
  

		<div className={!successPosted? "success_form_2": "hidden"}>
    	 <div className="accountsettings_paymentmethods_model_heading_main">Confirmation {modelContent?.data?.transType?.toLowerCase()} {modelContent?.data?.paymentType?.toLowerCase()}</div>
		  <div className="market_crypto_deposit model_page pop_model_section">
		  <div className="accountsettings_paymentmethods_model_heading_sub  hidden"></div>

		  <div className="market_bank_deposit_scroll_3 padding_top_30">
		  <CustomScroll className="custom_scrollbar" heightRelativeToParent="100%" allowOuterScroll="true">
		  <div className="input_block form_input_field">
		    

			<p className="flex_container flexing_content space_between bank_details">
				<strong>Account Balance</strong> 
				<span>{formatAmount(modelContent?.data?.totalBalance)} {modelContent?.data?.currency}</span>
			</p>	

			<div className="input_block form_input_field">
				<p className="flex_container flexing_content space_between bank_details">
				<b>Payment Amount</b> 
				</p>	
			</div>
			<p className="flex_container flexing_content space_between bank_details">
				<strong>Recieve Amount</strong> 
				<span>{formatAmount(modelContent?.data?.amount)} {modelContent?.data?.currency}</span>
			</p>	
			<p className="flex_container flexing_content space_between bank_details">
				<strong>Trx Fee</strong> 
				<span>{formatAmount(modelContent?.data?.transactionFee)} {modelContent?.data?.currency}</span>
			</p>
			<p className="flex_container flexing_content space_between bank_details">
				<strong>Total Amount</strong> 
				<span>{formatAmount(parseFloat(modelContent?.data?.transactionFee)+parseFloat(modelContent?.data?.amount))} {modelContent?.data?.currency}</span>
			</p>	
		  </div>

		  <div className="input_block form_input_field">
			<p className="flex_container flexing_content space_between bank_details">
			   <b>Payment method</b> 
			</p>	
		  </div>
		<div className="input_block form_input_field">
		    <p className="flex_container flexing_content space_between bank_details">
			   <strong>Type</strong> 
			   <span>{modelContent?.data?.paymentType?.toLowerCase()}</span>
			</p>
			<p className="flex_container flexing_content space_between bank_details">
			   <strong>Account</strong> 
			   <span>{modelContent?.data?.bankAccounts.filter((item) => item.value !== "" && item.value === modelContent?.data?.walletId)[0]?.label || ""}</span>
			</p>	
			<input className="column_100 input hidden" value="XXXX1023" {...register("requestId", { required: false })} type="text" />	
		</div>
		</CustomScroll>
		</div>
		<div className="confirm_button column_100"> 
					{process.isPending && <button> <Loader2 className="processing_loading" /> </button>}
					{!process.isPending && <button onClick={handleSubmit(onSaving)}> Submit </button>}
		</div>
	   </div>  
	 </div>
	</> 	
		  
	);
};
export default ConfirmWithdraw; 
