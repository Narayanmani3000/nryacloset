import React from 'react'
import Home from './pages/Home'
import Contact from './pages/Contact'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ProductDetails } from './components/ProductDetails'
import data from './data.js'
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import AdminOrders from "./pages/AdminOrders";
const App = () => {

return (

    
<BrowserRouter>
<Routes>
    <Route path='/' element={<Home data={data}/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/product/:id' element={<ProductDetails data={data}/>}/>
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/payment-success" element={<PaymentSuccess />} />
    <Route path="/admin-orders" element={<AdminOrders />} />
</Routes>

</BrowserRouter>

)

}


export default App