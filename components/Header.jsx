import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useSelector } from 'react-redux'
import { IoIosHeartEmpty } from "react-icons/io";


export default function Header() {
  const cartItems = useSelector(state => state.cartItems);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link to="/wishlist">
          <IoIosHeartEmpty />
        </Link>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">
            {cartItems.reduce((acc, currVal) => acc + currVal.quantity, 0)}
          </div>
        </Link>
      </div>
    </header>
  )
}
