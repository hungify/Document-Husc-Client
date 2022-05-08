import LoadingOverlay from "react-loading-overlay";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
const Overlay = styled(LoadingOverlay)`
  height: 100%;
  width: 100%;
  z-index: 999;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  transition: 0.5s;
`;

export default function LoadingOverlayApp({ active, children, ...restProps }) {
  return (
    <Overlay spinner={<ClipLoader size={35}/>} {...restProps} active={active}>
      {children}
    </Overlay>
  );
}
