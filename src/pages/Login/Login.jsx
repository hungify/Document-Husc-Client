import FormAuth from "components/FormAuth";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function Login({ active }) {
  const handleOnFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOnFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Wrapper>
      <FormAuth onFinish={handleOnFinish} onFailed={handleOnFailed} active={active} />
    </Wrapper>
  );
}
