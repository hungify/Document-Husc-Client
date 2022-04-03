import "antd/dist/antd.css";
import AdminLayout from "layout/AdminLayout/AdminLayout";
import GuestLayout from "layout/GuestLayout/GuestLayout";
import UserLayout from "layout/UserLayout/UserLayout";
import DashBoard from "pages/Admin/DashBoard/Dashboard";
import ManageAgency from "pages/Admin/ManageAgency/ManageAgency";
import ManageCategory from "pages/Admin/ManageCategory/ManageCategory";
import PostEditCategory from "pages/Admin/ManageCategory/PostEditCategory";
import ManageDocument from "pages/Admin/ManageDocument/ManageDocument";
import ForgotPassword from "pages/Auth/ForgotPassword/ForgotPassword";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import TabsAuth from "pages/Auth/TabsAuth/TabsAuth";
import DocumentDetail from "pages/DocumentDetail/DocumentDetail";
import ForwardList from "pages/ForwardList/ForwardList";
import Home from "pages/Home/Home";
import InboxList from "pages/InboxList/InboxList";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "styles/global";
import "./App.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="a" element={<GuestLayout />}>
            <Route index element={<Navigate to="login" />} />

            <Route path="login" element={<TabsAuth />} />
            <Route path="register" element={<TabsAuth />} />
            <Route path="forgot" element={<TabsAuth />} />
          </Route>

          <Route path="news" element={<UserLayout />}>
            <Route index element={<Navigate to="inbox" />} />
            
            <Route path="inbox" element={<InboxList />} />
            <Route path="forward" element={<ForwardList />} />
          </Route>

          <Route path="d/:documentId" element={<DocumentDetail />} />
          {/* <Route path="v:documentId" element={<DocumentView />} /> */}
          {/* <Route path="dashboard" element={<DashBoard />}>
            <Route path="d/post" element={<DocumentDetail />} />
            <Route path="d/:documentId" element={<DocumentDetail />} />
          </Route> */}

          <Route path="m" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashBoard />} />

            <Route path="category" element={<ManageCategory />}>
              <Route index element={<h1>hello</h1>} />
              <Route path="edit:categoryId" element={<PostEditCategory />} />
              <Route path="post" element={<PostEditCategory />} />
            </Route>

            <Route path="document" element={<ManageDocument />} />
            <Route path="agency" element={<ManageAgency />} />
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
