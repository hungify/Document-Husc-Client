import { Card, Col, Row, Typography } from "antd";
import { getRole } from "app/selectors/authSelector";
import ListDocument from "components/DocumentList";
import { analyticsConfig } from "configs/dashboard";
import { ROLES } from "configs/roles";
import Analytics from "features/Dashboard/Analytics";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    avatar: "Admin",
    textNumber: "21/NQ-HĐĐH",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssuing: "Đại Học Huế",
    urgency: "Bình thường",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

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
          <ListDocument dataRender={listData} />
        </Col>
      </Row>
    </>
  );
}
