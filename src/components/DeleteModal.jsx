import React, { useState } from 'react'
import { useDeleteProductsMutation } from "../services/apiServices";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ setDeleteModal, setMenu, productId }) => {
    const [deleteProduct] = useDeleteProductsMutation();

    return (
        <div id="modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-44 left-[35%] z-50 justify-center items-center w-full">
            <div className="relative max-w-md max-h-full bg-white pt-4 pb-8 border rounded-lg shadow-xl dark:bg-gray-700">
                <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                    Are you sure?
                </h3>
                <div className='w-full flex items-center justify-around mt-12'>
                    <button className='bg-black px-3 py-1 text-white rounded-lg'
                        onClick={async () => {
                            try {
                                await deleteProduct(productId).unwrap();
                                toast.success("Product deleted successfully!");
                                setDeleteModal(false)
                                setMenu(false)
                            } catch (error) {
                                toast.error("Something went wrong");
                                setMenu(false)
                                setDeleteModal(false)
                            }
                        }}>
                        Delete</button>
                    <button className='px-3 py-1 border border-black rounded-lg'
                        onClick={() => {
                            setDeleteModal(false)
                        }}
                    >Cancel</button>
                </div>
            </div>
        </div >
    )
}

export default DeleteModal
