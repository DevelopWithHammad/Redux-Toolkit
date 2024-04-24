import React from 'react'
import { useSelector } from 'react-redux';
import WishListItems from '../components/WishListItems';

const WishList = () => {
    const wishListItems = useSelector(state => state.wishList);
    console.log("wishListItems =====>", wishListItems);
    return (
        <div>
            {wishListItems.map(({ productId, title, rating, price, imageUrl, quantity }) => (
                <WishListItems
                    key={productId}
                    productId={productId}
                    title={title}
                    price={price}
                    quantity={quantity}
                    imageUrl={imageUrl}
                    rating={rating}
                />
            ))}
        </div>
    )
}

export default WishList
