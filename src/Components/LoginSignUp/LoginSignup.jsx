import React, {useState} from 'react';
import './LoginSignup.css';
import {Button, Form, Input, Row} from 'antd';
import {GoogleOutlined} from '@ant-design/icons';
import {googleAuthUrl} from '../../utils';
import {useDispatch} from 'react-redux';
import {loginByAdmin, loginByModerator} from '../../redux/slices/authenSlice';
import {toast, ToastContainer} from 'react-toastify';

export const LoginSignup = ({handleCloseModal}) => {
	const dispatch = useDispatch();

	const handleGoogleButtonClick = () => {
		window.location.href = googleAuthUrl;
	};

	const onFinish = (values) => {
		console.log(values);

		dispatch(
			loginByModerator({
				username: values.username,
				password: values.password,
			})
		).then((res) => {
			console.log(`res`, res);
			if (res.error) {
				if (res.payload) {
					toast.error(`${res.payload.error.message}`);
				} else {
					toast.error('Lỗi hệ thống');
				}
			} else {
				console.log(res.payload.value);
				// save token to local storage
				localStorage.setItem('accessToken', res.payload.value.accessToken);
				localStorage.setItem('refreshToken', res.payload.value.refreshToken);
				localStorage.setItem('role', 'admin');
				toast.success('Đăng nhập thành công');
				window.location.href = '/product';
			}
		});
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

				<div className="login-form">
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

					<Button
						className="login-page-google-button"
						onClick={handleGoogleButtonClick}
						// make icon color red
						icon={<GoogleOutlined style={{color: 'red'}} />}
					>
						Đăng nhập với Google
					</Button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default LoginSignup;
