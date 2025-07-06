

import { AddBook } from '@/components/book/AddBook'
import { UpdateBook } from '@/components/book/UpdateBook'
import { AddBorrow } from '@/components/borrow/AddBorrow'
import { Button } from '@/components/ui/button'

import { useDeleteBookMutation, useGetBookQuery } from '@/redux/api/baseApi'

import type { iBook } from '@/types'
import {  EyeIcon, Trash2} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const Book = () => {
 const navigate = useNavigate()
 const [page, setPage] = useState(1);
 const limit =5

 const { data, isLoading, isError } = useGetBookQuery({page, limit});
 const [deleteBook, {isLoading: isDeleting}] = useDeleteBookMutation();
 const books = data?.data || [];
 const meta = data?.meta;


const totalPage = meta?.totalPages
 


    if(isLoading){
        return <p>Loading...</p>
    }
    
      if(isError){
        return <p>Erroor in addBook book</p>
      }
    if(isDeleting){
        return <p>Loading...</p>
    }
     if(isError){
        return <p>Erroor in addBook book</p>
      }
    const  handleDeleteBook=(id: string)=>{
        if(window.confirm("Are you sure to delete this user?")){
        
            deleteBook(id).unwrap()
            toast.success("Book deleted successfully")
        }
       

    }

    
  return (
    <div className='max-w-7xl mx-auto p-6 min-h-screen'>
        <div className='flex justify-between items-center mb-6'>
        <h2 className='text-md md:text-2xl font-bold '>Book Mangement</h2>
        <AddBook />
        </div>
        <div className='overflow-x-auto shadow-md shadow-white sm:rounded '>
            <table className='min-w-full text-left text-gray-200'>
                <thead className='bg-gray-600 text-xs uppercase text-gray-200'>
                    <tr>
                        <th className='py-2 px-4'>Title</th>
                        <th className='py-2 px-4'>Author</th>
                        <th className='py-2 px-4'>Genre</th>
                        <th className='py-2 px-4'>ISBN</th>
                        <th className='py-2 px-4'>Copies</th>
                        <th className='py-2 px-4'>Availability</th>
                        <th className='py-2 px-4'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {books.length>0?
                    (
                      books.map((product:iBook)=>{
                            return(
                                <tr key={product._id}
                                className='border-b hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' >
                                    <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product.title}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.author}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.genre}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.isbn}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.copies}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.available? "Yes": "No"}</td>
                                    <td className='py-2 px-4 flex gap-2 text-gray-950 dark:text-gray-200'>
                                        <Button className='cursor-pointer hover:scale-50' variant={'outline'} onClick={()=> navigate(`/books/${product._id}`)}><EyeIcon/></Button>
                                     <UpdateBook book={product}/>
                                        <Button className='cursor-pointer hover:scale-50' variant={'outline'} onClick={()=> handleDeleteBook(product._id)}><Trash2 className='text-red-500'/></Button>
                                    
                                    <AddBorrow book={product}/>
                                    </td>
                                    
                                </tr>
                            )
                        })
                    ):(
                        <tr>
                            <td colSpan={7} className='p-2 text-center text-gray-200'>No books avaiable</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-black dark:text-white text-sm md:text-md">
          Page {page} of {totalPage}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

    </div>
  )
}