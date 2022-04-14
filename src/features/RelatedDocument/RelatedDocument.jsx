import { Table } from "antd";
const data = [
  {
    key: "1",
    based_on_document: "1. Văn băn số 1",
  },
  {
    key: "2",
    guide_on_document: "1. Văn bản số 2",
  },
];

export default function RelatedDocument() {
  return (
    <Table dataSource={data}>
      <Table.Column title="Văn bản căn cứ" dataIndex="based_on_document" key="based_on_document" />
      <Table.Column
        title="Văn bản được hướng dẫn"
        dataIndex="guide_on_document"
        key="guide_on_document"
      />
    </Table>
  );
}
