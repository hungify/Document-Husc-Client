import "antd/dist/antd.css";
import LoadingOverlayApp from "components/LoadingOverlayApp";
import { useRoutes } from "react-router-dom";
import { routePathDefinition } from "routes";
import React from "react";
import "./App.css";
function App() {
  const AppRoutes = useRoutes(routePathDefinition);

  return <React.Suspense fallback={<LoadingOverlayApp />}>{AppRoutes}</React.Suspense>;
}

export default App;
