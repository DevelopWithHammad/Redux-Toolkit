import React, { useState } from 'react';
import Product from '../components/Product';
import { useGetProductsQuery } from '../services/apiServices';
import { CiCirclePlus } from "react-icons/ci";
import Modal from '../components/Modal';



export default function Home() {
  const [modal, setModal] = useState(false);
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className='flex items-center justify-end pr-12 mt-4 gap-2 cursor-pointer'
        onClick={() => setModal(true)}>
        <CiCirclePlus className='text-xl' />
        <button>
          Add a product
        </button>
      </div>
      {modal && <div className="fixed z-[1] w-full h-full backdrop-blur-sm top-0 left-0"></div>}
      {modal && <Modal setModal={setModal} />}
      <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-12 py-12">
        {products.map(({ id, title, rating, price, image, category, description }) => (
          <Product
            key={id}
            productId={id}
            title={title}
            rating={rating.rate}
            price={price}
            imageUrl={image}
            category={category}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
