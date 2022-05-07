import { Empty, Table, Transfer } from "antd";
import { getPage, getPageSize } from "app/selectors/searchGroup";
import { setPage, setPageSize } from "features/SearchGroup/searchGroupSlice";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TransferTableRelated({
  leftColumns,
  rightColumns,
  targetKeys,
  dataSource,
  ...restProps
}) {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const pageSize = useSelector(getPageSize);
  const [pageFilter, setPageFilter] = React.useState(1);
  const [pageSizeFilter, setPageSizeFilter] = React.useState(10);
  const [dataRight, setDataRight] = React.useState([]);

  React.useEffect(() => {
    const newDataSource = dataSource.filter((i) => {
      return targetKeys.find((k) => k === i._id);
    });
    setDataRight([...newDataSource]);
  }, [targetKeys]);

  return (
    <Transfer {...restProps} dataSource={dataSource} targetKeys={targetKeys}>
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
              .map(({ _id }) => _id);
            const diffKeys = selected
              ? _.difference(treeSelectedKeys, listSelectedKeys)
              : _.difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect(item, selected) {
            onItemSelect(item._id, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={direction === "left" ? filteredItems : dataRight}
            rowKey={(record) => record._id}
            pagination={{
              pageSize: direction === "left" ? pageSize : pageSizeFilter,
              current: direction === "left" ? page : pageFilter,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} kết quả`,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              onChange: (page) => {
                if (direction === "left") {
                  dispatch(setPage({ page, triggerBy: "documents" }));
                } else {
                  setPageFilter(page);
                }
              },
              onShowSizeChange: (current, size) => {
                if (direction === "left") {
                  dispatch(setPageSize({ size, triggerBy: "documents" }));
                } else {
                  setPageSizeFilter(size);
                }
              },
            }}
            locale={{
              emptyText: <Empty description="Danh sách trống" />,
            }}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
          />
        );
      }}
    </Transfer>
  );
}
