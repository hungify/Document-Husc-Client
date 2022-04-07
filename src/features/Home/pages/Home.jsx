import { Layout } from "antd";
import SearchFilter from "components/SearchFilter";
import GuestLayout from "layout/GuestLayout";

import DocumentList from "features/Home/pages/DocumentList";
import React from "react";
import styled from "styled-components";
const { Header, Footer, Content } = Layout;

const HeaderWrapper = styled(Header)`
  background-color: #fff;
  height: 100%;
`;

export default function Home() {
  return (
    <GuestLayout>
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
    </GuestLayout>
  );
}
