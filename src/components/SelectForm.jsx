import { Select, Tag } from "antd";
import React from "react";

export default function SelectForm(props) {
  const { selectData, onSelect, hasTag } = props;

  const [searchSelect, setSearchSelect] = React.useState(selectData);

  const handleSelect = (value) => {
    onSelect(value);
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
    <Select {...props} onSelect={handleSelect} onSearch={handleSelectSearch} size="large">
      {searchSelect?.map((item) => (
        <Select.Option value={item.value} key={item.value}>
          {hasTag ? (
            <Tag icon={item?.icon} color={item.colorTag}>
              {item.label}
            </Tag>
          ) : (
            item.label
          )}
        </Select.Option>
      ))}
    </Select>
  );
}
