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
import Header from './Components/Header/Header';
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
import UserBanPage from './Pages/Admin/UserBanPage/UserBanPage.jsx';
import ChatPage, {Chat} from './Components/ChatPage/ChatPage.jsx';
import ProductBanPage from './Pages/Admin/ProductBanPage/ProductBanPage.jsx';
import Dashboard from './Pages/Admin/DashBoardPage/Dashboard.jsx';
import {useDispatch} from 'react-redux';
import {getResourceAuthor} from './redux/slices/authenSlice.js';
import {set} from 'date-fns';
import {OrderDetail} from './Components/OrderDetail/OrderDetail.jsx';
import {OrderForSeller} from './Components/OrderForSeller/OrderForSeller.jsx';

function App() {
	const dispatch = useDispatch();

	const [role, setRole] = React.useState('');

	useEffect(() => {
		if (!localStorage.getItem('refreshToken')) {
			setRole('');
		} else {
			dispatch(
				getResourceAuthor({
					resource: 'AdminSidebar',
				})
			).then((result) => {
				if (!result.payload) {
					setRole('');
				} else {
					if (result.payload === true) {
						setRole('admin');
					} else {
						dispatch(
							getResourceAuthor({
								resource: 'ModerateSidbar',
							})
						).then((result) => {
							if (result.payload === true) {
								setRole('moderator');
							} else {
								setRole('user');
							}
						});
					}
				}
			});
		}
	}, [dispatch]);

	return (
		<div className="App">
			<BrowserRouter>
				{role === 'admin' ? (
					<SideBar>
						<Routes>
							<Route path="/*" element={<Dashboard />} />
							<Route path="/user" element={<UserPage />} />
							<Route path="/financial" element={<FinancialPage />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/product" element={<ProductPage />} />
							<Route path="/userBan" element={<UserBanPage />} />
							{/* <Route path="/productBan" element={<ProductBanPage />} /> */}
							<Route path="/dashboard" element={<Dashboard />} />
						</Routes>
					</SideBar>
				) : role === 'moderator' ? (
					<SideBar>
						<Routes>
							<Route path="/*" element={<ProductPage />} />
							<Route path="/userBan" element={<UserBanPage />} />
							<Route path="/product" element={<ProductPage />} />
							<Route path="/financial" element={<FinancialPage />} />
						</Routes>
					</SideBar>
				) : role === 'user' ? (
					<>
						<Header />
						<Routes>
							<Route path="/*" element={<HomePage />} />
							<Route path="/homepage" element={<HomePage />} />
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
							<Route path="/chatpage" element={<ChatPage />} />
							<Route path="/orderdetail/:id" element={<OrderDetail />} />
							<Route path="/orderForSeller" element={<OrderForSeller />} />
						</Routes>
					</>
				) : (
					<Routes>
						<Route path="/*" element={<HomePage />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/blank" element={<Blank />} />
					</Routes>
				)}
				<ToastContainer limit={3} />
			</BrowserRouter>
		</div>
	);
}

export default App;
