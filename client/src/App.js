import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Category from "./pages/category/Category"
import Register from "./pages/register/register"
import axios from "axios";
import FeaturedPage from "./pages/featuredPage/FeaturedPage";
axios.defaults.baseURL = "http://localhost:8800/api";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        {/* <Route path="/hotels/:id" element={<Hotel/>}/> */}
        <Route path="/category" element={<Category/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/featuredPage" element={< FeaturedPage/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
