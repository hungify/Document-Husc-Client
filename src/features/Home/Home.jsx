import HeaderListDocument from "components/HeaderListDocument";
import ListDocument from "components/ListDocument";
import SearchGroup from "features/SearchGroup/SearchGroup";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  background-color: rgba(248, 250, 252, 1);
`;
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: new Date().getTime() + i,
    title: `21/NQ-HĐĐH : Nghị quyết về việc công nhận Hiệu trưởng Trường Đại học Y - Dược, Đại học Huế nhiệm kỳ 2020 - 2025`,
    avatar: "Admin",
    textNumber: "21/NQ-HĐĐH",
    signer: "Nguyễn Vũ Quốc Huy",
    dateIssued: "2020-05-01",
    authorityIssuing: "Đại Học Huế",
    urgency: "Bình thường",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}
export default function Home() {
  return (
    <Wrapper>
      <SearchGroup />
      <HeaderListDocument>
        <ListDocument dataRender={listData} />
      </HeaderListDocument>
    </Wrapper>
  );
}
