import {
  ClockCircleOutlined,
  DeleteTwoTone,
  DownloadOutlined,
  EditTwoTone,
  ExpandOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, List, Row, Space, Tag, Typography } from "antd";
import { getRole } from "app/selectors/auth";
import { getTotalDocuments } from "app/selectors/documents";
import { getPage, getPageSize } from "app/selectors/searchGroup";
import BadgeRibbonUrgency from "components/BadgeRibbonUrgent";
import ButtonTooltip from "components/ButtonTooltip";
import { ROLES } from "configs/roles";
import dayjs from "dayjs";
import { setPage, setPageSize } from "features/SearchGroup/searchGroupSlice";
import { saveAs } from "file-saver";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardItemAnt = styled(Card)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
`;

export default function ListDocument({ dataRender, onEditDocument, onRevokeDocument }) {
  const dispatch = useDispatch();

  const role = useSelector(getRole);
  const page = useSelector(getPage);
  const pageSize = useSelector(getPageSize);
  const totalDocuments = useSelector(getTotalDocuments);

  const handlePreviewFileClick = (item) => {
    window.open(item, {
      target: "_blank",
      rel: "noopener noreferrer",
    });
  };
  const handleSaveFileClick = (item) => {
    saveAs(item, "name_cua_file.pdf");
  };
  return !_.isEmpty(dataRender) ? (
    <List
      itemLayout="vertical"
      size="default"
      pagination={{
        pageSize: pageSize,
        defaultCurrent: page,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kết quả`,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showPrevNextJumpers: true,
        showTitle: true,
        total: totalDocuments,
        onChange: (page) => {
          dispatch(setPage({ page, triggerBy: "documents" }));
        },
        onShowSizeChange: (current, size) => {
          dispatch(setPageSize({ page, triggerBy: "documents" }));
        },
      }}
      dataSource={dataRender}
      renderItem={(item) => (
        <List.Item key={item._id}>
          <BadgeRibbonUrgency text={item.urgentLevel.label}>
            <CardItemAnt bordered={false}>
              <Row align="middle" justify="space-between">
                <Col span={24}>
                  <List.Item.Meta
                    avatar={<Avatar size="large">{item.publisher?.avatar ?? "?"}</Avatar>}
                    title={<Link to={`/detail/${item._id}?tab=property`}>{item.title}</Link>}
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
                      <Typography.Text strong>
                        {dayjs(item.issueDate).format("DD/MM/YYYY")}
                      </Typography.Text>
                    </Typography.Text>
                    <Typography.Text>
                      Cơ quan ban hành:&nbsp;
                      <Typography.Text strong>{item.agency.label}</Typography.Text>
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
                      // document={pdfFile}
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
                      // document={pdfFile}
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
                  ) : role === ROLES.USER && !item.isRead ? (
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
  ) : null;
}
