import FormAuth from "features/Auth/components/FormAuth";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function ForgotPassword({ active }) {
  const handleOnFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOnFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Wrapper>
      <FormAuth active={active} onFinish={handleOnFinish} onFailed={handleOnFailed} />
    </Wrapper>
  );
}
