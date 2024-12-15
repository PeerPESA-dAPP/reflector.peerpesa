import React from 'react';
import '../styles/HeroSection.css';
import TransferForm from './TransferForm';
import Footer from './Footer';
import WelcomeStatement from './WelcomeStatement';


import iconIcon     from "../assets/other/simple.svg";
import icon2Icon    from "../assets/other/build.svg";
import icon3Icon    from "../assets/other/support.svg";
import banner1      from "../assets/other/banner_1.svg";
import banner2      from "../assets/other/banner_2.svg";
import usdtBanner   from "../assets/other/usdt_banner.svg";
import usdctBanner  from "../assets/other/usdc_banner_icon.svg";
import xlmBanner    from "../assets/other/xlm_banner_icon.svg";
import cusdBanner   from "../assets/other/cusd.svg";
import stellarIcon   from "../assets/other/stellar.svg";
import togggleIcon   from "../assets/other/togggle.svg";
import celoIcon      from "../assets/other/celo.svg";
import KotaniPayIcon from "../assets/other/kotanipay.svg";


import celoTwoIcon  from "../assets/other/celo_two.svg";
import prezentiIcon  from "../assets/other/prezenti.svg";



const HeroSection = () => {
  return (
   <>      
    <section className="section flexing_content flex_container">
      
      <div className="column_100">
        <WelcomeStatement />
      </div>
      <div className="column_100">
        <TransferForm />
      </div>
    </section>
      
    <div>
      <Footer />
    </div>

   </>      
  );
};

export default HeroSection;
