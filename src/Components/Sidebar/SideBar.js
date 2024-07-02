import React, {useEffect} from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import {Menu, Button} from 'antd';
import {
	LogoutOutlined,
	UserAddOutlined,
	AlignLeftOutlined,
	FileTextOutlined,
	DatabaseOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from '@ant-design/icons';
import {useSelector} from 'react-redux';

export const SideBar = () => {
	const isChange = useSelector((state) => state.authen.isChange);
	const [collapsed, setCollapsed] = React.useState(true);

	if (user === undefined) return null;
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
				<Menu.SubMenu
					title="Dashboard"
					icon={<AlignLeftOutlined />}
					className="sidebar_menu_item"
				>
					<Menu.Item key="5" icon={<FileTextOutlined />}>
						<Link to="/dashboard/project">Project</Link>
					</Menu.Item>

					<Menu.Item key="6" icon={<DatabaseOutlined />}>
						<Link to="/dashboard/task">Task</Link>
					</Menu.Item>

					<Menu.Item key="7" icon={<UserAddOutlined />}>
						<Link to="/dashboard/user">User</Link>
					</Menu.Item>
				</Menu.SubMenu>

				<Menu.Item key="2" icon={<FileTextOutlined />} className="sidebar_menu_item">
					<Link to="/project">Project</Link>
				</Menu.Item>

				<Menu.Item key="3" icon={<UserAddOutlined />} className="sidebar_menu_item">
					<Link to="/user">User</Link>
				</Menu.Item>

				<Menu.Item
					key="4"
					icon={<LogoutOutlined />}
					className="sidebar_menu_item"
					danger={true}
				>
					<Link to="/logout">Log out</Link>
				</Menu.Item>
			</Menu>
		</div>
	);
};
