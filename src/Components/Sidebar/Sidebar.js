import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import {Menu, Button, Layout} from 'antd';
import {
	UserOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	ProductOutlined,
	MoneyCollectOutlined,
	LogoutOutlined,
	ExclamationOutlined,
} from '@ant-design/icons';

const {Content, Sider} = Layout;
const {SubMenu} = Menu;

const SideBar = ({children}) => {
	const [collapsed, setCollapsed] = React.useState(false);

	// toggle sidebar
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const handleLogout = () => {
		if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('role');
			window.location.href = '/login';
		}
	};

	return (
		<Layout style={{minHeight: '100vh'}}>
			<Sider collapsed={collapsed} width={200} className="site-layout-sidebar">
				<Button
					onClick={toggleCollapsed}
					style={{
						marginTop: 50,
						backgroundColor: '#1890ff',
						color: 'white',
						border: 'none',
					}}
				>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</Button>

				<Menu mode="inline" className="menu" inlineCollapsed={collapsed}>
					<Menu.Item key="1" icon={<ProductOutlined />}>
						<Link to="/homepage">Dashboard</Link>
					</Menu.Item>

					<Menu.Item key="2" icon={<ProductOutlined />}>
						<Link to="/product">Sản phẩm</Link>
					</Menu.Item>

					<Menu.Item key="3" icon={<UserOutlined />}>
						<Link to="/user">Tài khoản</Link>
					</Menu.Item>

					<Menu.Item key="4" icon={<MoneyCollectOutlined />}>
						<Link to="/financial">Quản lý tài chính</Link>
					</Menu.Item>

					<SubMenu key="sub1" icon={<ExclamationOutlined />} title="Quản lý tố cáo">
						<Menu.Item key="sub1-1" icon={<UserOutlined />}>
							<Link to="/userBan">Người dùng</Link>
						</Menu.Item>

						<Menu.Item key="sub1-2" icon={<ProductOutlined />}>
							<Link to="/productBan">Product</Link>
						</Menu.Item>
					</SubMenu>

					<Menu.Item
						key="5"
						icon={
							<LogoutOutlined
								style={{
									color: 'red',
								}}
							/>
						}
						onClick={handleLogout}
					>
						Đăng xuất
					</Menu.Item>
				</Menu>
			</Sider>

			<Layout>
				<Content
					className="site-layout-background"
					style={{
						padding: 24,
						margin: 0,
						minHeight: 280,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default SideBar;
