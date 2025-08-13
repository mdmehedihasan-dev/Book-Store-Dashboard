import React, { useState } from "react";
import { Card, Modal, Alert } from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";

const Dashboard = () => {
  // State for selected year
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Dummy Dashboard Data
  const dashboardData = {
    data: {
      totalUsers: 1200,
      totalOrders: 450,
      totalProducts: 80,
      totalBlogs: 15,
      chartData: {
        months: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        userStatistics: [50, 75, 100, 90, 120, 130, 150, 160, 140, 170, 200, 220],
        orderStatistics: [20, 35, 40, 30, 50, 60, 55, 70, 65, 80, 75, 90],
      },
    },
  };

  // Dummy Recent Orders
  const dummyOrders = [
    {
      orderId: "ORD001",
      name: "John Doe",
      address: "123 Street, City",
      createdAt: "2025-08-01",
      paymentInfo: { status: "Paid" },
      type: "Electronics",
    },
    {
      orderId: "ORD002",
      name: "Jane Smith",
      address: "456 Avenue, City",
      createdAt: "2025-08-02",
      paymentInfo: { status: "Pending" },
      type: "Clothing",
    },
    {
      orderId: "ORD003",
      name: "Mike Johnson",
      address: "789 Road, City",
      createdAt: "2025-08-05",
      paymentInfo: { status: "Paid" },
      type: "Accessories",
    },
    {
      orderId: "ORD004",
      name: "Emily Davis",
      address: "321 Boulevard, City",
      createdAt: "2025-08-07",
      paymentInfo: { status: "Cancelled" },
      type: "Furniture",
    },
  ];

  const { totalUsers, totalOrders, totalProducts, totalBlogs, chartData } =
    dashboardData.data;

  const { months, userStatistics, orderStatistics } = chartData;

  // Chart Data
  const ordersData = months.map((month, i) => ({
    name: month,
    orders: orderStatistics[i] || 0,
  }));

  const userGrowthData = months.map((month, i) => ({
    name: month,
    users: userStatistics[i] || 0,
  }));

  // State for Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleEyeClick = (order) => {
    setActiveOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setActiveOrder(null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold sm:text-2xl">Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Users", value: totalUsers },
          { title: "Total Orders", value: totalOrders },
          { title: "Total Products", value: totalProducts },
          { title: "Total Blogs", value: totalBlogs },
        ].map(({ title, value }, i) => (
          <Card key={i} className="p-4 bg-white shadow-md">
            <h3 className="text-sm text-gray-600">{title}</h3>
            <p className="text-xl font-bold sm:text-2xl">{value}</p>
            <span className="text-xs text-green-600">
              {["8.5% Up", "1.3% Up", "4.3% Down", "1.8% Up"][i]}
            </span>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-wrap gap-x-4">
        {/* Orders Bar Chart */}
        <div
          className="p-4 mb-6 bg-white shadow-md sm:p-6 rounded-xl flex-1 min-w-[300px]"
          style={{ border: "1px solid #ddd" }}
        >
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-semibold">Orders (Monthly)</h2>
            <select onChange={handleYearChange} value={selectedYear}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Line Chart */}
        <div
          className="p-4 mb-6 bg-white shadow-md sm:p-6 rounded-xl flex-1 min-w-[300px]"
          style={{ border: "1px solid #ddd" }}
        >
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-semibold">User Growth (Monthly)</h2>
            <select onChange={handleYearChange} value={selectedYear}>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#f87171"
                strokeWidth={2}
                fill="#fecaca"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-4 overflow-x-auto bg-white shadow-md sm:p-6 rounded-xl">
        <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b">
              {["ID", "Name", "Address", "Date", "Payment Status", "Details"].map(
                (col, i) => (
                  <th key={i} className="p-2 text-sm text-left text-gray-600">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {dummyOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              dummyOrders.map((order, i) => (
                <tr key={order.orderId || i} className="border-b">
                  <td className="p-2 text-sm">{order.orderId}</td>
                  <td className="p-2 text-sm">{order.name}</td>
                  <td className="p-2 text-sm">{order.address}</td>
                  <td className="p-2 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-sm">{order.paymentInfo?.status}</td>
                  <td className="p-2 text-sm">
                    <Eye
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => handleEyeClick(order)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {activeOrder && (
          <div>
            <p>
              <strong>Order ID:</strong> {activeOrder.orderId}
            </p>
            <p>
              <strong>Name:</strong> {activeOrder.name}
            </p>
            <p>
              <strong>Address:</strong> {activeOrder.address}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(activeOrder.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Type:</strong> {activeOrder.type}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
