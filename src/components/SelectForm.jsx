import { Select, Tag } from "antd";
import React from "react";

export default function SelectForm(props) {
  const { selectData, onSelectChange, hasTag, selectedKey } = props;

  const [searchSelect, setSearchSelect] = React.useState(selectData);

  const handleSelectChange = (value) => {
    onSelectChange(value);
  };
  const handleSelectSearch = (value) => {
    if (value) {
      setSearchSelect(searchSelect.filter((item) => item.value.includes(value)));
    } else {
      setSearchSelect(props.data);
    }
    if (searchSelect.length === 0) {
      setSearchSelect(props.data);
    }
  };

  return (
    <Select
      {...props}
      value={selectedKey}
      onSelect={handleSelectChange}
      onSearch={handleSelectSearch}
      showSearch
      size="large"
    >
      {searchSelect?.map((data) => (
        <Select.Option value={data.value} key={data.value}>
          {hasTag ? (
            <Tag icon={data?.icon} color={data.colorTag}>
              {data.label}
            </Tag>
          ) : (
            data.label
          )}
        </Select.Option>
      ))}
    </Select>
  );
}
