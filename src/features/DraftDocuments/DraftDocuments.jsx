import { DeleteOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import _ from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WrapCard = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardCheckBox = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
  & .ant-card-body {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

const ListItemAnt = styled(List.Item)``;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    avatar: "Admin",
    textNumber: "21/NQ-HĐĐH",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssuing: "Đại Học Huế",
    urgency: "Bình thường",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default function DraftDocuments(props) {
  const navigate = useNavigate();
  const [checkedDraft, setCheckedDraft] = React.useState([]);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);
  const [titleCheckAll, setTitleCheckAll] = React.useState("Chọn tất cả");

  const handleCheckedSingleDraft = (e) => {
    const id = e.target.value;
    const currentIndex = checkedDraft.indexOf(id);
    const newCheckedDraft = [...checkedDraft];

    if (currentIndex === -1) {
      newCheckedDraft.push(id);
    } else {
      newCheckedDraft.splice(currentIndex, 1);
    }
    if (newCheckedDraft.length === 0) {
      setCheckAll(false);
      setIndeterminate(false);
    } else if (_.isEqual(_.sortBy(newCheckedDraft), _.sortBy(listData))) {
      setIndeterminate(false);
      setCheckAll(true);
      setTitleCheckAll("Bỏ chọn tất cả");
    } else {
      setIndeterminate(true);
    }
    setCheckedDraft(newCheckedDraft);
  };

  const handleCheckedAllDraft = (e) => {
    const currentCheckAll = e.target.checked;
    setIndeterminate(false);
    setCheckAll(currentCheckAll);
    if (currentCheckAll) {
      setTitleCheckAll("Bỏ chọn tất cả");
      setCheckedDraft(listData.map((item) => item.id));
    } else {
      setTitleCheckAll("Chọn tất cả");
      setCheckedDraft([]);
    }
  };
  return (
    <WrapCard bordered={false}>
      <CardCheckBox bordered={false}>
        <Space>
          <Checkbox
            indeterminate={indeterminate}
            onChange={handleCheckedAllDraft}
            checked={checkAll}
          >
            {titleCheckAll}
          </Checkbox>
          <Button type="default" size="middle" icon={<DeleteOutlined />} danger>
            Xóa
          </Button>
        </Space>
      </CardCheckBox>
      <Row>
        <Col span={24}>
          <List
            itemLayout="vertical"
            pagination={{
              pageSize: 10,
              onChange: (page) => {
                console.log(page);
              },
            }}
            dataSource={listData}
            renderItem={(item) => (
              <ListItemAnt>
                <Badge.Ribbon text="Bản nháp" key={item.id}>
                  <CardItemAnt bordered={false}>
                    <List.Item.Meta
                      avatar={
                        <Space size="large">
                          <Checkbox
                            value={item.id}
                            onChange={handleCheckedSingleDraft}
                            checked={checkedDraft.includes(item.id)}
                          />
                          <Avatar size="large">{item.avatar.charAt(0).toUpperCase()}</Avatar>
                        </Space>
                      }
                      title={
                        <Typography.Text strong onClick={() => navigate("/m/documents/post")}>
                          {item.id % 2 === 0 ? item.title : "Không có tiêu đề"}
                        </Typography.Text>
                      }
                      description={
                        <Typography.Text
                          type="secondary"
                          onClick={() => navigate("/m/documents/post")}
                        >
                          Chỉnh sửa lần cuối lúc: 10:10 24/5/2022
                        </Typography.Text>
                      }
                    />
                  </CardItemAnt>
                </Badge.Ribbon>
              </ListItemAnt>
            )}
          />
        </Col>
      </Row>
    </WrapCard>
  );
}
