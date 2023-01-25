import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import UserItems from "./pages/UserItems";
import Item from "./pages/ItemPage";
import CreateProduct from "./pages/CreateProduct"
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import {MainCategoryList, SubApparelList, SubElectronicsList, SubHousewareList} from './utils/CategoryData';
import  Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Categories from "./pages/Categories";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes nested in here are protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/your-products" element={<UserItems />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/apparel" element={<Categories maincategory={MainCategoryList[0]} subcategories={SubApparelList} />} />
          <Route path="/electronics" element={<Categories maincategory={MainCategoryList[1]} subcategories={SubElectronicsList} />} />
          <Route path="/houseware" element={<Categories maincategory={MainCategoryList[2]} subcategories={SubHousewareList} />} />
          <Route path="/chat" element={<Chat />} />
        </Route>

        <Route path="/*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
