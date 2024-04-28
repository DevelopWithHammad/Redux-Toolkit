import React from 'react'
import { useDispatch } from 'react-redux'
import { RxCrossCircled } from "react-icons/rx";
import { removeWishListItem } from '../../store/slices/wishListReducer';

export default function WishListItems({ productId, title, rating, price, imageUrl, quantity }) {
    const dispatch = useDispatch();
    return (
        <div className="cart-item-container">
            <div className="cart-item">
                <img src={imageUrl} alt={title} />
                <div>
                    <h3>{title}</h3>
                    <p>{rating} ★ ★ ★ ★</p>
                </div>
            </div>
            <div className="item-price">${price}</div>
            <div className="item-quantity">
            </div>
            <div>
                <RxCrossCircled
                    onClick={() => {
                        dispatch(removeWishListItem(productId))
                    }}
                />
            </div>
        </div>
    )
}
