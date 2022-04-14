import { ExclamationCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Modal, Space, TreeSelect } from "antd";
import DetailDocument from "components/DetailDocument";
import ModalForm from "components/ModalForm";
import TreeSelectForm from "components/TreeSelectForm";
import { treePeople } from "configs/trees";
import React from "react";
import { useParams } from "react-router-dom";

export default function ReceiverDocumentDetail() {
  const [visible, setVisible] = React.useState(false);
  const { inboxId } = useParams();
  const [treeReceiver, setTreeReceiver] = React.useState();

  const data = {
    id: inboxId,
    title: `Văn bản mới thứ ${inboxId}`,
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni dolorum ipsum doloribus sint earum temporibus odit, architecto ipsam hic non, consectetur, atque accusantium nobis. Odit voluptates sit eos iste sunt. Autem similique ratione itaque consequatur maiores quibusdam sit atque voluptatem optio eveniet! Dolorem, quo obcaecati repellat perspiciatis iusto accusantium ea eaque possimus asperiores odit nisi officia, eum iure alias commodi? Consequuntur corporis natus aspernatur mollitia minima autem beatae magni dolorem ab assumenda quia sint corrupti, rerum omnis commodi est, similique numquam tempore maxime qui! Assumenda in veritatis rerum consequuntur consequatur.",
    publisher: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.publisher.${inboxId}@husc.edu.vn`,
    },
    from: {
      name: "Kim Huệ",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${inboxId}@husc.edu.vn`,
    },
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
    console.log("🚀 :: values", values);
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
          <Space>
            <Button type="primary" onClick={() => handleFinishProcessed(data.id)}>
              Báo cáo đã xứ lý
            </Button>
            <Button type="primary" onClick={() => handleForwardClick(data.id)}>
              Chuyển tiếp
            </Button>
          </Space>
        }
      >
        <Col flex="auto">
          <DetailDocument />
        </Col>
      </Card>
    </>
  );
}
