import { PlusCircleTwoTone } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Col, List, Row, Tooltip, Typography } from "antd";
import DropdownFilter from "components/DropdownFilter";
import SearchFilter from "components/SearchFilter";
import { dropdownConfig } from "configs/dropdown";
import React from "react";
import Linkify from "linkify-react";
import { useNavigate } from "react-router-dom";
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push(
    {
      id: new Date().getTime() + i,
      title: `Thông báo v/v nhận bằng tốt nghiệp đại học hệ chính quy đợt 1 năm 2022`,
      avatar: "https://joeschmoe.io/api/v1/random",
      postedDate: "2020-01-01 12:00:00",
      content:
        "Phòng Đào tạo Đại học và Công tác sinh viên thông báo cho toàn thể sinh viên được công nhận tốt nghiệp theo Quyết định số 169/QĐ-ĐHKH ngày 10/3/2022, đến tại Phòng ĐTĐH&CTSV gặp Cô Hoàng Thị Hằng để nhận bằng tốt nghiệp. Khi đi mang theo giấy tờ tùy thân có ảnh.",
    },
    {
      id: new Date().getTime() + i,
      title: `THÔNG BÁO NỘP HỌC PHÍ HỌC KỲ 2 NĂM HỌC 2021-2022 DÀNH CHO SINH VIÊN K45`,
      avatar: "https://joeschmoe.io/api/v1/random",
      postedDate: "2020-01-01 12:00:00",
      content: `Hiện nay, nhà trường đã cung cấp thẻ sinh viên kèm thẻ ngân hàng cho các bạn sinh viên năm 1.
      Các bạn vào trang https://student.husc.edu.vn/Account/Login , đăng nhập theo tên đăng nhập và mật khẩu được cấp cho các bạn để nộp học phí theo các bước phòng Đào tạo Đại học và Công tác sinh viên đã hướng dẫn. Lưu ý là các bạn nộp tiền lần đầu phải nộp nhiều hơn số học phí 50.000đ và nhập tên thẻ ở mục nộp tiền viết hoa không có dấu.

      Trường hợp các bạn nộp học phí qua tài khoản 121000089161, Trường Đại học Khoa học Đại học Huế, Ngân hàng vietinbank Chi nhánh Huế sẽ bị trả lại vào tài khoản các bạn và phí chuyển trả lại sinh viên phải tự chịu.Nhà trường cũng không áp dụng hình thức nộp học phí bằng tiền mặt nên các bạn lưu ý để nộp học phí kỳ 2 cho đúng và kịp thời.

      Cám ơn các bạn./.`,
    }
  );
}

export default function ManageNotify() {
  const navigate = useNavigate();

  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <Card
              extra={
                <Tooltip title="Thêm mới môt văn bản?">
                  <Button
                    icon={<PlusCircleTwoTone />}
                    type="default"
                    onClick={() => navigate("post")}
                  >
                    Thêm mới
                  </Button>
                </Tooltip>
              }
            >
              <Row gutter={[0, 20]} align="middle">
                <Col span={24}>
                  <SearchFilter />
                </Col>
                <Col span={20}>
                  <Typography.Text strong>Có tất cả 12 Thông báo</Typography.Text>
                </Col>
                <Col
                  span={4}
                  style={{
                    width: "100%",
                    textAlign: "right",
                  }}
                >
                  <DropdownFilter dataRender={dropdownConfig.documentFilter} />
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
                      style: {
                        textAlign: "center",
                      },
                    }}
                    dataSource={listData}
                    renderItem={(item) => (
                      <Badge.Ribbon text="Bình thường" color="green" key={item.id}>
                        <Card>
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={item.avatar} />}
                              title={<Typography.Title level={5}>{item.title}</Typography.Title>}
                              description={
                                <>
                                  <Typography.Text level={5}>
                                    <Typography.Text keyboard>Thông báo</Typography.Text>
                                  </Typography.Text>
                                  <Typography.Text level={5}>
                                    <Typography.Text keyboard>{item.postedDate}</Typography.Text>
                                  </Typography.Text>
                                </>
                              }
                            />
                            <Typography.Text>
                              <Linkify
                                tagName="div"
                                options={{
                                  rel: "noopener",
                                  target: "_blank",
                                }}
                              >
                                {item.content}
                              </Linkify>
                            </Typography.Text>
                          </List.Item>
                        </Card>
                      </Badge.Ribbon>
                    )}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
