import "antd/dist/antd.css";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/TabsAuth/TabsAuth";
import Home from "features/Home/Home";
import DocumentDetail from "features/Home/pages/DocumentDetail";
import DashBoard from "features/Manage/pages/DashBoard/Dashboard";
import ManageAgency from "features/Manage/pages/ManageAgency/ManageAgency";
import ManageCategory from "features/Manage/pages/ManageCategory/ManageCategory";
import PostEditCategory from "features/Manage/pages/ManageCategory/PostEditCategory";
import ManageDocument from "features/Manage/pages/ManageDocument/ManageDocument";
import Forward from "features/Notifications/pages/Forward/Forward";
import Inbox from "features/Notifications/pages/Inbox/Inbox";
import AdminLayout from "layout/AdminLayout";
import GuestLayout from "layout/GuestLayout";
import UserLayout from "layout/UserLayout";

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
            <Route index element={<Navigate to="login" replace={true} />} />

            <Route path="login" element={<TabsAuth />} />
            <Route path="register" element={<TabsAuth />} />
            <Route path="forgot" element={<TabsAuth />} />
          </Route>

          <Route path="notifications" element={<UserLayout />}>
            <Route index element={<Navigate to="inbox" replace={true} />} />

            <Route path="inbox" element={<Inbox />} />
            <Route path="forward" element={<Forward />} />
          </Route>

          <Route path="d/:documentId" element={<DocumentDetail />} />

          <Route path="m" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace={true} />} />

            <Route path="dashboard" element={<DashBoard />} />
            <Route path="category">
              <Route index element={<ManageCategory />} />
              <Route path="post" element={<PostEditCategory />}>
                <Route path=":categoryId" element={<PostEditCategory />} />
              </Route>
            </Route>

            <Route path="document" element={<ManageDocument />} />
            <Route path="agency" element={<ManageAgency />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
