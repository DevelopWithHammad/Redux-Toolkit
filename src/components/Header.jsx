import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useSelector } from 'react-redux'
import { IoIosHeart } from "react-icons/io";
import { useGetProductsQuery } from '../services/apiServices';

export default function Header() {

  const cartItems = useSelector(state => state.cartItems);
  const wishlist = useSelector(state => state.wishList);
  console.log(wishlist);
  return (
    <header>
      <div className="header-contents flex items-center justify-between px-16 border-b py-6">
        <h1 className='text-3xl font-bold'>
          <Link to="/">Hammad Store</Link>
        </h1>
        <div className='flex items-center gap-7'>
          <Link to="/wishlist" className='relative'>
            <IoIosHeart className='text-2xl' />
            <div className="cart-items-count absolute -top-2.5 -right-3 border border-white rounded-full bg-black w-5 h-5 text-white flex items-center justify-center">
              <span className='text-xs'>{wishlist.length}</span>
            </div>
          </Link>
          <Link className="cart-icon relative" to="/cart">
            <img src={CartIcon} alt="cart-icon" />
            <div className="cart-items-count absolute -top-2.5 -right-3 border border-white rounded-full bg-black w-5 h-5 text-white flex items-center justify-center">
              <span className='text-xs'>{cartItems.reduce((acc, currVal) => acc + currVal.quantity, 0)}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
