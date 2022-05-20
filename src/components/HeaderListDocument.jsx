import { Card, Col, Divider, Row, Typography } from "antd";
import { getTotalDocumentsMatch } from "app/selectors/documents";
import { getSearchGroup, getSearchDateRange } from "app/selectors/searchGroup";
import SortFilter from "components/SortFilter";
import { setSortBy } from "features/SearchGroup/searchGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CardAnt = styled(Card)`
  background-color: rgba(248, 250, 252, 1);
`;

const dataRadio = [
  {
    label: "Ngày ban hành",
    value: "createdAt",
  },
  {
    label: "Ngày cập nhật",
    value: "updatedAt",
  },
];
export default function HeaderListDocument({ children }) {
  const dispatch = useDispatch();

  const handleRadioDateChange = (value) => {
    dispatch(setSortBy({ sortBy: value, triggerBy: "documents" }));
  };

  const search = useSelector(getSearchGroup);
  const totalMatch = useSelector(getTotalDocumentsMatch);
  const searchDateRange = useSelector(getSearchDateRange);

  return (
    <>
      <CardAnt>
        <Row>
          {search?.searchText && (
            <Col span={16}>
              Có&nbsp;
              <Typography.Text strong>{totalMatch}</Typography.Text>
              &nbsp;kết quả chứa từ khóa:
              <Typography.Text strong>&nbsp; {search.searchText}</Typography.Text>
            </Col>
          )}
          {searchDateRange?.start && (
            <Col span={16}>
              Có&nbsp;
              <Typography.Text strong>{totalMatch}</Typography.Text>
              &nbsp;kết quả từ ngày
              <Typography.Text strong>
                &nbsp;
                {searchDateRange.start}
              </Typography.Text>
              &nbsp; đến ngày
              <Typography.Text strong> {searchDateRange.end}</Typography.Text>
            </Col>
          )}

          <Col span={8}>
            <SortFilter dataRadio={dataRadio} onRadioChange={handleRadioDateChange} />
          </Col>
          <Divider />
          <Col span={24}>{children}</Col>
        </Row>
      </CardAnt>
    </>
  );
}
