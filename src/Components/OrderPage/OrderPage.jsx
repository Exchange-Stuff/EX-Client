import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Select, Pagination } from 'antd';
import './OrderPage.css';

const { Option } = Select;

export const OrderPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

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
    fetchData(currentPage, status);
  }, [id, currentPage, status]);

  const fetchData = async (page, status) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.nameid;
        await axios.get(`Account/user/${userId}`);

        const response = await axios.get(
          `PurchaseTicket/getListPurchaseTicketByUserId/5/${page}/${status}`
        );
        const purchaseTicket = response.data.value.listItem;
        const formattedData = purchaseTicket.map((ticket) => {
          const date = new Date(ticket.createdOn);
          return {
            key: ticket.id,
            productName: ticket.product.name,
            amount: ticket.amount,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            status: ticket.status,
          };
        });
        setData(formattedData);
        setTotalPages(response.data.value.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusProductChange = async (id, value) => {
    try {
      console.log("Product ID" + value);
      await axios.put(`PurchaseTicket/UpdatePurchaseTicket`, { id: id, status: value,});
      fetchData(currentPage, status);
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      console.log(error);
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
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
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record) => (
        <Select
          defaultValue="0"
          onChange={(value) => handleStatusProductChange(record.key, value)}
          style={{ width: 120, marginLeft: 10 }}
        >
          <Option value="0">Pending</Option>
          <Option value="1">Cancelled</Option>
          <Option value="2">Confirmed</Option>
        </Select>
      ),
    },
  ];

  if (isAuthorized === false) {
    return (
      <div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="orderpage">
        <Header />
        <div className="orderpage-content">
          <h2 style={{ color: '#ff8c00', fontSize: '30px', marginTop: '0px' }}>Lịch sử mua hàng</h2>
          <div className="status-filter">
            <span>Status</span>
            <Select
              defaultValue="0"
              onChange={handleStatusChange}
              style={{ width: 120, marginLeft: 10 }}
            >
              <Option value="0">Pending</Option>
              <Option value="1">Cancelled</Option>
              <Option value="2">Confirmed</Option>
            </Select>
          </div>
          <div className="orderpage-form">
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 1000, y: 300 }}
              className="order-table"
              pagination={false}
            />
            <Pagination
              current={currentPage}
              total={totalPages * 10}
              onChange={handlePageChange}
              style={{ marginTop: 20, textAlign: 'center' }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default OrderPage;
