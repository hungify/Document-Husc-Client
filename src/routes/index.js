import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/TabsAuth/TabsAuth";
import DocumentDetail from "features/Home/pages/DocumentDetail";
import Home from "features/Home/pages/Home";
import Analytics from "features/Manage/pages/Analytics/Analytics";
import DashBoard from "features/Manage/pages/DashBoard/Dashboard";
import ManageAgency from "features/Manage/pages/ManageAgency/ManageAgency";
import ManageCategory from "features/Manage/pages/ManageCategory/ManageCategory";
import AddEditDocument from "features/Manage/pages/ManageDocument/AddEditDocument";
import ManageDocument from "features/Manage/pages/ManageDocument/ManageDocument";
import ManageDocumentType from "features/Manage/pages/ManageDocumentType/ManageDocumentType";
import InboxDetail from "features/Notifications/components/InboxDetail";
import Forward from "features/Notifications/pages/Forward/Forward";
import Inbox from "features/Notifications/pages/Inbox/Inbox";
import AdminLayout from "layout/AdminLayout";
import GuestLayout from "layout/GuestLayout";
import UserLayout from "layout/UserLayout";
import { Navigate } from "react-router-dom";

export const routePathDefinition = [
  {
    path: "/",
    element: <GuestLayout />,
    breadcrumb: "Trang chủ",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail",
        breadcrumb: null,
        children: [
          {
            path: ":documentId",
            element: <DocumentDetail />,
            breadcrumb: "Chi tiết văn bản",
          },
        ],
      },
    ],
  },
  {
    path: "a",
    element: <GuestLayout />,
    breadcrumb: "Tài khoản",
    children: [
      {
        index: true,
        element: <Navigate to="login" replace={true} />,
        breadcrumb: null,
      },
      {
        path: "login",
        element: <TabsAuth />,
        breadcrumb: "Đăng nhập",
      },
      {
        path: "register",
        element: <TabsAuth />,
        breadcrumb: "Đăng ký",
      },
      {
        path: "forgot-password",
        element: <TabsAuth />,
        breadcrumb: "Quên mật khẩu",
      },
    ],
  },
  {
    path: "n",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="inbox" replace={true} />,
        breadcrumb: "Thông báo",
      },
      {
        path: "inbox",
        children: [
          {
            index: true,
            element: <Inbox />,
            breadcrumb: "Hộp thư đến",
          },
          {
            path: "detail",
            breadcrumb: null,
            children: [
              {
                path: ":inboxId",
                element: <InboxDetail />,
                breadcrumb: "Thông tin chi tiết",
              },
            ],
          },
        ],
      },
      {
        path: "forward",
        element: <Forward />,
        breadcrumb: "Hộp thư chuyển tiếp",
      },
    ],
  },
  {
    path: "m",
    element: <AdminLayout />,
    breadcrumb: "Quản lý",
    children: [
      {
        index: true,
        element: <Navigate to="dashboard/analytics" replace={true} />,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        breadcrumb: "Bảng điều khiển",
        children: [
          {
            index: true,
            element: <Navigate to="analytics" replace={true} />,
          },
          {
            path: "analytics",
            element: <Analytics />,
            breadcrumb: "Thống kê",
          },
        ],
      },
      {
        path: "document",
        breadcrumb: "Văn bản",
        children: [
          {
            index: true,
            element: <ManageDocument />,
          },
          {
            path: "edit",
            breadcrumb: null,
            children: [
              {
                path: ":documentId",
                element: <AddEditDocument />,
                breadcrumb: "Chỉnh sửa văn bản",
              },
            ],
          },
          {
            path: "post",
            element: <AddEditDocument />,
            breadcrumb: "Thêm mới văn bản",
          },
        ],
      },
      {
        path: "category",
        breadcrumb: "Chuyên mục",
        element: <ManageCategory />,
      },
      {
        path: "document-type",
        element: <ManageDocumentType />,
        breadcrumb: "Loại văn bản",
      },
      {
        path: "agency",
        element: <ManageAgency />,
        breadcrumb: "Cơ quan ban hành",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
