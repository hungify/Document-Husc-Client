import "antd/dist/antd.css";
import { useRoutes } from "react-router-dom";
import { routePathDefinition } from "routes";
import "./App.css";
function App() {
  const AppRoutes = useRoutes(routePathDefinition);

  return AppRoutes;
}

export default App;
