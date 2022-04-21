import { Empty, Table, Transfer } from "antd";
import { difference } from "lodash";
import styled from "styled-components";
const TransferAnt = styled(Transfer)`
  .ant-input-affix-wrapper.ant-transfer-list-search {
    & ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: transparent;
    }
    & ::-moz-placeholder {
      /* Firefox 19+ */
      color: transparent;
    }
    & :-ms-input-placeholder {
      /* IE 10+ */
      color: transparent;
    }
    & :-moz-placeholder {
      /* Firefox 18- */
      color: transparent;
    }

    & input {
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1'><text x='0' y='15' fill='gray' font-size='15'>Tìm kiếm theo tên</text></svg>");
      background-repeat: no-repeat;
    }

    & input:focus {
      background-image: none;
    }
  }
`;

export default function TransferTable({ leftColumns, rightColumns, ...restProps }) {
  return (
    <TransferAnt {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            locale={{
              emptyText: (
                <span>
                  <Empty description="Danh sách trống" />
                </span>
              ),
            }}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
          />
        );
      }}
    </TransferAnt>
  );
}
