import { Layout } from "antd";
import Header from "layout/AdminLayout/components/Header";
import Sidebar from "layout/AdminLayout/components/Sidebar";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <Layout>
        <Sidebar />
        <Layout>
          <Layout.Content style={{ padding: "20px 24px", minHeight: 280 }}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
