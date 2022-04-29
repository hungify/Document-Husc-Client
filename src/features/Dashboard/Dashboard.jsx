import { Col, Row, Typography } from "antd";
import { getRole } from "app/selectors/auth";
import { getDocuments } from "app/selectors/documents";
import ListDocument from "components/DocumentList";
import { analyticsConfig } from "configs/dashboard";
import { ROLES } from "configs/roles";
import Analytics from "features/Dashboard/Analytics";
import { fetchDocuments } from "features/Home/homeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashBoard() {
  const role = useSelector(getRole);
  const dispatch = useDispatch();
  const documents = useSelector(getDocuments);

  React.useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <>
      {role === ROLES.ADMIN ? (
        <>
          <Analytics dataRender={analyticsConfig[ROLES.USER]} />
          <Analytics dataRender={analyticsConfig[ROLES.ADMIN]} />
        </>
      ) : (
        <Analytics dataRender={analyticsConfig[ROLES.USER]} />
      )}

      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Typography.Text strong>Các văn bản mới nhất</Typography.Text>
          <ListDocument dataRender={documents} />
        </Col>
      </Row>
    </>
  );
}
