import DocumentDetail from "pages/DocumentDetail/DocumentDetail";
import DocumentView from "pages/DocumentView/DocumentView";
import Home from "pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Login from "pages/TabsAuth/TabsAuth";
import TabsAuth from "pages/TabsAuth/TabsAuth";
import Register from "pages/Register/Register";
import ForgotPassword from "pages/ForgotPassword/ForgotPassword";

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
