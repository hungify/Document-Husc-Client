import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Collapse, Form, Row, Typography } from "antd";
import SearchBox from "features/SearchGroup/components/SearchBox";
import SearchFilter from "features/SearchGroup/components/SearchFilter";
import SearchTime from "features/SearchGroup/components/SearchTime";
import styled from "styled-components";
const Wrapper = styled.div``;

const CardAnt = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const CardFilter = styled(CardAnt)``;

const CardForm = styled(CardAnt)``;

const CollapseAnt = styled(Collapse)`
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  .ant-collapse-header {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    margin-bottom: 10px;
  }
`;
const CollapsePanelAnt = styled(Collapse.Panel)``;

export default function SearchGroup() {
  const [form] = Form.useForm();
  const handleFormSearchSubmit = (values) => {
    console.log("🚀 :: values", values);
  };
  return (
    <Wrapper>
      <CardForm border={false}>
        <CollapseAnt
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        >
          <CollapsePanelAnt header={<Typography.Text strong>Tìm kiếm</Typography.Text>}>
            <Form form={form} name="lookup text" onFinish={handleFormSearchSubmit}>
              <SearchTime />
              <SearchBox />
              <Row justify="center">
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" icon={<SearchOutlined />}>
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </CollapsePanelAnt>
        </CollapseAnt>
      </CardForm>
      <CardFilter border={false}>
        <SearchFilter />
      </CardFilter>
    </Wrapper>
  );
}
