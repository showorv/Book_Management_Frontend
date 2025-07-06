import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import type { iBook } from "@/types";

export const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id);
  const book: iBook | null = data?.data || null;

  if (isLoading) return <p>Loading...</p>;
  if (isError || !book) return <p>Book not found</p>;

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4">
       <h2 className="text-xl md:text-2xl m-5 font-bold playfair ">Your Book Details</h2>
      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
       
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2">
            <h2 className="font-bold">Title:</h2>
            <p>{book.title}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">Author:</h2>
            <p>{book.author}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">Genre:</h2>
            <p>{book.genre}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">ISBN:</h2>
            <p>{book.isbn}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">Description:</h2>
            <p >{book.description}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">Copies:</h2>
            <p>{book.copies}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="font-bold">Available:</h2>
            <p>{book.available ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
