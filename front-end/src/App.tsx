import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/Product";
import LoginPage from "./pages/Login";
import CategoryPage from "./pages/Category";
import SalesPage from "./pages/Sales";
import PosPage from "./pages/Pos";
import ProfilePage from "./pages/Profile";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path="/categories" element={<CategoryPage/>}/>
          <Route path="/sales" element={<SalesPage/>}/>
          <Route path="/pos" element={<PosPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}