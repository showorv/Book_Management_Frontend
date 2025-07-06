
import {Header} from "./components/layout/Header"
import './App.css'
import { Outlet } from "react-router"
import { Footer } from "./components/layout/Footer"
import {Toaster} from "sonner"

function App() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    <Toaster position="top-right"/>
    </>
  )
}

export default App
