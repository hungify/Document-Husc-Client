import DocumentDetail from "components/DocumentDetail";
import RequireAuth from "components/RequireAuth";
import { ROLES } from "config/roles";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/Auth";
import Unauthorized from "features/Auth/pages/Unauthorized";
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
import MainLayout from "layouts/MainLayout/MainLayout";
import { Navigate } from "react-router-dom";

export const routePathDefinition = [
  {
    path: "/",
    element: <MainLayout />,
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
      {
        path: "dashboard",
        element: (
          <RequireAuth redirectPath="/" allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
            <DashBoard />
          </RequireAuth>
        ),
        breadcrumb: "Bảng điều khiển",
      },
      {
        path: "inbox",
        breadcrumb: "Văn bản đến",
        element: (
          <RequireAuth redirectPath="/" allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
            <ReceiverDocument />
          </RequireAuth>
        ),
        children: [
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
      {
        path: "unauthorized",
        element: <Unauthorized />,
        breadcrumb: "Không có quyền truy cập",
      },
    ],
  },
  {
    path: "a",
    element: <MainLayout />,
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
    path: "m",
    element: <MainLayout />,
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
