import { default as Loading } from "react-loading-overlay";
import HashLoader from "react-spinners/HashLoader";

export default function LoadingOverlay({ active, children }) {
  return (
    <Loading active={active} spinner={<HashLoader size={50} color="#36D7B7" />}>
      {children}
    </Loading>
  );
}
