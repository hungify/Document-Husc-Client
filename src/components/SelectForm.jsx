import { Select, Tag } from "antd";
import React from "react";

export default function SelectForm(props) {
  const [searchSelect, setSearchSelect] = React.useState(props.data);

  const handleSelectChange = (value) => {
    props.onSelectChange(value);
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
      onSelect={handleSelectChange}
      onSearch={handleSelectSearch}
      showSearch
      size="large"
    >
      {searchSelect?.map((data) =>
        props.agency || props.document ? (
          <Select.Option value={data.id} key={data.id}>
            {data.value}
          </Select.Option>
        ) : (
          <Select.Option value={data.id} key={data.id}>
            <Tag icon={data?.icon} color={data.colorTag}>
              {data.value}
            </Tag>
          </Select.Option>
        )
      )}
    </Select>
  );
}
