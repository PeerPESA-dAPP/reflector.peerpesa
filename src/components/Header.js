import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

import '../styles/Header.css';
import { FaCoins } from 'react-icons/fa';
import logoIcon   from "../assets/logo.png";
import logoSmallIcon   from "../assets/small-logo.png";
import walletIcon   from "../assets/other/walletx.svg";
import menuIcon   from "../assets/other/menu.svg";

import userIcon   from "../assets/other/user.svg";
import AccountDetails from './AccountDetails';

const Header = () => {
  
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu,   setUserMenu] = useState(false);
  const [accountAuth,   setAccountAuth] = useState(false);
  const navigate = useNavigate();
  const goTo = (route) => {
    navigate(route); // Navigate to the About page
  };
  const [scrollYPosition, setScrollYPosition] = React.useState(0);
  
  const handleScroll = () => {
    setUserMenu(false)
    setMobileMenu(false)
  };

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const showAccountDetailsTab = () => {
    setMobileMenu(false);
    setUserMenu(!userMenu)
  }

  const showMobileMenuDetailsTab = () => {
     setUserMenu(false)
     setMobileMenu(!mobileMenu)
  }

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <img src={logoIcon} alt="peerpesa" className="logo-snap show-big-screen" />
          <img src={logoSmallIcon} alt="peerpesa" className="logo-snap show-small-screen" />
        </Link>   
      </div>

      <div className={(mobileMenu)? "nav-links":"nav-links  hide_show_menu"}>
       
        <div className="mobile_login_show">
          
          <button className={!accountAuth? "btn  btn-small-extende-right login_btn login_mobile_btn": "hidden"} onClick={(e) => goTo('/login')}  style={{textAlign: 'center'}}>
            Connect to the wallet
          </button>

        </div>

        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/support" className="nav-link">Support</Link>
        <Link to="/faqs" className="nav-link">FAQs</Link>

      </div>

      <div  className="side-menu-section flexing_content flex_container">
        

        <button className="btn  btn-small-extende-right" onClick={(e) => goTo('/buy?coin=')}>
          <img src={walletIcon} alt="buy" className="buy-snap buy-snap-hide-small" />  
          Get Crypto Loan 
        </button>

          
        {/* 
        if the user is not logged in. then login and register  */}
        <button className={!accountAuth? "btn  btn-small-extende-right login_btn mobile_login_hide": "hidden"} onClick={(e) => goTo('/login')}>
          Wallet connect
        </button>

        {/* 
        if the user is logged in  */}
        {(accountAuth)? 
          <>
            <button className="btn-non-bg"  onClick={(e) => showAccountDetailsTab()}>
            <img src={userIcon} alt="menu" className="menu-snap" />  
            </button>
            <AccountDetails showHide={userMenu} /> 
          </> : "" } 
        

        <button className="btn-non-bg hide-menu-tab"  onClick={(e) => showMobileMenuDetailsTab()}>
          <img src={menuIcon} alt="menu" className="menu-snap" />  
        </button>
      </div>
    </nav>
  );
};

export default Header;
