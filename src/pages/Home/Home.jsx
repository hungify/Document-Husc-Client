import { Layout } from "antd";
import SearchFilter from "components/SearchFilter";
import MainLayout from "layout/UserLayout/UserLayout";
import DocumentList from "pages/DocumentList/DocumentList";
import React from "react";
import styled from "styled-components";
const { Header, Footer, Content } = Layout;

const HeaderWrapper = styled(Header)`
  background-color: #fff;
  height: 100%;
`;

export default function Home() {
  return (
    <MainLayout>
      <Layout>
        <HeaderWrapper>
          <SearchFilter />
        </HeaderWrapper>
        <Layout>
          <Content>
            <DocumentList />
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </MainLayout>
  );
}
