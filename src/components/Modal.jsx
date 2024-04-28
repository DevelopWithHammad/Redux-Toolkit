import React, { useState } from 'react'
import { useAddProductsMutation, useGetProductsQuery, useUpdateProductMutation } from '../services/apiServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ setModal, productTitle, productId, productPrice, productImageUrl, productCategory, productDescription, update }) => {
    const [category, setCategory] = useState(productCategory);
    const [description, setDescription] = useState(productDescription);
    const [imageUrl, setImageUrl] = useState(productImageUrl);
    const [price, setPrice] = useState(productPrice);
    const [title, setTitle] = useState(productTitle);

    const { data: products } = useGetProductsQuery();
    const [addProduct] = useAddProductsMutation();
    const [updateProduct] = useUpdateProductMutation();

    const productData = {
        category,
        description,
        id: (products.length + 1).toString(),
        image: imageUrl,
        price,
        rating: {
            rate: 0.0,
            count: 0
        },
        title,
    }

    const productDataToUpdated = {
        category,
        description,
        productId: productId,
        image: imageUrl,
        price,
        title,
    }

    const categories = products.map((product) => {
        return product.category
    });

    const categoryCounts = categories.reduce((acc, curr) => {
        if (acc[curr]) {
            acc[curr]++;
        } else {
            acc[curr] = 1;
        }
        return acc;
    }, {});
    const categoryTitle = Object.keys(categoryCounts);

    return (
        <div id="modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-12 left-[35%] z-50 justify-center items-center w-full max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white border rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                           {!update ? "Add a Product" : "Update a Product"}
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal"
                            onClick={() => {
                                setModal(false)
                            }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">

                        <div className='mt-3'>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product title</label>
                            <input type="text" value={title} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Add a title of your product" required
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product description</label>
                            <input type="text" value={description} name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Add a description of your product" required
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product price</label>
                            <input type="number" value={price} name="price" id="price" placeholder="Add a price of your product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none" required
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
                            <input type="url" name="image" value={imageUrl} id="image" placeholder="Add a image url of your product" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none" required
                                onChange={(e) => {
                                    setImageUrl(e.target.value)
                                }}
                            />
                        </div>
                        <div className='flex items-center gap-3 mt-3'>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                            <select name="category" value={category} id="category" className='border p-2 text-sm'
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                }}
                            >
                                <option value="Select category">Select Category</option>
                                {categoryTitle.map((category) => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {!update ? (<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
                            onClick={async () => {
                                try {
                                    await addProduct(productData).unwrap();
                                    toast.success("Product added successfully!");
                                    setModal(false)
                                } catch (error) {
                                    toast.error("Something went wrong");
                                    setModal(false)
                                }
                            }}
                        >Add a Product</button>)
                            :
                            (<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
                                onClick={async () => {
                                    try {
                                        console.log(productId)
                                        await updateProduct({id: productId, ...productDataToUpdated}).unwrap();
                                        toast.success("Product updated successfully!");
                                        setModal(false)
                                    } catch (error) {
                                        toast.error("Something went wrong");
                                        setModal(false)
                                    }
                                }}
                            >Update Product</button>)}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Modal
