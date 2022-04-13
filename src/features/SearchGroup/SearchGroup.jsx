import { CaretRightOutlined } from "@ant-design/icons";
import { Card, Col, Collapse, Form, Row, Space, Typography } from "antd";
import SearchBox from "features/SearchGroup/components/SearchBox";
import SearchFilter from "features/SearchGroup/components/SearchFilter";
import SearchTime from "features/SearchGroup/components/SearchTime";
import styled from "styled-components";
const Wrapper = styled.div``;

const CardAnt = styled(Card)``;

const CardFilter = styled(CardAnt)``;

const CardForm = styled(CardAnt)``;

const CollapseAnt = styled(Collapse)`
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
