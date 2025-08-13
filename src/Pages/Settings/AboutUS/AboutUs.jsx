import React, { useState, useEffect } from "react";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutUs = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate fetching dummy data on mount
  useEffect(() => {
    setTimeout(() => {
      setContent(
        `<h2>About Our Company</h2>
        <p>We are a passionate team dedicated to delivering top-quality products and services to our customers. Our mission is to innovate, inspire, and create impactful solutions that make life better.</p>
        <p>Founded in 2020, we have grown rapidly, serving clients all around the globe with excellence and commitment.</p>`
      );
    }, 500);
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      message.success("About Us updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="mb-6 text-2xl font-bold">About Us</h2>
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
          {loading ? "Updating..." : "Update About Us"}
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
