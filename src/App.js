import "antd/dist/antd.css";
import LoadingOverlayApp from "components/LoadingOverlayApp";
import { useRoutes } from "react-router-dom";
import { routePathDefinition } from "routes";
import React from "react";
import "./App.css";
import { PulseLoader } from "react-spinners";
function App() {
  const AppRoutes = useRoutes(routePathDefinition);

  return (
    <React.Suspense
      fallback={
        <LoadingOverlayApp spinner={<PulseLoader size={15} color="#F5A623" />} active={true} />
      }
    >
      {AppRoutes}
    </React.Suspense>
  );
}

export default App;
