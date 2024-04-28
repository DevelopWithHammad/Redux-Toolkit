import { useDispatch } from "react-redux";
import { addCartItem } from "../../store/slices/cartReducer"
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { addWishListItem, removeWishListItem } from "../../store/slices/wishListReducer";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";

export default function Product({ productId, title, rating, price, imageUrl, category, description }) {

  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [update, setUpdate] = useState(false);


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
  function toggleMenu() {
    setMenu(!menu)
  }

  return (
    <div className="relative">
      {modal && <div className="fixed z-[1] w-full h-full backdrop-blur-sm top-0 left-0"></div>}
      {modal && <Modal
        setModal={setModal}
        productId={productId}
        productTitle={title}
        productRating={rating}
        productPrice={price}
        productImageUrl={imageUrl}
        productCategory={category}
        productDescription={description}
        update={update}
      />}
      {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} setMenu={setMenu} productId={productId} />}
      <div className="relative">
        <BsThreeDotsVertical className="absolute top-1 right-1 cursor-pointer" onClick={toggleMenu} />
        {menu && <div className="flex flex-col gap-1 border w-16 py-1 absolute right-5 top-1 bg-gray-100">
          <button className="hover:bg-gray-200 py-1"
            onClick={() => {
              setModal(true);
              setMenu(false);
              setUpdate(true)
            }}
          >Update</button>
          <button className="hover:bg-gray-200 py-1"
            onClick={() => {
              setMenu(false)
              setDeleteModal(true)
            }}>
            Delete</button>
        </div>}
      </div>
      <div className="product border px-4 py-6">
        <div className="product-image w-36 mx-auto h-64">
          <img src={imageUrl} alt={title} className="" />
        </div>
        <div className="flex flex-col">
          <div className="title-container flex items-center">
            <h3 className="font-semibold text-lg leading-7 mt-2">
              <a href="#">{title}</a>
            </h3>
          </div>
          <div className="price-rating-container flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <p className="rating">{+rating} ★ ★ ★ ★</p>
              <p className="price">${price}</p>
            </div>

            {wishList && <IoIosHeartEmpty
              onClick={() => {
                toggleWishList(setWishList(false))
                toast.success("Item added to wishlist!");

              }}
              className="text-2xl cursor-pointer"
            />}
            {!wishList && < IoIosHeart onClick={() => {
              toggleWishList(setWishList(true))
              toast.success("Item remove from wishlist!");
            }}
              className="text-2xl cursor-pointer"
            />}
          </div>
          <div className="cta-container mt-12 flex items-center gap-2">
            <button onClick={() => {
              dispatch(addCartItem({ productId, title, rating, price, imageUrl }))
              toast.success("Item added to cart !");
            }} className="w-1/2 font-semibold bg-gray-200 py-3">Add to Cart</button>
            <button className="w-1/2 font-semibold bg-gray-200 py-3">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
