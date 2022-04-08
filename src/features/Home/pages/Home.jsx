import { Layout } from "antd";
import SearchFilter from "components/SearchFilter";
import DocumentList from "features/Home/pages/DocumentList";
import React from "react";

export default function Home() {
  return (
    <Layout>
      <SearchFilter />
      <Layout>
        <Layout.Content>
          <DocumentList />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
