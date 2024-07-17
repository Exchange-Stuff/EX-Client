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
import SideBar from './Components/Sidebar/Sidebar.js';
import {Search} from './Components/Search/Search.jsx';
import ProductPage from './Pages/Admin/ProductPage/product.page.js';
import {ToastContainer} from 'react-toastify';
import {FinancicalTicket} from './Components/FinancialTicket/FinancicalTicket.jsx';
import {ProductByCategory} from './Components/ProductByCategory/ProductByCategory.jsx';
import {TransactionHistory} from './Components/TransactionHistory/TransactionHistory.jsx';

function App() {
	const role = localStorage.getItem('role');
	const token = localStorage.getItem('accessToken');

	return (
		<div className="App">
			<BrowserRouter>
				{role === 'admin' ? (
					<SideBar>
						<Routes>
							<Route path="/*" element={<UserPage />} />
							<Route path="/login" element={<LoginSignup />} />
							<Route path="/user" element={<UserPage />} />
							<Route path="/financial" element={<FinancialPage />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/product" element={<ProductPage />} />
						</Routes>
					</SideBar>
				) : role === 'moderator' ? (
					<SideBar>
						<Routes>
							<Route path="/*" element={<ProductPage />} />
							<Route path="/login" element={<LoginSignup />} />
							<Route path="/user" element={<UserPage />} />
							<Route path="/product" element={<ProductPage />} />
							<Route path="/financial" element={<FinancialPage />} />
						</Routes>
					</SideBar>
				) : (
					<Routes>
						<Route path="/*" element={<LoginSignup />} />
						<Route path="/homepage" element={<HomePage />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/postproduct" element={<PostProduct />} />
						<Route path="/productdetail/:id" element={<ProductDetail />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/blank" element={<Blank />} />
						<Route path="/orderproduct/:id" element={<OrderProduct />} />
						<Route path="/orderpage" element={<OrderPage />} />
						<Route path="/search/:keyword" element={<Search />} />
						<Route path="/financicalTicket" element={<FinancicalTicket />} />
						<Route path="/productByCategory/:id" element={<ProductByCategory />} />
						<Route path="/transactionHistory" element={<TransactionHistory />} />
						<Route path="/profile/:id" element={<Profile />} />
					</Routes>
				)}
				<ToastContainer limit={3} />
			</BrowserRouter>
		</div>
	);
}

export default App;
