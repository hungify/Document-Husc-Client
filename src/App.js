import "antd/dist/antd.css";
import DashBoard from "pages/Admin/DashBoard/Dashboard";
import DocumentDetail from "pages/DocumentDetail/DocumentDetail";
import DocumentView from "pages/DocumentView/DocumentView";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";
import Home from "pages/Home/Home";
import Register from "pages/Register/Register";
import { default as Login, default as TabsAuth } from "pages/TabsAuth/TabsAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="a" element={<TabsAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<ForgotPassword />} />
          </Route>
          <Route path="d/:documentId" element={<DocumentDetail />} />
          <Route path="v:documentId" element={<DocumentView />} />
          {/* <Route path="dashboard" element={<DashBoard />}>
            <Route path="d/post" element={<DocumentDetail />} />
            <Route path="d/:documentId" element={<DocumentDetail />} />
          </Route> */}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
