import { DeleteTwoTone, DownloadOutlined, EditTwoTone, ExpandOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Divider, List, Row, Typography } from "antd";
import pdfFile from "assets/pdf/test.pdf";
import ButtonFlexible from "components/ButtonFlexible";
import DropdownFilter from "components/DropdownFilter";
import { dropdownConfig } from "config/dropdown";
import { saveAs } from "file-saver";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RowAnt = styled(Row)`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export default function DocumentList(props) {
  const { dataRender, type, onEditDocument, onDeleteDocument } = props;
  const handlePreviewFileClick = (item) => {
    window.open(item, {
      target: "_blank",
      rel: "noopener noreferrer",
    });
  };
  const handleSaveFileClick = (item) => {
    saveAs(item, "name_cua_file.pdf");
  };

  return (
    <>
      <RowAnt>
        <Col span={20}>
          <Typography.Text strong>Có tất cả 123 Văn bản</Typography.Text>
        </Col>
        <Col span={4}>
          <DropdownFilter dataRender={dropdownConfig.documentFilter} />
        </Col>
        <Divider type="horizontal" />
      </RowAnt>
      <Row>
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
              <Badge.Ribbon text="Bình thường" color="green" key={item.id}>
                <Card>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar size="large">{item.avatar.charAt(0).toUpperCase()}</Avatar>}
                      title={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
                    />
                    <Row align="middle" justify="space-between">
                      <Col span={7}>
                        <Typography.Title level={5}>
                          Số hiệu văn bản:{" "}
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
                        {type === "admin" ? (
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
                        ) : type === "user" ? (
                          <>
                            <Typography.Title level={5}>Văn bản chờ được xử lý</Typography.Title>
                          </>
                        ) : null}
                      </Col>
                    </Row>
                  </List.Item>
                </Card>
              </Badge.Ribbon>
            )}
          />
        </Col>
      </Row>
    </>
  );
}
