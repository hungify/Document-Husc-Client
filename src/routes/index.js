import DocumentDetail from "components/DocumentDetail";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/TabsAuth/TabsAuth";
import DashBoard from "features/Dashboard/Dashboard";
import Home from "features/Home/Home";
import ManageAgency from "features/Manage/pages/ManageAgency/ManageAgency";
import ManageCategory from "features/Manage/pages/ManageCategory/ManageCategory";
import AddEditDocument from "features/Manage/pages/ManageDocument/AddEditDocument";
import ManageDocument from "features/Manage/pages/ManageDocument/ManageDocument";
import ManageDocumentType from "features/Manage/pages/ManageDocumentType/ManageDocumentType";
import ReceiverDocument from "features/ReceiverDocument/ReceiverDocument";
import ReceiverDocumentDetail from "features/ReceiverDocument/ReceiverDocumentDetail";
import SentDocument from "features/SentDocument/SentDocument";
import SentDocumentDetail from "features/SentDocument/SentDocumentDetail";
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
            element: <ReceiverDocument />,
            breadcrumb: "Văn bản đến",
          },
          {
            path: "detail",
            breadcrumb: null,
            children: [
              {
                path: ":inboxId",
                element: <ReceiverDocumentDetail />,
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
            element: <SentDocument />,
            breadcrumb: "Văn bản đã gửi",
          },
          {
            path: "detail",
            breadcrumb: null,
            children: [
              {
                path: ":forwardId",
                element: <SentDocumentDetail />,
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
        element: <Navigate to="dashboard" replace={true} />,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        breadcrumb: "Bảng điều khiển",
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
            breadcrumb: "Ban hành",
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
