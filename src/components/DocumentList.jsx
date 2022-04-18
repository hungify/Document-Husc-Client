import {
  ClockCircleOutlined,
  DeleteTwoTone,
  DownloadOutlined,
  EditTwoTone,
  ExpandOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, List, Row, Space, Tag, Typography } from "antd";
import { getRole } from "app/selectors/authSelector";
import pdfFile from "assets/pdf/test.pdf";
import BadgeRibbonUrgency from "components/BadgeRibbonUrgent";
import ButtonTooltip from "components/ButtonTooltip";
import { ROLES } from "configs/roles";
import { saveAs } from "file-saver";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

export default function ListDocument({ dataRender, onEditDocument, onRevokeDocument }) {
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
  return (
    <List
      itemLayout="vertical"
      size="default"
      pagination={{
        pageSize: 10,
        defaultCurrent: 1,
        hideOnSinglePage: true,
        onChange: (page) => {},
      }}
      dataSource={dataRender}
      renderItem={(item) => (
        <List.Item key={item.key}>
          <BadgeRibbonUrgency text={item.urgentLevel} key={item.key}>
            <CardItemAnt bordered={false}>
              <Row align="middle" justify="space-between">
                <Col span={24}>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="large">
                        {item.treeProcessing?.name.charAt(0).toUpperCase() ?? "?"}
                      </Avatar>
                    }
                    title={<Link to={`/detail/${item.key}`}>{item.title}</Link>}
                  />
                </Col>
                <Col span={8}>
                  <Space direction="vertical">
                    <Typography.Text>
                      Số hiệu văn bản:&nbsp;
                      <Typography.Text strong>{item.documentNumber}</Typography.Text>
                    </Typography.Text>
                    <Typography.Text>
                      Người ký:&nbsp;
                      <Typography.Text strong>{item.signer}</Typography.Text>
                    </Typography.Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical">
                    <Typography.Text>
                      Ngày Ban hành:&nbsp;
                      <Typography.Text strong>{item.dateIssued}</Typography.Text>
                    </Typography.Text>
                    <Typography.Text>
                      Cơ quan ban hành:&nbsp;
                      <Typography.Text strong>{item.authorityIssued}</Typography.Text>
                    </Typography.Text>
                  </Space>
                </Col>

                <Col span={4}>
                  <Typography.Title level={5}>
                    <ButtonTooltip
                      type="primary"
                      shape="round"
                      icon={<ExpandOutlined />}
                      onButtonClick={handlePreviewFileClick}
                      document={pdfFile}
                    >
                      Xem trước
                    </ButtonTooltip>
                  </Typography.Title>

                  <Typography.Title level={5}>
                    <ButtonTooltip
                      type="primary"
                      shape="round"
                      icon={<DownloadOutlined />}
                      onButtonClick={handleSaveFileClick}
                      document={pdfFile}
                    >
                      Tải xuống
                    </ButtonTooltip>
                  </Typography.Title>
                </Col>
                <Col span={4}>
                  {role === ROLES.ADMIN ? (
                    <>
                      <Typography.Title level={5}>
                        <ButtonTooltip
                          onButtonClick={onEditDocument}
                          document={item}
                          icon={<EditTwoTone />}
                          type="outline"
                        >
                          Chỉnh sửa
                        </ButtonTooltip>
                      </Typography.Title>
                      <Typography.Title level={5}>
                        <ButtonTooltip
                          document={item}
                          onButtonClick={onRevokeDocument}
                          danger
                          type="dashed"
                          icon={<DeleteTwoTone twoToneColor="#FD5D5D" />}
                        >
                          Thu hồi
                        </ButtonTooltip>
                      </Typography.Title>
                    </>
                  ) : role === ROLES.USER ? (
                    <Typography.Text strong>
                      <Tag icon={<ClockCircleOutlined />} color="processing">
                        Chờ xử lý
                      </Tag>
                    </Typography.Text>
                  ) : null}
                </Col>
              </Row>
            </CardItemAnt>
          </BadgeRibbonUrgency>
        </List.Item>
      )}
    />
  );
}
