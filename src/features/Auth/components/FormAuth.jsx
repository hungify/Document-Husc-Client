import { Col, Row } from "antd";
import React from "react";
import { HeroBg } from "assets/images";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: #d9edff;
`;

const FormAuthInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  width: 95%;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  margin: 0 auto;
  border-radius: 12px;
`;
const WrapperHero = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 600px;
  min-height: 100%;
  background-color: #fffdf2;
  img {
    display: block;
    width: 100%;
  }
`;
const RowAnt = styled(Row)`
  width: 100%;
`;

export default function FormAuth({ children, active }) {
  return (
    <Wrapper forgot={active === "forgot" ? 1 : 0}>
      <FormAuthInner forgot={active === "forgot" ? 1 : 0}>
        <RowAnt>
          <Col span={12}>
            <WrapperHero>
              <img src={HeroBg} alt="background hero" />
            </WrapperHero>
          </Col>
          <Col span={12}>{children}</Col>
        </RowAnt>
      </FormAuthInner>
    </Wrapper>
  );
}
