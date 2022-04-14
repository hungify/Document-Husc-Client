import { DeleteTwoTone, DownloadOutlined, EditTwoTone, ExpandOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, List, Radio, Row, Typography } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import ButtonFlexible from "components/ButtonFlexible";
import DropdownFilter from "components/DropdownFilter";
import { dropdownConfig } from "configs/dropdown";
import { saveAs } from "file-saver";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRole } from "app/selectors/authSelector";
import { ROLES } from "configs/roles";
import styled from "styled-components";
import SortFilter from "components/SortFilter";

const WrapCard = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

const ListItemAnt = styled(List.Item)``;

const dataRadio = [
  {
    label: "Ngày ban hành",
    value: "issuedDate",
  },
  {
    label: "Ngày cập nhật",
    value: "updatedDate",
  },
];
export default function DocumentList(props) {
  const { dataRender, onEditDocument, onDeleteDocument } = props;
  const role = useSelector(getRole);

  const handlePreviewFileClick = (item) => {
    window.open(item, {
      target: "_blank",
      rel: "noopener noreferrer",
    });
  };
  const handleSaveFileClick = (item) => {
    saveAs(item, "name_cua_file.pdf");
  };
  const handleRadioDateChange = (value) => {};
  return (
    <WrapCard bordered={false}>
      <Row gutter={[10, 10]}>
        <Col span={16}>
          <Typography.Text strong>123 Văn bản</Typography.Text>
        </Col>
        <Col span={8}>
          <SortFilter dataRadio={dataRadio} onRadioChange={handleRadioDateChange} />
        </Col>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="default"
            pagination={{
              pageSize: 10,
              onChange: (page) => {
                console.log(page);
              },
            }}
            dataSource={dataRender}
            renderItem={(item) => (
              <ListItemAnt>
                <Badge.Ribbon text="Bình thường" color="green" key={item.id}>
                  <CardItemAnt bordered={false}>
                    <Row align="middle" justify="space-between">
                      <Col span={24}>
                        <List.Item.Meta
                          avatar={
                            <Avatar size="large">{item.avatar.charAt(0).toUpperCase()}</Avatar>
                          }
                          title={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
                        />
                      </Col>
                      <Col span={7}>
                        <Typography.Title level={5}>
                          Số hiệu văn bản:
                          <Typography.Text keyboard>{item.textNumber}</Typography.Text>
                        </Typography.Title>
                        <Typography.Title level={5}>
                          Người ký: <Typography.Text keyboard>{item.signer}</Typography.Text>
                        </Typography.Title>
                      </Col>
                      <Col span={9}>
                        <Typography.Title level={5}>
                          Ban hành: <Typography.Text keyboard>{item.dateIssued}</Typography.Text>
                        </Typography.Title>
                        <Typography.Title level={5}>
                          Cơ quan ban hành:
                          <Typography.Text keyboard>{item.authorityIssuing}</Typography.Text>
                        </Typography.Title>
                      </Col>
                      <Col span={4}>
                        <Typography.Title level={5}>
                          <ButtonFlexible
                            type="primary"
                            shape="round"
                            icon={<ExpandOutlined />}
                            onDocumentClick={handlePreviewFileClick}
                            document={pdfFile}
                          >
                            Xem trước
                          </ButtonFlexible>
                        </Typography.Title>

                        <Typography.Title level={5}>
                          <ButtonFlexible
                            type="primary"
                            shape="round"
                            icon={<DownloadOutlined />}
                            onDocumentClick={handleSaveFileClick}
                            document={pdfFile}
                          >
                            Tải xuống
                          </ButtonFlexible>
                        </Typography.Title>
                      </Col>
                      <Col span={4}>
                        {role === ROLES.ADMIN ? (
                          <>
                            <Typography.Title level={5}>
                              <ButtonFlexible
                                onDocumentClick={onEditDocument}
                                document={item}
                                icon={<EditTwoTone />}
                                type="outline"
                              >
                                Chỉnh sửa
                              </ButtonFlexible>
                            </Typography.Title>
                            <Typography.Title level={5}>
                              <ButtonFlexible
                                document={item}
                                onDocumentClick={onDeleteDocument}
                                danger
                                type="dashed"
                                icon={<DeleteTwoTone twoToneColor="#FD5D5D" />}
                              >
                                Thu hồi
                              </ButtonFlexible>
                            </Typography.Title>
                          </>
                        ) : role === ROLES.USER ? (
                          <>
                            <Typography.Title level={5}>Văn bản chờ được xử lý</Typography.Title>
                          </>
                        ) : null}
                      </Col>
                    </Row>
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
