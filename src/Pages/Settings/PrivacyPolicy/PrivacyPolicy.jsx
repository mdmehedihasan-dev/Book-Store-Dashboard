import React, { useState, useEffect } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate fetching dummy Privacy Policy data on mount
  useEffect(() => {
    setTimeout(() => {
      setContent(
        `<h2>Privacy Policy</h2>
        <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.</p>
        <p>We collect data to provide better services and enhance your experience. We do not share your personal data with third parties except as required by law.</p>
        <p>By using our services, you consent to the collection and use of your information in accordance with this policy.</p>`
      );
    }, 500);
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      message.success("Privacy Policy updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">Privacy Policy</h2>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-[200px] mb-12"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-white rounded-lg bg-primary"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Privacy Policy"}
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
