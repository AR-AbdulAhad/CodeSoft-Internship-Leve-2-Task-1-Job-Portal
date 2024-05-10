import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Category from "./Category";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import CountSection from "./CountSection";
import FeaturedJob from "./FeaturedJob";
import Subscription from "./Subscription";

const Home = () => {
  
  return (
    <>
    <Navbar />
    <div className="w-full pt-[130px]">
      <HeroSection />
      <CountSection />
      <Category />
      <FeaturedJob />
      <HowItWorks />
      <Subscription />
      <Footer />
    </div>
    </>
  );
};

export default Home;
