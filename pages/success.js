import { useStateContext } from '../context/StateContext'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import runSnow from '../lib/utils'

const success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();
  
    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);

        runSnow();
    },[])
     
  return (
    <div className='success-wrapper'>
      <div className="success">
        <p className="icon">
            <BsBagCheckFill/>
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the recipt.</p>
        <p className="Description">
            If you have any quenstions, please email
            <a href="mailto:order@gmail.com" className="email">
                order@gmail.com
            </a>
        </p>
        <Link href="/">
        <button type="button" width="300px" className='btn'>
            Continue Shopping
        </button>
        </Link>
      </div>
    </div>
  )
}

export default success;
