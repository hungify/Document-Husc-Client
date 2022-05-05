import LoadingOverlay from "react-loading-overlay";

export default function LoadingOverlayApp({ active, children, ...restProps }) {
  return (
    <LoadingOverlay {...restProps} active={active}>
      {children}
    </LoadingOverlay>
  );
}
