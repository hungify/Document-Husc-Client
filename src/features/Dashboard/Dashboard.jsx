import { Col, Row, Typography } from "antd";
import { getRole } from "app/selectors/authSelector";
import ListDocument from "components/DocumentList";
import { analyticsConfig } from "configs/dashboard";
import { ROLES } from "configs/roles";
import Analytics from "features/Dashboard/Analytics";
import { mockDocumentListLatest } from "mocks/documents";
import React from "react";
import { useSelector } from "react-redux";

export default function DashBoard() {
  const role = useSelector(getRole);

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
          <ListDocument dataRender={mockDocumentListLatest} />
        </Col>
      </Row>
    </>
  );
}
