import { Card, Col, Row, Typography } from "antd";
import SortFilter from "components/SortFilter";
import styled from "styled-components";

const WrapCard = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

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
export default function HeaderListDocument({ children }) {
  const handleRadioDateChange = (value) => {};

  return (
    <>
      <WrapCard>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={16}>
                  Có <Typography.Text strong>18</Typography.Text> kết quả chứa từ khóa:
                  <Typography.Text strong>&nbsp; Nghị quyết</Typography.Text>
                </Col>
                <Col span={8}>
                  <SortFilter dataRadio={dataRadio} onRadioChange={handleRadioDateChange} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>{children}</Col>
        </Row>
      </WrapCard>
    </>
  );
}
