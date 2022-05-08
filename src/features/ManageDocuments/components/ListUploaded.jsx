import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  line-height: 1.5715;
`;
const WrapLink = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ButtonLink = styled(Button)`
  transition: background-color 0.3s ease-in-out;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export default function ListUploaded({ fileList }) {
  const handlePreviewFileClick = (file) => {
    const blob = URL.createObjectURL(file.originFileObj);
    window.open(blob, {
      target: "_blank",
      rel: "noopener noreferrer",
    });
  };
  return (
    <Wrapper>
      {fileList?.map((file) => (
        <WrapLink key={file.uid}>
          <ButtonLink type="link" onClick={() => handlePreviewFileClick(file)}>
            {file.name}
          </ButtonLink>
        </WrapLink>
      ))}
    </Wrapper>
  );
}
