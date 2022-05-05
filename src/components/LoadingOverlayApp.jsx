import LoadingOverlay from "react-loading-overlay";
import styled from "styled-components";
const Overlay = styled(LoadingOverlay)`
  height: 100vh;
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
    <Overlay {...restProps} active={active}>
      {children}
    </Overlay>
  );
}
