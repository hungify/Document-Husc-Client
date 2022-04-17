import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ButtonTooltip from "components/ButtonTooltip";
import TableTransfer from "components/TableTransfer";
import React from "react";

const mockData = [];
for (let i = 0; i < 100; i++) {
  mockData.push({
    key: i.toString(),
    textNumber: `${i + 1}/NQ-HĐĐH`,
    signer: `Nguyễn Văn Duy ${i}`,
    agencyIssued: "Đại học Huế",
    typeOfDocument: "Nghị quyết",
    dateIssued: "20/10/2020",
  });
}

const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);

export default function RelatedDocumentsTable() {
  const [visible, setVisible] = React.useState(false);

  const leftTableColumns = [
    {
      dataIndex: "textNumber",
      title: "Số hiệu văn bản",
    },
    {
      dataIndex: "signer",
      title: "Người ký",
    },
    {
      dataIndex: "agencyIssued",
      title: "Cơ quan ban hành",
    },
    {
      dataIndex: "typeOfDocument",
      title: "Loại văn bản",
    },
    {
      dataIndex: "dateIssued",
      title: "Ngày ban hành",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <ButtonTooltip
          icon={<EyeOutlined />}
          type="primary"
          size="small"
          shape="circle"
          onButtonClick={() => setVisible(true)}
        />
      ),
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: "textNumber",
      title: "Số hiệu văn bản",
    },
    {
      dataIndex: "signer",
      title: "Người ký",
    },
    {
      dataIndex: "agencyIssued",
      title: "Cơ quan ban hành",
    },
    {
      dataIndex: "typeOfDocument",
      title: "Loại văn bản",
    },
    {
      dataIndex: "dateIssued",
      title: "Ngày ban hành",
    },
  ];
  const [targetKeys, setTargetKeys] = React.useState(originTargetKeys);
  const handleTableTransferChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <TableTransfer
        titles={["Tất cả văn bản", "Văn bản được chọn"]}
        dataSource={mockData}
        targetKeys={targetKeys}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          simple: true,
          showLessItems: true,
        }}
        render={(item) => item.title}
        style={{ marginBottom: 16 }}
        showSearch={true}
        onChange={handleTableTransferChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </>
  );
}
