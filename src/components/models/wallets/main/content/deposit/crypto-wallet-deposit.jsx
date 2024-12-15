import React, { useState, useEffect } from "react";
import { Loader2, Info } from "lucide-react";
import "../../../../model.scss";
import QRCode from "react-qr-code";
import Select from 'react-select';
import copyIcon    from "../../../../../../assets/copy.svg";  
import { useWallets } from "../../../../../../providers/WalletsProvider";

const CrypotWalletDeposit = ({depositMethod, depositCountry, depositCurrency, depositAmount, openModelFunc}) => {

	const { getWallet, getMudaWallet, mudaWallets } = useWallets();
	const [selectedTab, setSelectedTab] = useState("market"); 
	const [selectedWalletDetails, setSelectedWalletDetails] = useState({}); 
	const [marketplaceState, setMarketplaceState] = useState({
																currencyOptions: [],
																buyCurrencyFilter: [],
																sellCurrencyFilter: [],
																accountWallets:[],
																requestId: "",
																currency: depositCurrency,
																paymentTypeId: "1",
																walletId:"",
																paymentReference: "",
																country: depositCountry,
																cryptoWalletsNetworks: [],
																depositMethod: depositMethod
															});
	
	
	useEffect(() => {
		const initCollection = async () => {
		  try{	
	         	const walletCollection = await getWallet({currency: depositCurrency});
				if(walletCollection){
                   setSelectedWalletDetails(walletCollection);
				}
	  	     }catch(e){console.log("Error section ", e)}	
		}
		initCollection();		
	}, [depositCurrency])
															
	// toggle payment types tabs 
    const handleToggleTabs = async (options) => {
		if(options?.payment_type !== ""){
		  setSelectedTab(options?.payment_type)
		}
	}
	
	const changeDefaultCurreny = async (options) => {
		
	} 

	const copyAddressToClipBoard = async (copyText) => {
		try {
		  await navigator.clipboard.writeText(copyText);
		} catch (err) {}
	} 


	return (
	  <div className="market_crypto_deposit">
		 <div className="market_trading_scroll_one">
		    <div className="input_block form_input_field padding_top_30">
			 <label>Select network</label>	
			 <Select value={""} className="input_select" options={marketplaceState.cryptoWalletsNetworks} isSearchable="true" />	  
		    </div>
            <div className="flex_container flexing_content bank_details">


				 {(selectedWalletDetails?.address && selectedWalletDetails.address.length > 0) ? 
					(
					  
					  <>	
						
						<div className="qr_defined_size">
				          <QRCode size={256} className="qr_sizer" value={selectedWalletDetails.address[0].address} viewBox={`0 0 256 256`} />
						</div>

						<div className="wallet_details_read text_left">
							<p>
							   <strong>Address</strong>
							   <img 
									src={copyIcon} 
									alt="successful" 
									className="copy_icon_small" 
									onClick={(e) => copyAddressToClipBoard(selectedWalletDetails.address[0].address)}
								/>
							</p>
							<p>{selectedWalletDetails.address[0].address}</p>
						 </div>
						 </>  
					):
					(
					  <div className="text_center no-account-wallet">
						<p className="text-center"><strong>No wallet address</strong></p>
						<p className="text-center">{`Account has no ${depositCurrency} wallet yet!`}</p>
					  </div>
					)
				 }
				<div>
			  </div>
			</div>
		  </div>	
	  </div> 
	);
};
export default CrypotWalletDeposit;
