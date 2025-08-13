import React, { useState } from "react";
import { Card, Button, Modal, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const primaryColor = "#F37975";

  // Dummy subscription data
  const [subscriptions, setSubscriptions] = useState([
    {
      _id: "1",
      name: "Basic Plan",
      type: "monthly",
      price: { amount: 9.99, currency: "USD" },
      features: ["Access to 10 books", "Email support"],
    },
    {
      _id: "2",
      name: "Pro Plan",
      type: "yearly",
      price: { amount: 99.99, currency: "USD" },
      features: ["Unlimited books", "Priority support", "Exclusive deals"],
    },
  ]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editingSubscription, setEditingSubscription] = useState(null);

  // Delete subscription
  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub._id !== id));
    message.success("Subscription deleted successfully");
  };

  // Edit subscription (open modal with data)
  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setFeatures(subscription.features);
    editForm.setFieldsValue({
      title: subscription.name,
      chargeType: subscription.type,
      price: subscription.price.amount,
    });
    setIsEditModalVisible(true);
  };

  // Add feature
  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      setFeatures([...features, featureInput]);
      setFeatureInput("");
    }
  };

  // Remove feature
  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Add subscription locally
  const handleAddSubscription = (values) => {
    const newSubscription = {
      _id: Date.now().toString(),
      name: values.title,
      price: { amount: values.price, currency: "USD" },
      type: values.chargeType.toLowerCase(),
      features: features,
    };
    setSubscriptions([...subscriptions, newSubscription]);
    message.success("Subscription created successfully!");
    setIsAddModalVisible(false);
    form.resetFields();
    setFeatures([]);
  };

  // Save edited subscription
  const handleEditSubscription = (values) => {
    if (!editingSubscription) return;
    const updatedList = subscriptions.map((sub) =>
      sub._id === editingSubscription._id
        ? {
            ...sub,
            name: values.title,
            type: values.chargeType,
            price: { amount: values.price, currency: "USD" },
            features: features,
          }
        : sub
    );
    setSubscriptions(updatedList);
    message.success("Subscription updated successfully!");
    setIsEditModalVisible(false);
    setFeatures([]);
    editForm.resetFields();
  };

  // Navigate to subscribers page
  const handleSubscribersClick = (subscriptionId) => {
    navigate(`/subscription/subscribers/${subscriptionId}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Subscriptions</h2>
        <Button
          type="primary"
          style={{ backgroundColor: primaryColor }}
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalVisible(true)}
        >
          Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {subscriptions.map((sub) => (
          <Card
            key={sub._id}
            className="relative p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
          >
            <div className="absolute flex gap-2 top-4 right-4">
              <UsergroupAddOutlined
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => handleSubscribersClick(sub._id)}
              />
              <EditOutlined
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => handleEdit(sub)}
              />
              <DeleteOutlined
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(sub._id)}
              />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800">{sub.name}</h3>
            <p className="text-sm text-center text-gray-500">{sub.type}</p>
            <p className="my-4 text-3xl font-bold text-center text-gray-900">
              ${sub.price.amount} {sub.price.currency}
            </p>
            <ul className="text-sm text-center text-gray-700">
              {sub.features.map((feature, index) => (
                <li key={index} className="py-1">{feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        title="Add New Subscription"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubscription}>
          <Form.Item label="Subscription Name" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Charge Type" name="chargeType">
            <Select>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Features">
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <Button onClick={handleAddFeature} style={{ backgroundColor: primaryColor, color: "white" }}>
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between p-1 border-b">
                  {feature}
                  <Button type="text" danger onClick={() => handleRemoveFeature(index)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full border-none"
              style={{ backgroundColor: primaryColor }}
            >
              Add Subscription
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Subscription"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubscription}>
          <Form.Item label="Subscription Name" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Charge Type" name="chargeType">
            <Select>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Features">
            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <Button onClick={handleAddFeature} style={{ backgroundColor: primaryColor, color: "white" }}>
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between p-1 border-b">
                  {feature}
                  <Button type="text" danger onClick={() => handleRemoveFeature(index)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full border-none"
              style={{ backgroundColor: primaryColor }}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SubscriptionPage;
