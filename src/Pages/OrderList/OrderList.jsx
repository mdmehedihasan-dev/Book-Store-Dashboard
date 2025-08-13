import { useState } from "react";
import {
  Table,
  Input,
  Pagination,
  Modal,
  Button,
  Dropdown,
  Menu,
  Row,
  Col,
  Divider,
  Spin,
} from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { AllImages } from "../../assets/image/AllImages";

const { Search } = Input;

const OrderList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      _id: "1",
      orderId: "ORD-001",
      createdAt: "2025-08-01",
      status: "Ordered",
      user: {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      },
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      items: [
        { name: "Book A", price: 20 },
        { name: "Book B", price: 15 },
      ],
    },
    {
      _id: "2",
      orderId: "ORD-002",
      createdAt: "2025-08-05",
      status: "Ongoing",
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
      },
      shippingAddress: {
        street: "456 Oak St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
      },
      items: [
        { name: "Book C", price: 25 },
      ],
    },
  ]);

  const pageSize = 5;

  const getStatusColor = (status) => {
    switch (status) {
      case "Ordered":
        return "gold";
      case "Ongoing":
        return "blue";
      case "Delivered":
        return "green";
      default:
        return "gray";
    }
  };

  const columns = [
    { title: "ID", dataIndex: "orderId", key: "orderId", responsive: ["sm"] },
    { title: "Name", dataIndex: ["user", "name"], key: "name" },
    {
      title: "Address",
      dataIndex: ["shippingAddress", "street"],
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: getStatusColor(status), fontWeight: "bold" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center gap-4">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => showOrderDetails(record)}
          />
          <Dropdown
            overlay={
              <Menu onClick={(e) => updateOrderStatusHandler(record, e.key)}>
                <Menu.Item key="Ordered">Ordered</Menu.Item>
                <Menu.Item key="Ongoing">Ongoing</Menu.Item>
                <Menu.Item key="Delivered">Delivered</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="link" icon={<EditOutlined />} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const filteredData = orders.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const showOrderDetails = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateOrderStatusHandler = (order, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o._id === order._id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
  };

  const modalContent = currentOrder ? (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <p>
            <strong>Order ID:</strong> {currentOrder.orderId}
          </p>
          <p>
            <strong>Order Date:</strong> {currentOrder.createdAt}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Status:</strong>
            <span
              style={{
                color: getStatusColor(currentOrder.status),
                fontWeight: "bold",
              }}
            >
              {currentOrder.status}
            </span>
          </p>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <p>
            <strong>Name:</strong> {currentOrder.user.name}
          </p>
          <p>
            <strong>Email:</strong> {currentOrder.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {currentOrder.user.phone || "Not provided"}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <strong>Address:</strong> {currentOrder.shippingAddress.street},
            {currentOrder.shippingAddress.city},
            {currentOrder.shippingAddress.state},
            {currentOrder.shippingAddress.zipCode}
          </p>
        </Col>
      </Row>
      <Divider />
      <p>
        <strong>Items:</strong>
      </p>
      <ul>
        {currentOrder.items.map((item, index) => (
          <li key={index} className="flex items-center mb-2">
            <img
              src={AllImages.book}
              alt={item.name}
              className="w-12 h-12 mr-4"
            />
            <span>
              {item.name} - ${item.price}
            </span>
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Price:</strong> $
        {currentOrder.items.reduce((sum, item) => sum + item.price, 0)}
      </p>
    </div>
  ) : null;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <h2 className="text-3xl font-bold">Orders</h2>
        <Search
          placeholder="Search orders..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-72"
          allowClear
        />
      </div>
      <div className="p-5 bg-white rounded shadow-md">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          rowKey="orderId"
          scroll={{ x: "max-content" }}
        />
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>

      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        className="order-modal"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default OrderList;
