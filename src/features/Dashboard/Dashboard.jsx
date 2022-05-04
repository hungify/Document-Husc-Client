import { Col, Row, Typography } from "antd";
import { getDocuments } from "app/selectors/documents";
import ListDocument from "components/DocumentList";
import Analytics from "features/Analytics/Analytics";
import { fetchAnalytics } from "features/Dashboard/dashboardSlice";
import { fetchDocuments } from "features/Home/homeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashBoard() {
  const dispatch = useDispatch();
  const documents = useSelector(getDocuments);

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
          <ListDocument dataRender={documents} />
        </Col>
      </Row>
    </>
  );
}
