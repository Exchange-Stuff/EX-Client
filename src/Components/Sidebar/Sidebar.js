import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import {Menu, Button} from 'antd';
import {
	UserOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	ProductOutlined,
	MoneyCollectOutlined,
} from '@ant-design/icons';

export const SideBar = () => {
	const [collapsed, setCollapsed] = React.useState(false);

	// toggle sidebar
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div className="Sidebar col-md-12 d-none d-md-block">
			<Button
				onClick={toggleCollapsed}
				style={{marginBottom: 16}}
				className="sidebar_collapse"
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
			</Menu>
		</div>
	);
};
