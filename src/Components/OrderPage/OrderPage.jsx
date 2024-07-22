import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Select, Pagination, Rate } from 'antd';
import './OrderPage.css'; // Đảm bảo rằng file CSS này được nhập khẩu
import Modal from 'react-modal';

const { Option } = Select;
Modal.setAppElement('#root');

export const OrderPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [selectedPurchaseTicketId, setSelectedPurchaseTicketId] = useState(null);

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
          const createDate = new Date(ticket.createdOn);
          const updateDate = new Date(ticket.modifiedOn);
          return {
            key: ticket.id,
            productName: ticket.product.name,
            amount: ticket.amount,
            dateCreate: createDate.toLocaleDateString(),
            timeCreate: createDate.toLocaleTimeString(),
            dateUpdate: updateDate.toLocaleDateString(),
            timeUpdate: updateDate.toLocaleTimeString(),
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
      await axios.put(`PurchaseTicket/UpdatePurchaseTicket`, { id: id, status: value });
      fetchData(currentPage, status);
      toast.success('Cập nhật trạng thái thành công', { autoClose: 1500 });
      setSelectedPurchaseTicketId(id);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Cập nhật trạng thái thất bại', { autoClose: 1500 });
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleRatingChange = (value) => {
    setRating(value);
    console.log(`Rating: ${value}`);
  };

  const submitRating = async () => {
    if (!selectedPurchaseTicketId || rating === 0 || content.trim() === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin đánh giá', { autoClose: 1500 });
      return;
    }

    try {
      await axios.post('/Rating/create-rating', {
        purchaseTicketId: selectedPurchaseTicketId,
        content: content,
        evaluateType: rating,
      });
      toast.success('Đánh giá thành công', { autoClose: 1500 });
      closeModal();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Đánh giá thất bại', { autoClose: 1500 });
    }
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      width: 300,
      fontSize: 30,
      fontWeight: 'bold',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      width: 150,
    },
    {
      title: 'Thời gian đặt hàng',
      dataIndex: 'timeCreate',
      key: 'timeCreate',
      width: 150,
    },
    {
      title: 'Ngày xác nhận',
      dataIndex: 'dateUpdate',
      key: 'dateUpdate',
      width: 150,
    },
    {
      title: 'Thời gian xác nhận',
      dataIndex: 'timeUpdate',
      key: 'timeUpdate',
      width: 150,
    },
    {
      title: 'Trạng thái',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: (text, record) =>
        record.status === 0 ? (
          <Select
            defaultValue={record.status.toString()}
            onChange={(value) => handleStatusProductChange(record.key, value)}
            style={{ width: 120, marginLeft: 10 }}
          >
            <Option value="0">Pending</Option>
            <Option value="1">Cancelled</Option>
            <Option value="2">Confirmed</Option>
          </Select>
        ) : (
          <span>{record.status === 1 ? 'Cancelled' : 'Confirmed'}</span>
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
  }

  return (
    <div className="orderpage">
      <Header />
      <h2 style={{ color: '#ff8c00', fontSize: '30px', margin: '110px auto 20px auto' }}>
        Lịch sử mua hàng
      </h2>
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
          className="order-table"
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Rate Product"
        className="modal-orderpage"
        overlayClassName="overlay"
      >
        <h2>Đánh giá sản phẩm</h2>
        <Rate onChange={handleRatingChange} value={rating} />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung đánh giá"
          style={{ margin: '10px 0', width: '100%' }}
        />
        <div>
          <button className='sent-rating-order' onClick={submitRating}>Gửi đánh giá</button>
          <button className='sent-rating-order' onClick={closeModal}>Đóng</button>
        </div>
      </Modal>

    </div>
  );
};

export default OrderPage;
