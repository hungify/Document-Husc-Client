import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Modal, Space, Tabs, TreeSelect } from "antd";
import { getRole } from "app/selectors/authSelector";
import ModalForm from "components/ModalForm";
import PreviewPdf from "components/PreviewPdf";
import SummaryTable from "components/SummaryTable";
import TreeSelectForm from "components/TreeSelectForm";
import { ROLES } from "configs/roles";
import { treePeople } from "configs/trees";
import ChartReceiver from "features/ChartReceiver/ChartReceiver";
import ChatRoom from "features/ChatRoom/ChatRoom";
import RelatedDocument from "features/RelatedDocument/RelatedDocument";
import TreeProcessing from "features/TreeProcessing/TreeProcessing";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DetailDocument() {
  const [visible, setVisible] = React.useState(false);
  const { inboxId } = useParams();
  const [treeReceiver, setTreeReceiver] = React.useState();

  const data = [
    {
      agency: "Đại học Huế",
      textNumber: "21/NQ-HĐĐH",
      dateIssued: "20/02/2022",
      signer: "Huỳnh Văn Chương",
      validityStatus: "Đang có hiệu lực",
      documentType: ["nghị quyết"],
      degreeOfUrgency: "Bình thường",
      isFinished: +inboxId % 2 === 0,
      summary:
        "Căn cứ Nghị định số 30/CP ngày 04 tháng 4 năm 1994 của Chính phủ về việc thành lập Đại học Huế; Căn cứ Thông tư số 10/2020/TT-BGDĐT ngày 14 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Quy chế tổ chức và hoạt động của đại học vùng và các cơ sở giáo dục đại học thành viên; Căn cứ Quyết định số 20/QĐ-HĐĐH ngày 31 tháng 7 năm 2020 của Hội đồng Đại học Huế ban hành Quy chế tổ chức và hoạt động của Đại học Huế; Quyết định số 07/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế sửa đổi, bổ sung một số điều của Quy chế tổ chức và hoạt động của Đại học Huế; Căn cứ Nghị quyết số 45/NQ-HĐĐH ngày 06 tháng 8 năm 2021 của Hội đồng Đại học Huế ban hành Quy chế hoạt động của Hội đồng Đại học Huế nhiệm kỳ 2021 - 2026; Căn cứ Quyết định số 06/QĐ-HĐĐH ngày 19 tháng 01 năm 2021 của Hội đồng Đại học Huế ban hành Quy định công nhận, bổ nhiệm, bổ nhiệm lại, kéo dài thời gian giữ chức vụ, thôi giữ chức vụ, miễn nhiệm, luân chuyển và chế độ phụ cấp chức vụ đối với viên chức quản lý tại Đại học Huế; Căn cứ Nghị quyết số 87/NQ-HĐĐH ngày 08 tháng 12 năm 2021.",
    },
  ];
  console.log("🚀 :: data", data[0].isFinished);

  const [activeTab, setActiveTab] = React.useState("property");
  const role = useSelector(getRole);
  const handleTabChangeClick = (key) => {
    setActiveTab(key);
  };
  const onClosePreview = (visible) => {
    if (visible) setActiveTab("property");
  };

  const handleTreeReceiverSelect = (value) => {
    setTreeReceiver([...treeReceiver, value]);
  };

  const handleForwardClick = (forwardId) => {
    setVisible(true);
  };

  const handleFinishProcessed = () => {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Thông báo đã cho mọi người bạn đã xử lý xong?",
      okText: "Hoàn thành",
      cancelText: "Hủy",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  const handleOnSubmit = (values) => {
    setVisible(false);
  };
  const handleOnCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <ModalForm
        visible={visible}
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
        size="large"
        title={"Chuyển tiếp văn bản"}
        okText={"Chuyển tiếp"}
        cancelText={"Hủy"}
        layout="vertical"
        name="forward"
        width={1000}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 22, offset: 1 },
          md: { span: 20, offset: 2 },
        }}
      >
        <Form.Item
          name="to"
          label="Người nhận"
          tooltip={{ title: "Người nhận văn bản của bạn?", icon: <InfoCircleOutlined /> }}
          rules={[{ required: true, message: "Trường này là bắt buộc" }]}
        >
          <TreeSelectForm
            treeData={treePeople}
            onTreeSelect={handleTreeReceiverSelect}
            placeholder="Chọn người nhận"
            allowClear
            size="large"
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            treeCheckable={true}
          />
        </Form.Item>
      </ModalForm>

      <Card
        title="Nội dung văn bản"
        extra={
          (role === ROLES.ADMIN || role === ROLES.USER) && (
            <Space>
              {data[0].isFinished && (
                <Button type="primary" onClick={() => handleFinishProcessed(data.id)}>
                  Báo cáo đã xứ lý
                </Button>
              )}
              <Button type="primary" onClick={() => handleForwardClick(data.id)}>
                Chuyển tiếp
              </Button>
            </Space>
          )
        }
      >
        <Col flex="auto">
          <Tabs activeKey={activeTab} type="card" size="large" onTabClick={handleTabChangeClick}>
            <Tabs.TabPane tab="Thuộc tính" key="property">
              <SummaryTable documentData={data} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Văn bản gốc" key="preview">
              <PreviewPdf activeTab={activeTab} onClosePreview={onClosePreview} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Văn bản liên quan" key="related">
              <RelatedDocument />
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab="Lịch sử cập nhật" key="related">
              Danh sách lịch sử sửa đổi của văn bản
            </Tabs.TabPane> */}
            {(role === ROLES.ADMIN || role === ROLES.USER) && (
              <>
                <Tabs.TabPane tab="Phân tích" key="analytics">
                  <ChartReceiver />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Cây xử lý" key="tree">
                  <TreeProcessing />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Phản hồi" key="feedback">
                  <ChatRoom />
                </Tabs.TabPane>
              </>
            )}
          </Tabs>
        </Col>
      </Card>
    </>
  );
}
