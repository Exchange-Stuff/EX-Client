import React, {useState} from 'react';
import './LoginSignup.css';
import {jwtDecode} from 'jwt-decode';
import {Button, Form, Input, Row} from 'antd';
import {GoogleOutlined} from '@ant-design/icons';
import {googleAuthUrl} from '../../utils';
import {useDispatch} from 'react-redux';
import {loginByAdmin, loginByModerator} from '../../redux/slices/authenSlice';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

export const LoginSignup = ({handleCloseModal}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [selectedUserType, setSelectedUserType] = useState('user');

	const handleGoogleButtonClick = () => {
		window.location.href = googleAuthUrl;
	};

	const onFinish = (values) => {
		console.log(values);
		if (selectedUserType === 'moderator') {
			dispatch(
				loginByModerator({
					username: values.username,
					password: values.password,
				})
			).then((res) => {
				console.log(`res`, res);
				if (res.error) {
					toast.error(`${res.payload.error.message}`);
				} else {
					// save token to local storage
					localStorage.setItem('accessToken', res.payload.value);
					localStorage.setItem('role', 'moderator');
					toast.success('Đăng nhập thành công');
					window.location.href = '/product';
				}
			});
		}
		if (selectedUserType === 'admin') {
			dispatch(
				loginByAdmin({
					username: values.username,
					password: values.password,
				})
			).then((res) => {
				console.log(`res`, res);
				if (res.error) {
					toast.error(`${res.payload.error.message}`);
				} else {
					// save token to local storage
					localStorage.setItem('accessToken', res.payload.value);
					localStorage.setItem('role', 'admin');
					toast.success('Đăng nhập thành công');
					window.location.href = '/user';
				}
			});
		}
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<img
					src="/images/logo.png"
					alt="logo"
					style={{
						width: '50px',
						height: '50px',
					}}
				/>

				<div className="header">
					<div className="text">Đăng nhập</div>
					<div className="underline"></div>
				</div>

				<Row
					className="login-selected"
					style={{
						maxWidth: 600,
					}}
				>
					<Button
						style={{
							backgroundColor: selectedUserType === 'user' ? '#ff9a02' : 'white',
							color: selectedUserType === 'user' ? 'white' : 'black',
						}}
						onClick={() => setSelectedUserType('user')}
					>
						Người dùng
					</Button>

					<Button
						style={{
							backgroundColor: selectedUserType === 'moderator' ? '#ff9a02' : 'white',
							color: selectedUserType === 'moderator' ? 'white' : 'black',
						}}
						onClick={() => setSelectedUserType('moderator')}
					>
						Quản trị viên
					</Button>

					<Button
						style={{
							backgroundColor: selectedUserType === 'admin' ? '#ff9a02' : 'white',
							color: selectedUserType === 'admin' ? 'white' : 'black',
						}}
						onClick={() => setSelectedUserType('admin')}
					>
						Chủ cửa hàng
					</Button>
				</Row>

				<div className="login-form">
					{' '}
					{selectedUserType === 'user' ? (
						<Button
							className="login-page-google-button"
							onClick={handleGoogleButtonClick}
							// make icon color red
							icon={<GoogleOutlined style={{color: 'red'}} />}
						>
							Đăng nhập với Google
						</Button>
					) : (
						<Form
							name="basic"
							style={{
								maxWidth: 600,
							}}
							initialValues={{
								remember: true,
							}}
							onFinish={onFinish}
							autoComplete="off"
						>
							<Form.Item
								label="Username"
								name="username"
								rules={[
									{
										required: true,
										message: 'Please input your username!',
									},
								]}
							>
								<Input placeholder="Điền username của bạn" />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
							>
								<Input.Password placeholder="Điền mật khẩu của bạn " />
							</Form.Item>

							<Form.Item>
								<Button htmlType="submit" className="login-page-form-button">
									Đăng nhập
								</Button>
							</Form.Item>
						</Form>
					)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default LoginSignup;
