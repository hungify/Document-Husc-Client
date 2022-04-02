import "antd/dist/antd.css";
import DashBoard from "pages/Admin/DashBoard/Dashboard";
import ForgotPassword from "pages/Auth/ForgotPassword/ForgotPassword";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import TabsAuth from "pages/Auth/TabsAuth/TabsAuth";
import DocumentDetail from "pages/DocumentDetail/DocumentDetail";
import ForwardList from "pages/ForwrardList/ForwardList";
import Home from "pages/Home/Home";
import InboxList from "pages/InboxList/InboxList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "styles/global";
import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="a" element={<TabsAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<ForgotPassword />} />
          </Route>

          <Route path="notifications" element={<InboxList />}>
            <Route path="inbox" element={<InboxList />} />
            <Route path="forward" element={<ForwardList />} />
          </Route>

          <Route path="d/:documentId" element={<DocumentDetail />} />
          {/* <Route path="v:documentId" element={<DocumentView />} /> */}
          {/* <Route path="dashboard" element={<DashBoard />}>
            <Route path="d/post" element={<DocumentDetail />} />
            <Route path="d/:documentId" element={<DocumentDetail />} />
          </Route> */}

          <Route path="m">
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="category" element={<DocumentDetail />} />
            <Route path="document" element={<DocumentDetail />} />
          </Route>
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
    </>
  );
}

export default App;
