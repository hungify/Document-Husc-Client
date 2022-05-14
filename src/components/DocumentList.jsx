import {
  ClockCircleOutlined,
  DeleteTwoTone,
  EditTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, List, Row, Space, Tag, Typography, Empty, Input, Form } from "antd";
import { getRole } from "app/selectors/auth";
import { getDocuments, getTotalDocuments } from "app/selectors/documents";
import { getPage, getPageSize } from "app/selectors/searchGroup";
import BadgeRibbonUrgency from "components/BadgeRibbonUrgent";
import ButtonTooltip from "components/ButtonTooltip";
import FileList from "components/FileList";
import ModalForm from "components/ModalForm";
import { ROLES } from "configs/roles";
import dayjs from "dayjs";
import { setPage, setPageSize } from "features/SearchGroup/searchGroupSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

export default function ListDocument({ onEditDocument, onRevokeDocument }) {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector(getRole);
  const page = useSelector(getPage);
  const pageSize = useSelector(getPageSize);
  const totalDocuments = useSelector(getTotalDocuments);
  const documents = useSelector(getDocuments);

  const handleOnSubmit = (values) => {
    
    setVisible(false);
  };

  const handleRevokeDocumentClick = (item) => {
    setVisible(true);
  };

  const handleEditDocumentClick = (item) => {
    navigate(`/documents/edit/${item._id}`);
  };

  return (
    <>
      <ModalForm
        visible={visible}
        onSubmit={handleOnSubmit}
        onCancel={() => setVisible(false)}
        size="large"
        title="Thu hồi văn bản"
        okText="Thu hồi"
        cancelText="Hủy"
        layout="vertical"
        name="revoke-document-form"
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          name="agency_description"
          label="Lý do"
          tooltip={{ title: "Lý do thu hồi văn bản?", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <Input.TextArea
            placeholder="Vui lòng mô tả lý do thu hồi văn bản"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
      </ModalForm>
      <List
        itemLayout="vertical"
        size="default"
        locale={{
          emptyText: <Empty description="Danh sách trống" />,
        }}
        pagination={{
          pageSize: pageSize,
          defaultCurrent: page,
          showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kết quả`,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showPrevNextJumpers: true,
          showTitle: true,
          total: totalDocuments,
          onChange: (page) => {
            dispatch(setPage({ page, triggerBy: "documents" }));
          },
          onShowSizeChange: (current, pageSize) => {
            dispatch(setPageSize({ pageSize, triggerBy: "documents" }));
          },
        }}
        dataSource={documents}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <BadgeRibbonUrgency text={item.urgentLevel.label}>
              <CardItemAnt bordered={false}>
                <Row align="middle" justify="space-between">
                  <Col span={24}>
                    <List.Item.Meta
                      avatar={<Avatar size="large">{item.publisher?.avatar ?? "?"}</Avatar>}
                      title={<Link to={`/detail/${item._id}?tab=property`}>{item.title}</Link>}
                    />
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <Typography.Text>
                        Số hiệu văn bản:&nbsp;
                        <Typography.Text strong>{item.documentNumber}</Typography.Text>
                      </Typography.Text>
                      <Typography.Text>
                        Người ký:&nbsp;
                        <Typography.Text strong>{item.signer}</Typography.Text>
                      </Typography.Text>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Space direction="vertical">
                      <Typography.Text>
                        Ngày Ban hành:&nbsp;
                        <Typography.Text strong>
                          {dayjs(item.issueDate).format("DD/MM/YYYY")}
                        </Typography.Text>
                      </Typography.Text>
                      <Typography.Text>
                        Cơ quan ban hành:&nbsp;
                        <Typography.Text strong>{item.agency.label}</Typography.Text>
                      </Typography.Text>
                    </Space>
                  </Col>
                  {item.fileList.length > 0 && (
                    <>
                      <FileList files={item.fileList} />
                    </>
                  )}
                  <Col span={4}>
                    {role === ROLES.ADMIN ? (
                      <>
                        <Typography.Title level={5}>
                          <ButtonTooltip
                            onButtonClick={handleEditDocumentClick}
                            document={item}
                            icon={<EditTwoTone />}
                            type="outline"
                          >
                            Chỉnh sửa
                          </ButtonTooltip>
                        </Typography.Title>
                        <Typography.Title level={5}>
                          <ButtonTooltip
                            document={item}
                            onButtonClick={handleRevokeDocumentClick}
                            danger
                            type="dashed"
                            icon={<DeleteTwoTone twoToneColor="#FD5D5D" />}
                          >
                            Thu hồi
                          </ButtonTooltip>
                        </Typography.Title>
                      </>
                    ) : role === ROLES.USER && !item.isRead ? (
                      <Typography.Text strong>
                        <Tag icon={<ClockCircleOutlined />} color="processing">
                          Chờ xử lý
                        </Tag>
                      </Typography.Text>
                    ) : null}
                  </Col>
                </Row>
              </CardItemAnt>
            </BadgeRibbonUrgency>
          </List.Item>
        )}
      />
    </>
  );
}
