import React, { useState } from "react";
import "./model.scss";
import { useNavigate } from "react-router-dom";
import closePopIcon   from "../../assets/settings/close_pop.svg";
import closeBackIcon  from "../../assets/back_button.svg";
import WalletLogin from "./login/wallet";
import AppLogin from  "./login/app";

const PopModel = ({toggleOperationMethodType, openModel, openModelFunc, modelContent, modeCloseResponse}) => {

    if (!openModel) return null;
	const navigate = useNavigate();
	const handleMenuItemClick = (menuItem) => {
		setSelectedMenuItem(menuItem);
	};

	const handleModelClose = (e) => {
		if(modelContent?.operation_method_type_step_2 !== undefined){
            openModelFunc({operation_type: modelContent?.operation_type_step_2, operation_method_type:modelContent?.operation_method_type_step_2, data: modelContent?.data});
		} else {
			openModelFunc();
		}
	};

	return (
	  <div className={openModel? "model_page model_page_trade  nopadding":"model_page model_page_trade hidden nopadding"}>  
		<div  className="clearfix group accountsettings_paymentmethods_model_box_trade">

		  <div className="accountsettings_paymentmethods_model_close clearfix group">
			<img src={(modelContent?.operation_method_type_step_2 !== undefined)? closeBackIcon:closePopIcon} alt="close" className="close_model_icon_trade" onClick={(e) => handleModelClose()}/>
		  </div>	
		  {(modelContent?.operation_type === 'login' && modelContent?.operation_method_type === 'wallet')? <DepositAccount openModelFunc={openModelFunc} modelContent={modelContent} />:''}	
		  {(modelContent?.operation_type === 'login' && modelContent?.operation_method_type === 'app' )? <WithdrawAccount openModelFunc={openModelFunc} modelContent={modelContent}/>:''}
	
		</div> 
	  </div>
	);
};
export default PopModel;
