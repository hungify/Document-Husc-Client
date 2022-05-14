import { Col, Row, Typography } from "antd";
import ListDocument from "components/DocumentList";
import Analytics from "features/Analytics/Analytics";
import { fetchAnalytics } from "features/Dashboard/dashboardSlice";
import { fetchDocuments } from "features/ManageDocuments/documentSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function DashBoard() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchDocuments());
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <>
      <Analytics />

      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Typography.Text strong>Các văn bản mới nhất</Typography.Text>
          <ListDocument />
        </Col>
      </Row>
    </>
  );
}
