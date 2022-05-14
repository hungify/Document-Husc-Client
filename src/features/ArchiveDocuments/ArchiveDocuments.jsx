import { Card, Typography } from "antd";
import { getDocumentsArchived, getTotalArchived } from "app/selectors/archives";
import ListDocument from "components/DocumentList";
import { fetchArchivesDocuments } from "features/ArchiveDocuments/archivesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ArchiveDocuments() {
  const archived = useSelector(getDocumentsArchived);
  const totalArchived = useSelector(getTotalArchived);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchArchivesDocuments());
  }, [dispatch]);

  return (
    <Card title={<Typography.Text strong>{totalArchived} Văn bản thu hồi</Typography.Text>}>
      <ListDocument dataSource={archived} />
    </Card>
  );
}
