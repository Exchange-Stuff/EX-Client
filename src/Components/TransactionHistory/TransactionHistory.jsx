import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "../../utils/axios.js";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { Table } from 'antd';
import "./TransactionHistory.css";

const columns = [
  {
    title: 'Transaction Type',
    dataIndex: 'transactionType',
    key: 'transactionType',
    width: 150,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 150,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: 150,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: 150,
  },
];

export const TransactionHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.nameid;
          console.log(userId);
          await axios.get(`Account/user/${userId}`);

          const purchaseTicket = await axios.get(`TransactionHistory/getListTransactionHistoryByUserId/10/1`);
          const formattedData = purchaseTicket.data.value.map(transaction => {
            const date = new Date(transaction.createdOn);
            return {
              key: transaction.id,
              transactionType: transaction.transactionType,
              date: date.toLocaleDateString(),
              time: date.toLocaleTimeString(),
              amount: transaction.amount,
            };
          });
          setData(formattedData);
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
    <div className="transactionHistorypage">
      <Header />
      <div className="transactionHistorypage-content">
        <h2>Lịch sử giao dịch</h2>
        <div className="transactionHistorypage-form">
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 1000, y: 300 }}
          />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default TransactionHistory;
