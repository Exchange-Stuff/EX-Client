import Header from '../Header/Header';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./ChatPage.css";
import { useEffect, useRef, useState } from "react";
import axios from '../../utils/axios.js';
import { jwtDecode } from 'jwt-decode';

const ChatPage = () => {
	const token = localStorage.getItem('accessToken');
	const decoded = jwtDecode(token);
    const senderId = decoded.nameid;
	const [isShowLogin, setIsShowLogin] = useState(false);
    const [connection, setConnection] = useState();
    const [listMsg, setListMsg] = useState([]);
    const [message, setMessage] = useState("");
    const [listGroupChat, setListGroupChat] = useState([]);
    const [receiverId, setReceiverId] = useState();
	const [groupId, setGroupId] = useState();
    const ref = useRef(null);

	const handleLoginClick = () => {
		setIsShowLogin(true);
	};
	useEffect(() => {
		async function getGroupChat() {
			const result = await axios.get(`/Chat/get-list-joined/${senderId}`);
			await connectChat(senderId);
			// console.log(JSON.parse(JSON.stringify(result.data.value)));
			const listGroup = JSON.parse(JSON.stringify(result.data.value));
			setListGroupChat(listGroup);
			const groupIdData = listGroup[0].id;
			setGroupId(groupIdData);
			const resultMsg = await axios.get(`/Chat/get-list-messages/${groupIdData}`);
			setListMsg(JSON.parse(JSON.stringify(resultMsg.data.value)));
		};
		getGroupChat();
	}, []);
	const connectChat = async (senderId) => {
		try {
			const conn = new HubConnectionBuilder().withUrl('http://localhost:5059/chat').build();
			conn.on('ReloadListJoin', (listGroup) => {
				setListGroupChat(JSON.parse(listGroup));
			});
			await conn.start();
			await conn.invoke("JoinChatGeneral", senderId);
			setConnection(conn);
		} catch (error) {
			console.log('try catch', error);
		}
	};

	const joinChatRoom = async (groupIdCheck) => {
		try {
			const conn = new HubConnectionBuilder().withUrl('http://localhost:5059/chat').build();
			conn.on('ReceiveMessage', (listMsg) => {
				const arrMess = JSON.parse(listMsg);
				console.log(arrMess);
				if (arrMess[0].groupChatId == groupIdCheck) {
					setListMsg(JSON.parse(listMsg));
				}
			});
			conn.on('ReloadListJoin', (listGroup) => {
				console.log(JSON.parse(listGroup));
				setListGroupChat(JSON.parse(listGroup));
			});
			await conn.start();
			await conn.invoke('JoinChatGeneral', senderId);

			setConnection(conn);
		} catch (error) {
			console.log('try catch', error);
		}
	};
	const handleClickGroup = async (e) => {
		const receiverIdData = e.currentTarget.getAttribute('data-value');
		setReceiverId(receiverIdData);
		const groupIdData = e.currentTarget.getAttribute('data-info');
		await joinChatRoom(groupIdData);
		console.log(groupIdData);
		setGroupId(groupIdData);
		const result = await axios.get(`/Chat/get-list-messages/${groupIdData}`);
		setListMsg(JSON.parse(JSON.stringify(result.data.value)));
		ref.current.scrollTop = ref.current.scrollHeight;
	};
	const sendMessage = async () => {
		try {
			await connection.invoke('SendMessage', message, receiverId, senderId);
		} catch (error) {
			console.log('a hieu da gap loi khi gui tin nhan');
		}
		setMessage('');
	};
	return (
		<div>
			<Header handleLoginClick={handleLoginClick} /> 
			<div className="container-chat">
				<div className="list-group-chat">
					{listGroupChat.map((item, index) => {
						return (
							<div
								className={groupId === item.id ? "item active" : "item"}
								key={index}
								data-value={item.senderId === senderId ? item.receiverId : item.senderId}
								data-info={item.id}
								onClick={(e) => handleClickGroup(e)}
							>
								<div className="image">
									<img
										src={item.senderId === senderId ? item.receiver.thumbnail : item.sender.thumbnail}
										alt=""
									/>
								</div>
								<div className="group-name-content">
									<div className="group-name">
										{item.senderId === senderId ? item.receiver.name : item.sender.name}
									</div>
									<div className="content">
										{/* {(Array.from(item.messages).length > 0) ? console.log(Array): "" } */}
										{Array.from(item.messageChats).length > 0 &&
										new String(
											Array.from(item.messageChats)[0].senderId
										).valueOf() == new String(senderId).valueOf()
											? 'Bạn: '
											: ''}
										{Array.from(item.messageChats).length > 0
											? Array.from(item.messageChats)[0].content
											: ''}
									</div>
									<span className="time">
										{/* {(Array.from(item.messages).length > 0) ? (((new Date().getTime() - new Date(Array.from(item.messages)[0].timeSend).getTime()))/(1000 * 60)): "" } */}
									</span>
								</div>
							</div>
						);
					})}
				</div>
				<div ref={ref} className="content-chat">
					<div className="content-message">
						{listMsg.length == 0 ? 'Bạn chưa có tin nhắn nào' : ''}
						{listMsg.map((item, index) => {
							return new String(item.senderId).valueOf() ==
								new String(senderId).valueOf() ? (
								<div className="my-message" key={index}>
									<p className="body-message">{item.content}</p>
								</div>
							) : (
								<div className="your-message" key={index}>
									<p className="body-message">{item.content}</p>
								</div>
							);
						})}
					</div>
					<div className="container-input-content">
						<textarea
							className="input-message"
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							disabled={!receiverId}
						/>
						{message.length !== 0 ? (
							<>
								<div className="icon-send" onClick={() => sendMessage()}>
									<i className="fa-regular fa-paper-plane"></i>
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
