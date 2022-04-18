import { Transfer } from "antd";
import RecipientTable from "features/IssueDocument/components/RecipientTable";

export default function TransferTable({ leftColumns, rightColumns, ...restProps }) {
  return (
    <Transfer {...restProps} showSelectAll={false}>
      {(props) => {
        const { direction } = props;
        const columns = direction === "left" ? leftColumns : rightColumns;

        return <RecipientTable {...props} columns={columns} />;
      }}
    </Transfer>
  );
}
