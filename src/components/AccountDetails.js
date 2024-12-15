import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

import userIcon   from "../assets/other/user.svg";
import logoutIcon   from "../assets/other/logout.svg";


import dashboardIcon     from "../assets/other/dashboard.svg";
import walletIcon        from "../assets/other/wallet.svg";
import settingsIcon      from "../assets/other/settings2.svg";
import ordersIcon        from "../assets/other/orders.svg";
import transactionsIcon  from "../assets/other/transactions.svg";





const AccountDetails = ({showHide}) => {
  const [showSection, setShowSection ] =  useState(showHide);


  return (
    <div className={showHide ? "account-details": "account-details hidden"}> 
       
       <Link to="/dashboard" className="nav-link-drop-down">      
         <p className="flexing_content flex_container"> 
            <img src={dashboardIcon} alt="dashboard" className="menu-snap-drop-menu" />   
            <span> Dashboard </span>  
         </p>  
       </Link> 
       
       <Link to="/assets" className="nav-link-drop-down">      
         <p className="flexing_content flex_container"> 
           <img src={walletIcon} alt="wallet" className="menu-snap-drop-menu" />   
           <span> Assets</span>   
         </p>  
       </Link> 

       <Link to="/orders" className="nav-link-drop-down">      
         <p className="flexing_content flex_container"> 
           <img src={ordersIcon} alt="deposits" className="menu-snap-drop-menu" />   
           <span> Orders </span>   
         </p>  
       </Link>  
       
       <Link to="/transactions" className="nav-link-drop-down">      
         <p className="flexing_content flex_container"> 
           <img src={transactionsIcon} alt="transactions" className="menu-snap-drop-menu" />   
           <span> Transactions </span>   
         </p>  
       </Link>  
       
       
       <Link to="/settings" className="nav-link-drop-down">      
         <p className="flexing_content flex_container"> 
           <img src={settingsIcon} alt="settings" className="menu-snap-drop-menu" />   
           <span> Settings </span>   
         </p>  
       </Link>    
       
       <p className="flexing_content flex_container"> <img src={logoutIcon} alt="logout" className="menu-snap-drop-menu" />   
          <span>Logout</span> </p>
    </div> 
  );
};

export default AccountDetails;
