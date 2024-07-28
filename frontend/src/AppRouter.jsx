import { Navigate, Route, Routes,} from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LoginLayout from "./layouts/loginLayout";

import SearchPage from "./pages/SearchPage";
import AddRestro from "./components/AddRestro";
import Admin from "./pages/Admin";
import DetailsPage from "./components/DetailsPage";
import UpdateRestro from "./components/UpdateRestro";
import UpdateDetailPage from "./components/UpdateDetailPage";
import  Cart  from "./components/Cart";
import OrderConfermation from "./components/OrderConfermation";
import Report from "./components/Report";




const AppRouter = () => {  
  return (
    <Routes>
      <Route path="/home" element={<Layout><HomePage /></Layout>}/>
      <Route path="/login" element={<LoginLayout><Login /></LoginLayout>}/>
      <Route path="/Signup" element={<LoginLayout><Signup /></LoginLayout>}/>
      <Route path="/search-results/:city" element = {<Layout hero ={false} ><SearchPage /> </Layout>} />
      <Route path="/details/:restaurantName/:id" element={<Layout hero ={false}><DetailsPage /> </Layout>} />
      <Route path="/update" element={<Layout hero ={false}><UpdateRestro /> </Layout>} />
      <Route path="/report" element={<Layout hero ={false}><UpdateRestro /> </Layout>} />
      <Route path="/reportlist/:restaurantName" element={<Layout hero ={false}><Report /> </Layout>} />
      <Route path="/admin" element ={ <Admin /> } />
      <Route path="/add" element={<Layout hero ={false}><AddRestro /> </Layout>} />
      <Route path="/update/:restaurantname/:id" element={<Layout hero ={false}><UpdateDetailPage /> </Layout>} />
      <Route path="/cart" element={<Layout hero ={false}><Cart /> </Layout>} />
      <Route path="/order" element={<Layout hero ={false}><OrderConfermation /> </Layout>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
   
  );
};

export default AppRouter;
