import React, { useState } from "react";
import "./model.scss";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import AddBankAccount from "./payment_methods/add_bank_account";
import AddPhoneNumber from "./payment_methods/add_phone_number";
import AddAccountWallet from "./payment_methods/add_account_wallet";

import DeleteAccountNumber from "./payment_methods/delete/delete_account_number";
import DeletePhoneNumber from "./payment_methods/delete/delete_phone_number";
import DeleteWalletAddress from "./payment_methods/delete/delete_wallet_address";

import closePopIcon   from "../../assets/settings/close_pop.svg";

const PopModel = ({openModel, openModelFunc, modelContent, modeCloseResponse}) => {
	
    if (!openModel) return null;
	const navigate = useNavigate();
	const handleMenuItemClick = (menuItem) => {
		setSelectedMenuItem(menuItem);
	};

	const handleModelClose = (e) => {
	    openModelFunc();
	};
	
	return (
	  <div className={openModel? "model_page scroll_right":"model_page scroll_right hidden"}>  
		<div  className="clearfix group accountsettings_paymentmethods_model_box">

			<div className="accountsettings_paymentmethods_model_close clearfix group">
			  <img src={closePopIcon} alt="" className="close_model_icon" onClick={(e) => handleModelClose()}/>
			</div>	

			{(modelContent?.operation_type === 'add_bank_account')? <AddBankAccount />:''}
			{(modelContent?.operation_type === 'add_phone_number')? <AddPhoneNumber />:''}
			{(modelContent?.operation_type === 'add_wallet_address')? <AddAccountWallet />:''}
			{(modelContent?.operation_type === 'delete_bank_account')? <DeleteAccountNumber />:''}
			{(modelContent?.operation_type === 'delete_phone_number')? <DeletePhoneNumber />:''}
			{(modelContent?.operation_type === 'delete_wallet_address')? <DeleteWalletAddress />:''}
				
		</div> 
	  </div>
	);
};
export default PopModel;
