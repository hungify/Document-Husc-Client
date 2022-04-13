import { Col, DatePicker, Row, Select, TreeSelect, Typography } from "antd";
import TreeSelectForm from "components/TreeSelectForm";

export default function SearchAdvanced(props) {
  const {
    dataDocument,
    dataAgency,
    onDocumentChange,
    onAgencyChange,
    onSelectDateChange,
    onTreeCategorySelect,
    onDatePickerChange,
    onDateOk,
    categoriesTreeValue,
  } = props;
  return (
    <Row gutter={[10, 10]}>
      <Col span={7}>
        <Select
          size="large"
          defaultActiveFirstOption={false}
          showArrow={true}
          filterOption={false}
          notFoundContent={true}
          allowClear={true}
          showSearch={true}
          // onSearch={handleSearchDocument}
          onChange={onDocumentChange}
          style={{ width: "100%" }}
          placeholder="Chọn loại văn bản"
        >
          {dataDocument.map((document) => (
            <Select.Option key={document.key} value={document.key}>
              {document.title}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={10}>
        <TreeSelectForm
          treeData={categoriesTreeValue}
          onTreeSelect={onTreeCategorySelect}
          placeholder="Chọn chuyên mục"
          allowClear
          size="large"
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          style={{
            width: "100%",
          }}
        />
      </Col>
      <Col span={7}>
        <Select
          size="large"
          showSearch
          defaultActiveFirstOption={false}
          showArrow={true}
          filterOption={false}
          notFoundContent={true}
          allowClear
          // onSearch={handleSearchAgency}
          onChange={onAgencyChange}
          style={{ width: "100%" }}
          placeholder="Chọn cơ quan ban hành"
        >
          {dataAgency.map((agency) => (
            <Select.Option key={agency.id} value={agency.value}>
              {agency.title}
            </Select.Option>
          ))}
        </Select>
      </Col>

      <Col span={24} style={{ marginLeft: "26px", marginBottom: "5px" }}>
        <Typography.Text strong>Tìm kiếm trong khoảng thời gian</Typography.Text>
      </Col>
      <Col span={6}>
        <Select
          style={{
            width: "100%",
          }}
          size="large"
          onChange={onSelectDateChange}
          defaultValue="Chọn thời gian"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value="Ngày phát hành">Ngày phát hành</Select.Option>
          <Select.Option value="Ngày cập nhật">Ngày cập nhật</Select.Option>
        </Select>
      </Col>
      <Col span={6}>
        <DatePicker.RangePicker
          size="large"
          format="DD/MM/YYYY"
          onChange={onDatePickerChange}
          onOk={onDateOk}
        />
      </Col>
    </Row>
  );
}
