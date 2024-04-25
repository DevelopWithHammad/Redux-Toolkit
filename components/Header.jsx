import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosHeartEmpty } from "react-icons/io";
import { fetchProducts, handleError, updateAllProducts } from '../store/slices/productsReducer';
import { productsList } from '../store/productsList';
import { fetchCartItems, handleCartError, handleCartLoading } from '../store/slices/cartReducer';
import { fetchData } from '../store/middleware/apiService';

export default function Header() {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData({
      url: "/products",
      onStart: fetchProducts.type,
      onSuccess: updateAllProducts.type,
      onError: handleError.type,
    }))
    dispatch(fetchData({
      url: "/carts/5",
      onStart: handleCartLoading.type,
      onSuccess: fetchCartItems.type,
      onError: handleCartError.type,
    }))
  }, [])

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
            {cartItems?.list.reduce((acc, currVal) => acc + currVal.quantity, 0)}
          </div>
        </Link>
      </div>
    </header>
  )
}
