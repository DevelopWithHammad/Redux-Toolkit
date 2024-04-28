import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
            providesTags: ["Products"],
            transformResponse: (products) => products.reverse(),
        }),
        addProducts: builder.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
            invalidatesTags: ["Products"],
            async onQueryStarted(product, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiService.util.updateQueryData("getProducts", undefined, (draft) => {
                        draft.unshift({ id: product.length + 1, ...product })
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo()
                    throw error
                }
            }
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                console.log("id ==>", id);
                const patchResult = dispatch(
                    apiService.util.updateQueryData("getProducts", undefined, (productList) => {
                        const productIndex = productList.findIndex((el) => el.id === id);
                        productList.splice(productIndex, 1)
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...updatedProduct }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: updatedProduct,
            }),
            invalidatesTags: ["Products"],
            async onQueryStarted(
                { id, ...updatedProduct },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    apiService.util.updateQueryData("getProducts", undefined, (ProductList) => {
                        const productIndex = ProductList.findIndex((el) => el.id === id);
                        ProductList[productIndex] = { ...ProductList[productIndex], ...updatedProduct };
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    })
})
export const { useGetProductsQuery, useAddProductsMutation, useDeleteProductsMutation, useUpdateProductMutation } = apiService;


