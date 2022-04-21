import { Card, Col, Form, Input, Row, Typography } from "antd";
import TableTransfer from "components/TransferTable";
import React from "react";
import styled from "styled-components";
import { v4 as uuidV4 } from "uuid";

const Container = styled.div`
  padding: 10px 20px;
`;

const CardAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const mockData = [];
mockData.push(
  {
    key: uuidV4(),
    fullName: "Nguyễn Ngọc Thủy",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: uuidV4(),
    fullName: "Hoàng Quang",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: uuidV4(),
    fullName: "Trần Nguyên Phong",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: uuidV4(),
    fullName: "Nguyễn Dũng",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: uuidV4(),
    fullName: "Đoàn Thị Hồng Phước",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: uuidV4(),
    fullName: "Nguyễn Trần Hoàn",
    department: `Khoa Toán`,
  },
  {
    key: uuidV4(),
    fullName: "Trần Thị Thúy",
    department: `Khoa Toán`,
  },
  {
    key: uuidV4(),
    fullName: "Trần Văn Tuấn",
    department: `Khoa Toán`,
  },
  {
    key: uuidV4(),
    fullName: "Trần Đình Trình",
    department: `Khoa Ngữ Văn`,
  },
  {
    key: uuidV4(),
    fullName: "Trần Đình Tùng",
    department: `Khoa Báo Chí`,
  },
  {
    key: uuidV4(),
    fullName: "Đinh Mạnh Cường",
    department: `Khoa Điện tử viễn thông`,
  },
  {
    key: uuidV4(),
    fullName: "Nguyễn Thị Hồng Hải",
    department: `Khoa Vật Lý`,
  }
);

const TableColumns = [
  {
    dataIndex: "fullName",
    title: "Họ và tên",
  },
  {
    dataIndex: "department",
    title: "Phòng ban",
    filters: [
      {
        text: "Khoa Công nghệ thông tin",
        value: "Khoa Công nghệ thông tin",
      },
      {
        text: "Khoa Điện tử viễn thông",
        value: "Khoa Điện tử viễn thông",
      },
      {
        text: "Khoa Ngữ Văn",
        value: "Khoa Ngữ Văn",
      },
      {
        text: "Khoa Toán",
        value: "Khoa Toán",
      },
      {
        text: "Khoa Vật lý",
        value: "Khoa Vật lý",
      },
      {
        text: "Khoa Báo chí",
        value: "Khoa Báo chí",
      },
    ],
    onFilter: (value, record) => record.department.startsWith(value),
    filterSearch: (input, record) => record.value.includes(input),
  },
];

export default function RecipientDocument({
  form,
  onSubmitForm,
  onSelectRelatedRecipient,
  selectedRecipient,
}) {
  const handleTableTransferChange = (nextTargetKeys) => {
    onSelectRelatedRecipient(nextTargetKeys);
  };

  return (
    <Container>
      <Form form={form} onFinish={onSubmitForm} name="issue-document" layout="vertical">
        <CardAnt title={<Typography.Text strong>Danh sách người nhận</Typography.Text>}>
          <Row>
            <Col span={24}>
              <Form.Item name="recipient" initialValue="all">
                <TableTransfer
                  titles={["Danh sách cán bộ/giảng viên", "Người nhận đã chọn"]}
                  dataSource={mockData}
                  targetKeys={selectedRecipient}
                  pagination={{
                    pageSize: 20,
                    showSizeChanger: true,
                    simple: true,
                    showLessItems: true,
                  }}
                  showSearch={true}
                  onSearch={(record, value) => record.fullName.includes(value)}
                  render={(item) => item.title}
                  onChange={handleTableTransferChange}
                  filterOption={(inputValue, item) =>
                    item.fullName.toLowerCase().includes(inputValue.toLowerCase())
                  }
                  leftColumns={TableColumns}
                  rightColumns={TableColumns}
                />
              </Form.Item>
            </Col>
          </Row>
        </CardAnt>
        <CardAnt title={<Typography.Text strong>Lời nhắc</Typography.Text>}>
          <Row>
            <Col span={24}>
              <Form.Item name="reminder">
                <Input.TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder="Nhập nội dung lời nhắc"
                />
              </Form.Item>
            </Col>
          </Row>
        </CardAnt>
      </Form>
    </Container>
  );
}
