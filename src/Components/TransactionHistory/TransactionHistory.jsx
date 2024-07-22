import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import { jwtDecode } from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'antd';
import './TransactionHistory.css';

const columns = [
  {
    title: 'Loại giao dịch',
    dataIndex: 'transactionType',
    key: 'transactionType',
    width: 200,
    fontSize: 26,
    render: (text) => {
      switch (text) {
        case 0:
          return 'Đăng sản phẩm';
        case 1:
          return 'Mua bán sản phẩm';
        case 2:
          return 'Rút tiền';
        case 3:
          return 'Mua xu';
        default:
          return 'Unknown';
      }
    },
  },
  {
    title: 'Số xu giao dịch',
    dataIndex: 'amount',
    key: 'amount',
    width: 150,
    render: (amount, record) => {
      const textColor = record.action ? 'green' : 'red';
      const fontWeight = 'bold';
      return (
        <span style={{ color: textColor, fontWeight: fontWeight }}>
          {amount}
        </span>
      );
    },
  },
  {
    title: 'Ngày giao dịch',
    dataIndex: 'date',
    key: 'date',
    width: 150,
  },
  {
    title: 'Thời gian giao dịch',
    dataIndex: 'time',
    key: 'time',
    width: 150,
  },
];

export const TransactionHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkUserScreenAccess = async () => {
      try {
        const response = await axios.post('Auth/screen', {
          resource: 'UserScreen',
        });
        if (response.data.isSuccess) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Error checking user screen access:', error);
        setIsAuthorized(false);
      }
    };

    checkUserScreenAccess();
  }, []);

  useEffect(() => {
    if (isAuthorized === false) {
      navigate('/homepage');
    }
  }, [isAuthorized, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(currentPage);
  }, [id, currentPage]);

  const fetchData = async (page) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.nameid;
        await axios.get(`Account/user/${userId}`);

        const response = await axios.get(
          `TransactionHistory/getListTransactionHistoryByUserId/10/${page}`
        );
        const formattedData = response.data.value.listItem.map((transaction) => {
          const date = new Date(transaction.createdOn);
          return {
            key: transaction.id,
            transactionType: transaction.transactionType,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            amount: transaction.amount,
            action: transaction.isCredit,
          };
        });
        setData(formattedData);
        setTotalPages(response.data.value.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isAuthorized === false) {
    return (
      <div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="transactionHistorypage">
      <Header />
      <h2 style={{ color: '#ff8c00', fontSize: '30px', margin: '110px auto 20px auto' }}>
        Lịch sử giao dịch
      </h2>
      <div className="transactionHistorypage-form">
        <Table
          columns={columns}
          dataSource={data}
          className="transactionHistorypage-table"
          pagination={false}
        />
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          onChange={handlePageChange}
          style={{ marginTop: 20, textAlign: 'right', marginRight: '50px' }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TransactionHistory;
