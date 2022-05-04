import "antd/dist/antd.css";
import { fetchConfigApp } from "app/reducers/configSlice";
import "draft-js/dist/Draft.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import { routePathDefinition } from "routes";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchConfigApp(true));
  }, [dispatch]);

  const AppRoutes = useRoutes(routePathDefinition);

  return AppRoutes;
}

export default App;
