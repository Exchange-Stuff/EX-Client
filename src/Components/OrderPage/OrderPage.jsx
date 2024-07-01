import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "../../utils/axios.js";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { Table } from 'antd';
import "./OrderPage.css";
import coin from "../Assets/coin.png";

const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export const OrderPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.nameid;
          console.log(userId);
          const result = await axios.get(`Account/user/${userId}`);

          const purchaseTicket = await axios.get(`getListPurchaseTicketByUserId/10/1/2`)
          setData(purchaseTicket.data.value);
        } else {
          toast.error("Bạn chưa đăng nhập");
          window.location.href = "http://localhost:3000/homepage";
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="orderpage">
      <Header />
      <div className="order-page-content">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1500, y: 300 }}
        />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default OrderPage;
