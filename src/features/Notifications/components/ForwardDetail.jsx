import { Avatar, Button, Card, Col, Modal, Row, Space, Tooltip, Typography } from "antd";
import MailContent from "features/Notifications/components/MailContent";
import React from "react";
import { useParams } from "react-router-dom";
import MailBox from "features/Notifications/components/MailBox";
import MailInfo from "features/Notifications/components/MailInfo";

export default function ForwardDetail() {
  const { forwardId } = useParams();
  const [visible, setVisible] = React.useState(false);

  const data = {
    id: forwardId,
    title: `Văn bản đã chuyển tiếp thứ ${forwardId}`,
    myMessage: "This is my message",
    message: "Toàn thể khoa hãy triển khoai kế hoạch như trong văn bản.",
    publisher: {
      name: "Nguyễn Mạnh Tuấn",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.publisher.${forwardId}@husc.edu.vn`,
    },
    to: {
      name: "Hồng Nhung",
      avatar: "https://joeschmoe.io/api/v1/random",
      email: `email.receiver.${forwardId}@husc.edu.vn`,
    },
  };

  const handleForwardClick = (forwardId) => {
    console.log("🚀 :: forwardId", forwardId);
    setVisible(true);
  };
  const handleOnSubmit = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <>
      <MailBox
        visible={visible}
        onCreate={handleOnSubmit}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Card
        title="Nội dung thông báo"
        extra={
          <Button type="primary" onClick={() => handleForwardClick(data.id)}>
            Chuyển tiếp
          </Button>
        }
      >
        <MailInfo dataRender={data} isInbox={false} />
        <Card>
          <MailContent dataRender={data} />
        </Card>
      </Card>
    </>
  );
}
