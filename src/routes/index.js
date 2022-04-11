import DocumentDetail from "components/DocumentDetail";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/TabsAuth/TabsAuth";
import Analytics from "features/Dashboard/Analytics";
import DashBoard from "features/Dashboard/Dashboard";
import Home from "features/Home/pages/Home";
import ManageAgency from "features/Manage/pages/ManageAgency/ManageAgency";
import ManageCategory from "features/Manage/pages/ManageCategory/ManageCategory";
import AddEditDocument from "features/Manage/pages/ManageDocument/AddEditDocument";
import ManageDocument from "features/Manage/pages/ManageDocument/ManageDocument";
import ManageDocumentType from "features/Manage/pages/ManageDocumentType/ManageDocumentType";
import AddEditNotify from "features/Manage/pages/ManageNotify/AddEditNotify";
import ManageNotify from "features/Manage/pages/ManageNotify/ManageNotify";
import ForwardDetail from "features/Notifications/components/ForwardDetail";
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
    children: [
      {
        index: true,
        element: <Home />,
        breadcrumb: "Trang chủ",
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
        path: "forgot",
        element: <TabsAuth />,
        breadcrumb: "Quên mật khẩu",
      },
    ],
  },
  {
    path: "n",
    element: <UserLayout />,
    breadcrumb: "Thông báo",
    children: [
      {
        path: "dashboard",
        element: <DashBoard />,
        breadcrumb: "Bảng điều khiển",
      },
      {
        index: true,
        element: <Navigate to="dashboard" replace={true} />,
      },
      {
        path: "inbox",
        children: [
          {
            index: true,
            element: <Inbox />,
            breadcrumb: "Văn bản đến",
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
        children: [
          {
            index: true,
            element: <Forward />,
            breadcrumb: "Văn bản đã gửi",
          },
          {
            path: "detail",
            breadcrumb: null,
            children: [
              {
                path: ":forwardId",
                element: <ForwardDetail />,
                breadcrumb: "Thông tin chi tiết",
              },
            ],
          },
        ],
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
            path: "post",
            element: <AddEditDocument />,
            breadcrumb: "Thêm mới văn bản",
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
        ],
      },
      {
        path: "notification",
        breadcrumb: "Thông báo",
        children: [
          {
            index: true,
            element: <ManageNotify />,
          },
          {
            path: "post",
            element: <AddEditNotify />,
            breadcrumb: "Thêm mới thông báo",
          },
          {
            path: "edit",
            breadcrumb: null,
            children: [
              {
                path: ":documentId",
                element: <AddEditNotify />,
                breadcrumb: "Chỉnh sửa thông báo",
              },
            ],
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
