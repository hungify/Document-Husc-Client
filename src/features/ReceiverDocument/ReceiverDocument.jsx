import { BulbFilled } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Divider, List, Radio, Row, Space, Tag, Typography } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardAnt = styled(Card)`
  transition: all 0.3s ease;
  padding-left: 0;
  padding-right: 0;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: rgba(65, 132, 228, 0.15);
  }
`;

const WrapText = styled.div`
  display: flex;
  justify-content: center;
`;

const listInboxData = [];
for (let i = 0; i < 23; i++) {
  listInboxData.push({
    id: i + 1,
    title: `
21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025 - ${i}`,
    summary:
      "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020 của Hội đồng Đại học Huế ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế sửa đổi, bổ sung một số điều của Quy chế tổ chức và hoạt động của Đại học Huế; Căn cứ Nghị quyết số 45/NQ-HĐĐH ngày 06 tháng 8 năm 2021 của Hội đồng Đại học Huế ban hành Quy chế hoạt động của Hội đồng Đại học Huế nhiệm kỳ 2021 - 2026; Căn cứ Quyết định số 06/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế ban hành Quy định công nhận, bổ nhiệm, bổ nhiệm lại, kéo dài thời gian giữ chức vụ, thôi giữ chức vụ, miễn nhiệm, luân chuyển và chế độ phụ cấp chức vụ đối với viên chức quản lý tại Đại học Huế; Căn cứ Nghị quyết số 87/NQ-HĐĐH ngày 08 tháng 12 năm 2021.",
    publisher: null,
    from: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${i}@husc.edu.vn`,
    },
    isRead: i % 2 === 0 ? true : false,
    urgentLevel: i % 3 === 0 ? "Khẩn cấp" : "Bình thường",
  });
}
export default function ReceiverDocument() {
  const [filterType, setFilterType] = React.useState("all");
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);

  return (
    <Card size="small">
      <Radio.Group
        onChange={(e) => {
          setFilterType(e.target.value);
        }}
        value={filterType}
      >
        <Radio value="all">Tất cả</Radio>
        <Radio value="unread">Chưa xem</Radio>
      </Radio.Group>
      <Divider />
      <List
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={listInboxData}
        renderItem={(item) => (
          <Badge.Ribbon
            text={item.urgentLevel}
            color={item.urgentLevel === "Bình thường" ? "green" : "red"}
          >
            <CardAnt>
              <Row
                align="middle"
                justify="space-between"
                onClick={() => navigate(`detail/${item.id}`)}
              >
                <Col span={8}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar>{item.from.avatar.charAt(0).toUpperCase()}</Avatar>}
                      title={
                        <Link to={`${item.id}`}>
                          <Typography.Text strong>{item.title}</Typography.Text>
                        </Link>
                      }
                      description={`Từ: ${item.from.name}`}
                    />
                  </List.Item>
                </Col>
                <Col span={12}>
                  <Typography.Paragraph
                    ellipsis={{ rows: 3, expandable: true, symbol: "Chi tiết" }}
                  >
                    {item.summary}
                  </Typography.Paragraph>
                </Col>
                <Col span={2}>
                  {item.isRead && (
                    <WrapText>
                      <Tag color="red" icon={<BulbFilled />}>
                        NEW
                      </Tag>
                    </WrapText>
                  )}
                </Col>
                <Col span={2}>
                  <WrapText>
                    <Typography.Text>2 day ago</Typography.Text>
                  </WrapText>
                </Col>
              </Row>
            </CardAnt>
          </Badge.Ribbon>
        )}
      />
    </Card>
  );
}
