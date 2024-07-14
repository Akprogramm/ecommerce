import React from "react";

import { Product,FooterBanner,HeroBanner } from "../components";
import { client } from "../lib/client";

 const Home = ({products,banner}) => {
  return ( 
    <>
       <HeroBanner heroBanner={banner.length
         > 0 && banner[0]}/>

       <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variaations</p>
       </div>
       
       <div className="products-container">
        {
          products?.map((product)=> <Product key={product._id} product={product}/>)}
       </div>

       <FooterBanner footerBanner={banner.length && banner[0]}/>
    </>
  )
} 

export const getServerSideProps = async() => {
  const querry = '*[_type == "product"]';
  const products = await client.fetch(querry);

  const querryBanner = '*[_type == "banner"]';
  const banner = await client.fetch(querryBanner);

  return {
    props: {products,banner}
  }
  
}

export default Home;
