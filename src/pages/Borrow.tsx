
import { useGetBorrowBookQuery } from "@/redux/api/baseApi"
import type { iBorrow } from "@/types";


export const Borrow = () => {

  const {data, isLoading, isError} = useGetBorrowBookQuery(undefined)

  const borrow = data?.data || []

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching borrow summary</p>;


  return (
    <div className='max-w-7xl mx-auto p-6 min-h-screen'>
        
        <h2 className='text-md md:text-2xl font-bold mt-10 mb-5'>Borrow Summary</h2>
       
        <div className='overflow-x-auto shadow-md shadow-white sm:rounded '>
            <table className='min-w-full text-left text-gray-200'>
                <thead className='bg-gray-600 text-xs uppercase text-gray-200'>
                    <tr>
                        <th className='py-2 px-4'>Title</th>
                        <th className='py-2 px-4'>ISBN</th>
                        <th className='py-2 px-4'>Total Quantity</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {borrow.length>0?
                    (
                      borrow.map((product:iBorrow, index: number)=>{
                            return(
                                <tr key={index}
                                className='border-b hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' >
                                    <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product?.book?.title}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product?.book?.isbn}</td>
                                    <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.totalQuantity}</td>

                                    
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

    </div>
  )
}
