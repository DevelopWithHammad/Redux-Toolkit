import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseCartItemQuantity, increaseCartItemQuantity, removeCartItem } from '../../store/slices/cartReducer';
import { RxCrossCircled } from "react-icons/rx";


export default function CartItem({ productId, title, rating, price, imageUrl, quantity, index }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);
  console.log("cartitems ===>", cartItems[0]);
  console.log(index);

  return (
    <div className={`${index === 0 ? ' mt-4' : ' pt-0'}`}>
      <RxCrossCircled
        onClick={() => {
          dispatch(removeCartItem({ productId }))
        }}
        className='ml-auto text-2xl cursor-pointer'
      />
      <div className="cart-item-container flex items-center justify-center gap-44">
        <div className="cart-item">
          <img src={imageUrl} alt={title} className='w-16' />
          <div>
            <h3>{title}</h3>
            <p>{rating} ★ ★ ★ ★</p>
          </div>
        </div>
        <div className="item-price">${price}</div>
        <div className="item-quantity">
          <button onClick={() => {
            dispatch(decreaseCartItemQuantity({ productId }))
          }}
          className='w-6 h-6 bg-gray-200 flex items-center justify-center text-lg '
          >-</button>
          <span>{quantity}</span>
          <button onClick={() => {
            dispatch(increaseCartItemQuantity({ productId }))
          }}
          className='w-6 h-6 bg-gray-200 flex items-center justify-center text-lg '
          >+</button>
        </div>
        <div className="item-total">${(quantity * price).toFixed(2)}</div>

      </div>
    </div>
  )
}
