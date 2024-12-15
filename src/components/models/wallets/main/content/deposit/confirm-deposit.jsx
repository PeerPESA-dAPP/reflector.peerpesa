import React, { useState, useEffect } from "react";
import { Loader2, Info } from "lucide-react";
import { CustomScroll } from "react-custom-scroll";
import { toast } from 'react-toastify'

import successIcon from "../../../../../../assets/successful.svg";  
import copyIcon    from "../../../../../../assets/copy.svg";  
import "../../../../model.scss";
import QRCode from "react-qr-code";

import api from "../../../../../../api";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../../../../providers/AuthProvider";


import { formatAmount }        from "../../../../../../common/formatAmount";

const ConfirmDeposit = ({modelContent, openModelFunc}) => {

	const { authTokens, isLoggedIn }                               = useAuth();
	const [successPosted,  setSuccessPosted]                       = useState(false);
	const [verificationData,  setVerificationData]                 = useState(modelContent?.data);
	const [verificationMudaBankData,  setVerificationMudaBankData] = useState({});
	const [responseData,  setResponseData]                         = useState({});
	const [marketplaceState, setMarketplaceState] = useState({
																currencyOptions: [],
																buyCurrencyFilter: [],
																sellCurrencyFilter: []
															});
    useEffect(() => {
		const initCollection = async () => {
			try{	
			  let listingBanksDetails = verificationData.mudaAccountsFullCollection.filter((bank) => bank.id ===  verificationData.selectedMudaAccount.value);
		      setVerificationMudaBankData(listingBanksDetails[0]);
			}catch(e){}
		}
		initCollection();
	}, [])
			
	
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
			return api.addDepositOrder({ depositOrder: fields, token: authTokens.IdToken});
		},
		onError: (error, variables, context) => {

            const errors = error.response.data.errors;
			return toast.error(errors[0]?.detail);
		},
		onSuccess: (data, variables, context) => {

          //Saving response content
		   const responseData = data?.data?.attributes || "";
		   setResponseData(responseData)
		   if(data.status === 201 || data.status === 200){
			setSuccessPosted(true);
		   
		} else{
			 const errors = error.response.data.errors;
			 return toast.error(errors[0]?.detail);
		   }
		},
	});

	const onSaving = (fields) => {
		try{
			fields = {
				...fields,
				requestId: "5af1bec8-76e3-4755-81b1-e7d784baf3",
				currency: modelContent?.data?.currency,
				amount: modelContent?.data?.amount,
				transType: verificationData.transType,
				paymentType: verificationData.paymentType,
				paymentTypeId: "1",
				paymentMethodId: verificationMudaBankData.id,
				walletId: modelContent?.data?.walletId,
				paymentReference: modelContent?.data?.paymentReference
			};
			process.mutate(fields);
		}catch(e){
			return toast.error("Error submitting request");
		}
	};

	const capitalizeFirstChar = (fields) => {	
		if (!fields) return "";
		return fields.charAt(0).toUpperCase() + fields.slice(1).toLowerCase();
	}

	const copyToClipBoard = async (copyText) => {	
		try {
		   await navigator.clipboard.writeText(copyText);
		} catch (err) {}
	}

	return (
	  <>
	   <div className={successPosted? "success_form": "hidden"}>
		  <div className="text_center model_title_section text_center">
		    
			<img src={successIcon} alt="successful"/>
			<h3 className="text_center"> {capitalizeFirstChar(verificationData.transType)} {verificationData.paymentType.toLowerCase()} order placed </h3>	
			<h4>Deposit {responseData?.walletCurrency} {formatAmount(responseData.walletTxnAmount)} to our bank details below </h4>
			
			<div className="input_block form_input_field payment_details_bloc">
			  <p className="flex_container flexing_content space_between bank_details">
				<strong>Account name</strong> <span>{verificationMudaBankData?.accountName}</span>
			  </p>
			  <p className="flex_container flexing_content space_between bank_details">
				<strong>Account number</strong> <span>{verificationMudaBankData?.accountNumber}</span>
			  </p>
			  <p className="flex_container flexing_content space_between bank_details">
				<strong>Bank name</strong> <span>{verificationMudaBankData?.bankName}</span>
			  </p>
			  <p className="flex_container flexing_content space_between bank_details">
				<strong>Branch</strong> <span>{verificationMudaBankData?.region}</span>
			  </p>
			</div>	

			<h5 class="text_center transaction_pay_reference"><b>Payment reference</b></h5>
            <div className="flex_container flexing_content text_center center_box"> 
			  <span class="text_center pay_reference display_inline_block">{responseData?.paymentReference ?? ''}</span>
			  <img src={copyIcon} alt="successful" className="copy_icon" onClick={(e) => copyToClipBoard(responseData?.paymentReference ?? '')}/>
			</div> 
			<p class="text_center transaction_pay_reference_note refrence_note"><span>Enter this reference when making the above deposit to identify the transaction.  This reference is valid for 24 hours</span></p>

			<div className="add_new_button column_100"> 
			  <button onClick={() => handleModelClose()}> Ok </button>
			</div>

		  </div>
	  </div>

	  <div className={!successPosted? "success_form_2": "hidden"}>
	   <div className="accountsettings_paymentmethods_model_heading_main">
		 <p> {verificationData.paymentType} {verificationData.transType} Confirmation</p>
	   </div>


		<div className="market_crypto_deposit model_page pop_model_section">
		<div className="accountsettings_paymentmethods_model_heading_sub  hidden">Confirmation Page</div>
         <div className="market_bank_deposit_scroll_3 padding_top_30">
	      <CustomScroll className="custom_scrollbar" heightRelativeToParent="100%" allowOuterScroll="true">
		    <div className="input_block form_input_field">
			  <p className="flex_container flexing_content space_between bank_details">
				<strong>Amount</strong> 
				<span>{formatAmount(modelContent?.data?.amount)} {modelContent?.data?.currency}</span>
			  </p>	
		    </div>


			<div className="input_block form_input_field">
			  <p className="flex_container flexing_content space_between bank_details">
				<strong>Deposit type </strong> 
				<span>{verificationData.paymentType}</span>
			  </p>	
		    </div>
			
		    <div className="input_block form_input_field">
		  	 <p className="flex_container flexing_content space_between bank_details">
			   <b> MUDA bank details </b> 
			 </p>	
		    </div>
			<div className="input_block form_input_field">
			    <p className="flex_container flexing_content space_between bank_details">
				  <strong>Note</strong> <span>Account only accepts {modelContent?.data?.currency} deposits</span>
				</p>
				<p className="flex_container flexing_content space_between bank_details">
				  <strong>Account name</strong> <span>{verificationMudaBankData?.accountName}</span>
				</p>
				<p className="flex_container flexing_content space_between bank_details">
				  <strong>Account number</strong> <span>{verificationMudaBankData?.accountNumber}</span>
				</p>
				<p className="flex_container flexing_content space_between bank_details">
				  <strong>Bank name</strong> <span>{verificationMudaBankData?.bankName}</span>
				</p>
			    <p className="flex_container flexing_content space_between bank_details">
				  <strong>Branch</strong> <span>{verificationMudaBankData?.region}</span>
				</p>
			</div>		
		    <div className="input_block form_input_field">
		  	 <p className="flex_container flexing_content space_between bank_details">
			   <b>Payment method</b> 
			 </p>	
		    </div>
			<div className="input_block form_input_field">
				<p className="flex_container flexing_content space_between bank_details">
					<strong>Deposit Account</strong> 
					<span>{modelContent?.data?.accountWallets.filter((item) =>  item.value !== "" &&  item.value === modelContent?.data?.walletId)[0]?.label || ""}</span>
				</p>
				<input className="column_100 input hidden" value={""} {...register("id", { required: false })} type="text" />	
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
export default ConfirmDeposit;
