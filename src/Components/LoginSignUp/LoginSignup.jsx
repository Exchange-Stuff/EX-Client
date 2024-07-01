
import React, {useState} from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import googleAuthConfig from '../../config/googleAuthConfig';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import google_icon from '../Assets/google.jpg';
import logo from '../Assets/logo.png';
import {Button, Checkbox, Form, Input} from 'antd';
import {GoogleOutlined} from '@ant-design/icons';

export const LoginSignup = ({handleCloseModal}) => {
	const client_id = googleAuthConfig.clientId;
	const navigate = useNavigate();

	const handleGoogleLoginSuccess = async (response) => {
		var userInfo = jwtDecode(response.credential);
		console.log('Login Success:', userInfo);

		navigate('/homepage');
	};

	const handleGoogleLoginFail = (response) => {
		console.log('Login Fail:', response);
	};

	const handleGoogleButtonClick = () => {
		const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?

export const LoginSignup = ({ handleCloseModal }) => {
  const handleGoogleButtonClick = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
access_type=online
&client_id=41073021794-d4irfbi6nnopdq1dkgm6otrcidns9110.apps.googleusercontent.com
&redirect_uri=http://localhost:3000/blank
&response_type=code
&scope=openid%20profile%20email
&prompt=consent`;
		window.location.href = googleAuthUrl;
	};

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
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

				<span className="close" onClick={handleCloseModal}>
					&times;
				</span>
				<div className="header">
					<div className="text">Đăng nhập</div>
					<div className="underline"></div>
				</div>

				<Form
					name="basic"
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
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

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Checkbox>Remember me</Checkbox>
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
	);
};

export default LoginSignup;
