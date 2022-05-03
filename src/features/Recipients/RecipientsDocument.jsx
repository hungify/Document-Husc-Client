import { Card, Col, Form, Input, Row, Typography } from "antd";
import { getFilterRecipients } from "app/selectors/recipients";
import TableTransfer from "components/TransferTable";
import { fetchExcludedRecipients, fetchRecipients } from "features/Recipients/recipientsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

const TableColumns = [
  {
    dataIndex: "username",
    title: "Họ và tên",
  },
  {
    dataIndex: "department",
    title: "Phòng ban",
    render: (text) => {
      return text.label;
    },
    filters: [
      {
        text: "Khoa Công nghệ Thông tin",
        value: "Khoa Công nghệ Thông tin",
      },
      {
        text: "Khoa Điện tử Viễn thông",
        value: "Khoa Điện tử Viễn thông",
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
    onFilter: (value, record) => {
      return record.department.label.indexOf(value) === 0;
    },
    filterSearch: (input, record) => {
      return record.text.includes(input);
    },
  },
];

export default function RecipientDocument({
  form,
  onSubmitForm,
  onSelectRelatedRecipient,
  selectedRecipient,
  required,
  documentId,
}) {
  const dispatch = useDispatch();

  const filterRecipients = useSelector(getFilterRecipients);

  React.useEffect(() => {
    dispatch(fetchRecipients());
    if (documentId) {
      dispatch(fetchExcludedRecipients(documentId));
    }
  }, [dispatch, documentId]);

  const handleTableTransferChange = (nextTargetKeys) => {
    onSelectRelatedRecipient(nextTargetKeys);
  };

  return (
    <Container>
      <Form form={form} onFinish={onSubmitForm} name="issue-document" layout="vertical">
        <CardAnt title={<Typography.Text strong>Danh sách người nhận</Typography.Text>}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="recipients"
                initialValue={[]}
                rules={required ? [{ required, message: "Vui lòng chọn người nhận" }] : []}
              >
                <TableTransfer
                  titles={["Danh sách cán bộ/giảng viên", "Người nhận đã chọn"]}
                  dataSource={filterRecipients}
                  targetKeys={selectedRecipient}
                  locale={{
                    searchPlaceholder: "Nhập vào tên của cán bộ/giảng viên",
                  }}
                  pagination={{
                    pageSize: 20,
                    showSizeChanger: true,
                    simple: true,
                    showLessItems: true,
                  }}
                  showSearch={true}
                  onChange={handleTableTransferChange}
                  filterOption={(inputValue, item) =>
                    item.username.toLowerCase().includes(inputValue.toLowerCase())
                  }
                  leftColumns={TableColumns}
                  rightColumns={TableColumns}
                  rowKey={(record) => record._id}
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
