import React, {useEffect} from 'react';
import './App.css';
import {LoginSignup} from './Components/LoginSignUp/LoginSignup.jsx';
import {HomePage} from './Components/HomePage/HomePage';
import {PostProduct} from './Components/PostProduct/PostProduct';
import {UserPage} from './Pages/Admin/UserPage/UserPage';
import {ProductDetail} from './Components/ProductDetail/ProductDetail.jsx';
import {Payment} from './Components/PaymentPage/Payment.jsx';
import {Blank} from './Components/Blank/Blank.jsx';
import {Profile} from './Components/Profile/Profile.jsx';
//import Header from "./Components/Header/Header";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FinancialPage from './Pages/Admin/FinancialPage/financial.page.js';
import {OrderProduct} from './Components/OrderProduct/OrderProduct.jsx';
import {OrderPage} from './Components/OrderPage/OrderPage.jsx';
import {SideBar} from './Components/Sidebar/Sidebar.js';

function App() {
	const role = localStorage.getItem('role');

	return (
		<div className="App">
			<BrowserRouter>
				{role === 'admin' || role === 'moderate' ? <SideBar /> : null}

				{role === 'admin' ? (
					<Routes>
						<Route path="/*" element={<UserPage />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/user" element={<UserPage />} />
						<Route path="/financial" element={<FinancialPage />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				) : role === 'moderate' ? (
					<Routes>
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/product" element={<HomePage />} />
					</Routes>
				) : (
					<Routes>
						<Route path="/*" element={<HomePage />} />
						<Route path="/homepage" element={<HomePage />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/postproduct" element={<PostProduct />} />
						<Route path="/productdetail/:id" element={<ProductDetail />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/blank" element={<Blank />} />
						<Route path="/orderproduct/:id" element={<OrderProduct />} />
						<Route path="/orderpage" element={<OrderPage />} />
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
