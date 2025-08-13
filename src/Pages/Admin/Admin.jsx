import React, { useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState([
    { _id: "1", fullName: "John Doe", email: "john@example.com" },
    { _id: "2", fullName: "Jane Smith", email: "jane@example.com" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = () => {
    setIsModalVisible(true);
    setNewAdmin({ fullName: "", email: "", password: "" });
    setIsEditing(false);
  };

  const handleEditAdmin = (admin) => {
    setIsModalVisible(true);
    setNewAdmin({ fullName: admin.fullName, email: admin.email, password: "" });
    setCurrentAdminId(admin._id);
    setIsEditing(true);
  };

  const handleSaveAdmin = () => {
    setLoading(true);
    setTimeout(() => {
      if (isEditing) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin._id === currentAdminId
              ? { ...admin, fullName: newAdmin.fullName, email: newAdmin.email }
              : admin
          )
        );
        message.success("Admin updated successfully!");
      } else {
        setAdmins((prev) => [
          ...prev,
          { _id: Date.now().toString(), fullName: newAdmin.fullName, email: newAdmin.email },
        ]);
        message.success("Admin created successfully!");
      }
      setIsModalVisible(false);
      setLoading(false);
    }, 800);
  };

  const handleDeleteAdmin = (id) => {
    setAdmins((prev) => prev.filter((admin) => admin._id !== id));
    message.success("Admin deleted successfully!");
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e, field) => {
    setNewAdmin({ ...newAdmin, [field]: e.target.value });
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 10, color: "#4CAF50" }}
            onClick={() => handleEditAdmin(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ color: "red" }}
            onClick={() => handleDeleteAdmin(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="mb-4 text-2xl font-semibold">Administrator Management</h3>
        <Button
          type="primary"
          onClick={handleCreateAdmin}
          style={{ backgroundColor: "#FF4D4F", color: "white" }}
        >
          Create New Admin
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={admins}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />

      <Modal
        title={isEditing ? "Edit Admin" : "Create Admin"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSaveAdmin}
            loading={loading}
          >
            Save
          </Button>,
        ]}
      >
        <label>Full Name</label>
        <Input
          value={newAdmin.fullName}
          onChange={(e) => handleInputChange(e, "fullName")}
          style={{ marginBottom: 10 }}
        />
        <label>Email</label>
        <Input
          value={newAdmin.email}
          onChange={(e) => handleInputChange(e, "email")}
          style={{ marginBottom: 10 }}
        />
        {!isEditing && (
          <>
            <label>Password</label>
            <Input.Password
              value={newAdmin.password}
              onChange={(e) => handleInputChange(e, "password")}
              style={{ marginBottom: 10 }}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminManagementPage;
