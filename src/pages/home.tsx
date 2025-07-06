import { useNavigate } from "react-router";


export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/books'); // Or '/book-list' depending on your routing
  };
 

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl text-center p-6 bg-white dark:bg-gray-200 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 playfair">
          Welcome to the Book House 📚
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-8">
          Check out the books and borrow your favorite reads.
        </p>
        <button
          onClick={handleNavigate}
          className="px-6 py-2 bg-blue-950 hover:bg-blue-700 text-white rounded-xl text-sm md:text-base transition duration-200 cursor-pointer"
        >
          Click to See the Book List
        </button>
      </div>
    </main>
  );
}
