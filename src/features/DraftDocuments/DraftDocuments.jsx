import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Checkbox, Col, List, Row, Space, Typography } from "antd";
import { getDraftDocuments } from "app/selectors/draft";
import dayjs from "dayjs";
import { fetchDraftDocument } from "features/DraftDocuments/draftSlice";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

export default function DraftDocuments() {
  const navigate = useNavigate();
  const [checkedDraft, setCheckedDraft] = React.useState([]);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);
  const [titleCheckAll, setTitleCheckAll] = React.useState("Chọn tất cả");
  const dispatch = useDispatch();
  const documentsDraft = useSelector(getDraftDocuments);

  React.useEffect(() => {
    dispatch(fetchDraftDocument());
  }, [dispatch]);

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
    } else if (_.isEqual(_.sortBy(newCheckedDraft), _.sortBy(documentsDraft))) {
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
      setCheckedDraft(documentsDraft.map((item) => item._id));
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
              onChange: (page) => {},
            }}
            dataSource={documentsDraft}
            renderItem={(item) => (
              <ListItemAnt key={item._id}>
                <Badge.Ribbon text="Bản nháp">
                  <CardItemAnt bordered={false} onClick={() => navigate("/issue")}>
                    <List.Item.Meta
                      avatar={
                        <Space size="large">
                          <Checkbox
                            value={item.key}
                            onChange={handleCheckedSingleDraft}
                            checked={checkedDraft.includes(item._id)}
                          />
                          <Avatar size="large">{item?.publisher.avatar}</Avatar>
                        </Space>
                      }
                      title={
                        <Typography.Text strong>{item.title || "Không có tiêu đề"}</Typography.Text>
                      }
                      description={
                        <Typography.Text type="secondary">
                          Chỉnh sửa lần cuối lúc {dayjs(item.updatedAt).format("HH:mm DD/MM/YYYY")}
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
