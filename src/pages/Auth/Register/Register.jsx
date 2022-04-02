import FormAuth from "components/FormAuth";
import React from "react";
import styled from "styled-components";
const Wrapper = styled.div``;
export default function Register({ active }) {
  return (
    <Wrapper>
      <FormAuth active={active} />
    </Wrapper>
  );
}
