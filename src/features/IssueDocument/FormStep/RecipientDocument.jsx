import { InfoCircleOutlined } from "@ant-design/icons";
import { Alert, Card, Col, Form, Input, Row, Typography } from "antd";
import TableTransfer from "components/TransferTable";
import React from "react";
import styled from "styled-components";

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
let i = 0;
mockData.push(
  {
    key: i++,
    fullName: "Nguyễn Ngọc Thủy",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: i++,
    fullName: "Hoàng Quang",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: i++,
    fullName: "Trần Nguyên Phong",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: i++,
    fullName: "Nguyễn Dũng",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: i++,
    fullName: "Đoàn Thị Hồng Phước",
    department: `Khoa Công nghệ thông tin`,
  },
  {
    key: i++,
    fullName: "Nguyễn Trần Hoàn",
    department: `Khoa Toán`,
  },
  {
    key: i++,
    fullName: "Trần Thị Thúy",
    department: `Khoa Toán`,
  },
  {
    key: i++,
    fullName: "Trần Văn Tuấn",
    department: `Khoa Toán`,
  },
  {
    key: i++,
    fullName: "Trần Đình Trình",
    department: `Khoa Ngữ Văn`,
  },
  {
    key: i++,
    fullName: "Trần Đình Tùng",
    department: `Khoa Báo Chí`,
  },
  {
    key: i++,
    fullName: "Đinh Mạnh Cường",
    department: `Khoa Điện tử viễn thông`,
  },
  {
    key: i++,
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
                  showSearch={true}
                  pagination={{
                    pageSize: 20,
                    showSizeChanger: true,
                    simple: true,
                    showLessItems: true,
                  }}
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
