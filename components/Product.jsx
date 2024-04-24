import { useDispatch } from "react-redux";
import { addCartItem } from "../store/slices/cartReducer"
import { IoIosHeartEmpty } from "react-icons/io";
import { addWishListItem, removeWishListItem } from "../store/slices/wishListReducer";
import { useState } from "react";

export default function Product({ productId, title, rating, price, imageUrl }) {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState(true);
  function toggleWishList() {
    if (wishList) {
      dispatch(addWishListItem({ productId, title, rating, price, imageUrl }))
    }
    else {
      dispatch(removeWishListItem(productId))
    }
  }
  return (
    <div className="product">
      <div className="product-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="title-container">
        <h3>
          <a href="#">{title}</a>
          <IoIosHeartEmpty
            onClick={() => {
              toggleWishList(setWishList(!wishList))
            }}
          />
        </h3>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button onClick={() => {
          dispatch(addCartItem({ productId, title, rating, price, imageUrl }))
        }}>Add to Cart</button>
        <button>Buy Now</button>
      </div>
    </div>
  )
}
