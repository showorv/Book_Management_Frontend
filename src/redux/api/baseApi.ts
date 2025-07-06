import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        credentials: "include",
      }),
    tagTypes: ["book"],
    endpoints: (build)=>({
        getBook: build.query({
            query: ({page=1, limit=5})=>`/books?page=${page}&limit=${limit}`,
            providesTags: ["book"]
        }),
        getSingleBook: build.query({
            query: (id)=>`/books/${id}`,
            providesTags: ["book"]
        }),
        createBook: build.mutation({
            query: (data)=>({
                url: "/books",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["book"]
            
        }),
        updateBook: build.mutation({
            query: ({id, ...data})=>({
                url: `/books/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["book"]
            
        }),
        deleteBook: build.mutation({
            query: (id)=>({
                url: `/books/${id}`,
                method: "DELETE",
                
            }),
            invalidatesTags: ["book"]
            
        }),
       borrowBook: build.mutation({
            query: (data)=>({
                url: "/borrow",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["book"]
            
        }),
        getBorrowBook: build.query({
            query: ()=>"/borrow",
            providesTags: ["book"]
        }),

        })
    })


    export const { useGetBookQuery, useGetBorrowBookQuery, useBorrowBookMutation, useCreateBookMutation, useDeleteBookMutation,useUpdateBookMutation, useGetSingleBookQuery} = baseApi