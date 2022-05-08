import LoadingOverlay from "react-loading-overlay";
import ClipLoader from "react-spinners/ClipLoader";
LoadingOverlay.propTypes = undefined;
export default function LoadingOverlayApp({ active, children, ...restProps }) {
  return (
    <LoadingOverlay
      spinner={<ClipLoader size={35} />}
      {...restProps}
      active={active}
      styles={{
        overlay: (base) => ({
          ...base,
          height: "100%",
          width: "100%",
          zIndex: "9999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "0",
          left: "0",
          overflow: "hidden",
          pointerEvents: "none",
          opacity: "1",
        }),
      }}
    >
      {children}
    </LoadingOverlay>
  );
}
