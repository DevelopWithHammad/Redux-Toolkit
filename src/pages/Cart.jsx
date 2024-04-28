import React from 'react'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux';

export default function Cart() {

  const cartItems = useSelector(state => state.cartItems);
  console.log("cart ===>", cartItems);


  return (
    <div className="cart-container ">
      <h2 className='text-center mt-3 font-bold text-2xl'>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container flex items-center justify-center gap-44 mt-16 font-semibold">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {cartItems.map(({ productId, title, rating, price, imageUrl, quantity }, index) => (
          <CartItem
            key={productId}
            productId={productId}
            title={title}
            price={price}
            quantity={quantity}
            imageUrl={imageUrl}
            rating={rating}
            index={index}
          />
        ))}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          <div className="total">
            ${cartItems.reduce((acc, currItem) => acc + currItem.quantity * currItem.price, 0).toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
