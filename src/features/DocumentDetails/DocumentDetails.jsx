import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Modal, Row, Space, Tabs } from "antd";
import { getRole, getUserId, isAuthenticated } from "app/selectors/auth";
import {
  getFiles,
  getMyReadDate,
  getParticipants,
  getProperty,
  getPublisherId,
  getRelatedDocuments,
  isPublicDocument
} from "app/selectors/documentDetails";
import { getForwardSuccess, getSuccessUpdateRead } from "app/selectors/inbox";
import DocumentSummary from "components/DocumentSummary";
import ForwardIcon from "components/Icons/ForwardIcon";
import LoadingOverlayApp from "components/LoadingOverlayApp";
import { ROLES } from "configs/roles";
import ChartReceiver from "features/ChartReceiver/ChartReceiver";
import ChatRoom from "features/ChatRoom/ChatRoom";
import { fetchDocumentDetailsByTab } from "features/DocumentDetails/documentDetailsSlice";
import { forwardDocuments, updateReadDocument } from "features/InboxDocuments/inboxDocumentsSlice";
import RecipientDocument from "features/Recipients/RecipientsDocument";
import RelatedDocuments from "features/RelatedDocuments/RelatedDocuments";
import TreeProcessing from "features/TreeProcessing/TreeProcessing";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";
const FileList = React.lazy(() => import("components/FileList"));
const ButtonAnt = styled(Button)`
  display: flex;
`;

export default function DetailDocument() {
  const [visible, setVisible] = React.useState(false);
  const [selectedRecipient, setSelectedRecipient] = React.useState([]);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const [form] = Form.useForm();

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const role = useSelector(getRole);
  const isAuth = useSelector(isAuthenticated);
  const userId = useSelector(getUserId);
  const property = useSelector(getProperty);
  const files = useSelector(getFiles);
  const relatedDocuments = useSelector(getRelatedDocuments);
  const participants = useSelector(getParticipants);
  const myReadDate = useSelector(getMyReadDate);
  const publisherId = useSelector(getPublisherId);
  const isPublic = useSelector(isPublicDocument);

  const isUpdateSuccess = useSelector(getSuccessUpdateRead);
  const isForwardSuccess = useSelector(getForwardSuccess);

  React.useLayoutEffect(() => {
    if (isUpdateSuccess || isForwardSuccess) {
      dispatch(fetchDocumentDetailsByTab({ slug, key: activeTab }));
    }
  }, [isUpdateSuccess, dispatch, slug, activeTab, isForwardSuccess]);

  React.useLayoutEffect(() => {
    if (activeTab) {
      dispatch(fetchDocumentDetailsByTab({ slug, key: activeTab }));
    } else {
      navigate(`?tab=property`);
    }
  }, [isAuth, slug, dispatch, activeTab, navigate]);

  const handleTabChangeClick = (key) => {
    navigate(`?tab=${key}`);
    dispatch(fetchDocumentDetailsByTab({ slug, key }));
  };

  const handleForwardClick = () => {
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
        setConfirmLoading(true);
        setTimeout(() => {
          const readDate = new Date();
          dispatch(updateReadDocument({ documentId: slug, readDate }));
          setConfirmLoading(false);
        }, 1000);
      },
      onCancel() {},
    });
  };

  const handleOnSubmit = () => {
    form.submit();
  };
  const handleOnCancel = () => {
    setVisible(false);
  };

  const handleRecipientsSubmit = (values) => {
    setConfirmLoading(true);
    setVisible(false);
    setTimeout(() => {
      dispatch(forwardDocuments({ documentId: slug, ids: values.recipients }));
      setSelectedRecipient([]);
      setConfirmLoading(false);
    }, 500);
  };

  return (
    <LoadingOverlayApp spinner={<HashLoader size={50} color="#36D7B7" />} active={confirmLoading}>
      <Modal
        confirmLoading={confirmLoading}
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
          (role === ROLES.ADMIN || role === ROLES.USER) && (
            <Space split={<Divider type="vertical" />} key="read_and_forward">
              {!myReadDate && userId !== publisherId ? (
                <Button
                  type="primary"
                  onClick={() => handleReadDocument(property._id)}
                  size="large"
                  key="read"
                >
                  Báo cáo đã xứ lý
                </Button>
              ) : (
                <React.Fragment key="a" />
              )}
              {!isPublic && (
                <ButtonAnt
                  type="primary"
                  icon={<ForwardIcon />}
                  size="large"
                  onClick={() => handleForwardClick(property._id)}
                  key="forward"
                >
                  Chuyển tiếp
                </ButtonAnt>
              )}
            </Space>
          )
        }
      >
        <Row>
          <Col flex="auto">
            <Tabs activeKey={activeTab} type="card" size="large" onTabClick={handleTabChangeClick}>
              <Tabs.TabPane tab="Thuộc tính" key="property">
                <DocumentSummary dataSource={property} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách văn bản" key="files">
                <React.Suspense
                  fallback={
                    <LoadingOverlayApp
                      spinner={<PulseLoader size={15} color="#F5A623" />}
                      active={true}
                    />
                  }
                >
                  <FileList files={files} />
                </React.Suspense>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Văn bản liên quan" key="relatedDocuments">
                <RelatedDocuments dataSource={relatedDocuments} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Cây xử lý" key="participants">
                {!_.isEmpty(participants) && <TreeProcessing treeData={participants} />}
              </Tabs.TabPane>

              {(role === ROLES.ADMIN || role === ROLES.USER) && !isPublic && (
                <>
                  <Tabs.TabPane tab="Phân tích" key="analytics">
                    <ChartReceiver />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Phản hồi" key="feedback">
                    <ChatRoom />
                  </Tabs.TabPane>
                </>
              )}
            </Tabs>
          </Col>
        </Row>
      </Card>
    </LoadingOverlayApp>
  );
}
