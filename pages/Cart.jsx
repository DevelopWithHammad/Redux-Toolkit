import React from 'react'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux';
import { getCartItems, getCartError, getCartLoading } from '../store/slices/cartReducer';

export default function Cart() {

  const cartItems = useSelector(getCartItems);
  const isLoading = useSelector(getCartLoading);
  const isError = useSelector(getCartError);

  console.log("cart ===>", cartItems);

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2 >
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : isError ? (
          <h2>{isError}</h2>
        ) : (

          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))

        )
        }
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
