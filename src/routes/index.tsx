import App from "@/App";
import { Book } from "@/pages/Book";
import { Borrow } from "@/pages/Borrow";
import { SingleBook } from "@/pages/SingleBook";
import { Home } from "@/pages/home";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: Home
            },
            {
                path: "/books",
                Component: Book
            },
            {
                path: "/books/:id",
                Component: SingleBook
            },
            {
                path: "/borrow-summary",
                Component: Borrow
            },
        ]
    },
    
])