import { Button, Card, Col } from "antd";
import DocumentDetail from "components/DetailDocument";
import React from "react";
import { useParams } from "react-router-dom";

export default function ReceiverDocumentDetail() {
  const [visible, setVisible] = React.useState(false);
  const { inboxId } = useParams();

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
      <Card
        title="Nội dung văn bản"
        extra={
          <Button type="primary" onClick={() => handleForwardClick(data.id)}>
            Chuyển tiếp
          </Button>
        }
      >
        <Col flex="auto">
          <DocumentDetail />
        </Col>
      </Card>
    </>
  );
}
