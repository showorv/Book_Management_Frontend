import { useState } from "react";
import { NavLink } from "react-router";
import { MdOutlineCancel } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { ModeToggle } from "../mode-toggle";
export const Header = () => {

  
  interface active {
    isActive: boolean;
  }

  const [hambarOpen, setHambarOpen] = useState(false);

  const handleHambarOpen = () => {
    setHambarOpen(!hambarOpen);
  };

  const active = ({ isActive }: active) =>
    `text-sm font-medium uppercase playfair transition-colors duration-200 ${
      isActive ? "text-blue-500" : "text-gray-900 dark:text-gray-200"
    }`;
  return (
    <header className="border-b bg-gray-100 dark:bg-gray-900">
      <nav className="flex justify-between items-center mx-4  md:mx-50 py-4">
        {/* logo  */}
        <div>
          <p className="font-medium playfair"><NavLink to="/">📚 Book-Management</NavLink> </p>
        </div>
        <button onClick={handleHambarOpen}>
          <CgMenuLeft className="h-5 w-5 md:hidden" />
        </button>
        {/* links */}

        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={active}>
            Home
          </NavLink>
          <NavLink to="/books" className={active}>
            All Books
          </NavLink>
          <NavLink to="/borrow-summary" className={active}>
            Borrow Summary
          </NavLink>
          <NavLink to="/books" className={active}>
            Add Book
          </NavLink>

          <ModeToggle />
        </div>
      </nav>

      {/* hambarOpen */}

      <div
        className={`fixed top-0 left-0  w-[15rem] sm:w-1/2 md:w-[32rem] h-full bg-gray-600 shadow-lg transform transition-transform duration-300 flex flex-col z-50 
     ${hambarOpen ? " translate-x-0" : " -translate-x-full"}`}
      >
        <div className="flex justify-end py-2 pr-4">
          <button onClick={handleHambarOpen}>
            <MdOutlineCancel className="h-6 w-6 text-gray-200 hover:text-gray-800 cursor-pointer" />
          </button>
        </div>

        {/* links */}

        <div className="flex flex-col space-y-6 justify-center items-center mt-10">
          <NavLink to="/" className={active} onClick={handleHambarOpen}>
            Home
          </NavLink>
          <NavLink to="/books" className={active} onClick={handleHambarOpen}>
            All Books
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={active}
            onClick={handleHambarOpen}
          >
            Borrow Summary
          </NavLink>
          <NavLink to="/books" className={active} onClick={handleHambarOpen}>
            Add Book
          </NavLink>
        </div>
      </div>
    </header>
  );
};
