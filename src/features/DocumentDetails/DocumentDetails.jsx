import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Modal, Row, Space, Tabs } from "antd";
import { getRole, isAuthenticated } from "app/selectors/auth";
import { getFiles, getParticipants, getProperty, getRelatedDocuments } from "app/selectors/documentDetails";
import DocumentSummary from "components/DocumentSummary";
import ForwardIcon from "components/Icons/ForwardIcon";
import { ROLES } from "configs/roles";
import ChartReceiver from "features/ChartReceiver/ChartReceiver";
import ChatRoom from "features/ChatRoom/ChatRoom";
import {
  fetchDocumentDetails,
  updateReadDocument
} from "features/DocumentDetails/documentDetailsSlice";
import FileList from "features/FileList/FileList";
import { forwardDocuments } from "features/InboxDocuments/inboxDocumentsSlice";
import RecipientDocument from "features/Recipients/RecipientsDocument";
import RelatedDocuments from "features/RelatedDocuments/RelatedDocuments";
import TreeProcessing from "features/TreeProcessing/TreeProcessing";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const ButtonAnt = styled(Button)`
  display: flex;
`;

export default function DetailDocument() {
  const [visible, setVisible] = React.useState(false);
  const [selectedRecipient, setSelectedRecipient] = React.useState([]);

  const [form] = Form.useForm();

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const role = useSelector(getRole);
  const isAuth = useSelector(isAuthenticated);
  const property = useSelector(getProperty);
  const files = useSelector(getFiles);
  const relatedDocuments = useSelector(getRelatedDocuments);
  const participants = useSelector(getParticipants);

  React.useEffect(() => {
    if (activeTab) {
      dispatch(fetchDocumentDetails({ slug, key: activeTab }));
    } else {
      navigate(`?tab=property`);
    }
  }, [isAuth, slug, dispatch, activeTab, navigate]);

  const handleTabChangeClick = (key) => {
    navigate(`?tab=${key}`);
    dispatch(fetchDocumentDetails({ slug, key }));
  };

  const handleForwardClick = (forwardId) => {
    setVisible(true);
  };

  const handleReadDocument = () => {
    Modal.confirm({
      title: "Lưu ý",
      icon: <ExclamationCircleOutlined />,
      content: "Thông báo đã cho mọi người bạn đã xử lý xong?",
      okText: "Hoàn thành",
      cancelText: "Hủy",
      onOk() {
        dispatch(updateReadDocument({ documentId: slug }));
      },
      onCancel() {},
    });
  };

  const handleOnSubmit = () => {
    form.submit();
    setVisible(false);
  };
  const handleOnCancel = () => {
    setVisible(false);
  };

  const handleRecipientsSubmit = (values) => {
    dispatch(forwardDocuments({ documentId: slug, ids: values.recipients }));
  };

  return (
    <>
      <Modal
        visible={visible}
        onOk={handleOnSubmit}
        onCancel={handleOnCancel}
        size="large"
        title="Chuyển tiếp văn bản"
        okText="Chuyển tiếp"
        cancelText="Hủy"
        layout="vertical"
        name="forward"
        width={1000}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <RecipientDocument
          form={form}
          onSubmitForm={handleRecipientsSubmit}
          onSelectRelatedRecipient={(data) => setSelectedRecipient(data)}
          selectedRecipient={selectedRecipient}
          required={true}
          documentId={slug}
        />
      </Modal>

      <Card
        title="Nội dung văn bản"
        extra={
          (role === ROLES.ADMIN || role === ROLES.USER) &&
          !property?.isPublic && (
            <Space split={<Divider type="vertical" />}>
              <Button type="primary" onClick={() => handleReadDocument(property._id)} size="large">
                Báo cáo đã xứ lý
              </Button>
              <ButtonAnt
                type="primary"
                icon={<ForwardIcon />}
                size="large"
                onClick={() => handleForwardClick(property._id)}
              >
                Chuyển tiếp
              </ButtonAnt>
            </Space>
          )
        }
      >
        <Row>
          <Col flex="auto">
            <Tabs activeKey={activeTab} type="card" size="large" onTabClick={handleTabChangeClick}>
              <Tabs.TabPane tab="Thuộc tính" key="property">
                {!_.isEmpty(property) && <DocumentSummary dataSource={property} />}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách văn bản" key="files">
                <FileList files={files} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Văn bản liên quan" key="relatedDocuments">
                <RelatedDocuments dataSource={relatedDocuments} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cây xử lý" key="participants">
                {!_.isEmpty(participants) && <TreeProcessing treeData={participants} />}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Phân tích" key="analytics">
                <ChartReceiver />
              </Tabs.TabPane>
              {(role === ROLES.ADMIN || role === ROLES.USER) && !property.isPublic && (
                <>
                  <Tabs.TabPane tab="Phản hồi" key="feedback">
                    <ChatRoom />
                  </Tabs.TabPane>
                </>
              )}
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
}
