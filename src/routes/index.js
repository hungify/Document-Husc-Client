import DocumentDetail from "components/DocumentDetail";
import RequireAuth from "components/RequireAuth";
import { ROLES } from "configs/roles";
import Unauthorized from "features/403/Unauthorized";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/Auth";
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
      {
        element: <RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]} />,
        children: [
          {
            path: "dashboard",
            breadcrumb: "Bảng điều khiển",
            element: <DashBoard />,
          },
          {
            path: "inbox",
            breadcrumb: "Văn bản đến",
            element: <ReceiverDocument />,
            children: [
              {
                path: "detail",
                breadcrumb: null,
                children: [
                  {
                    path: ":inboxId",
                    breadcrumb: "Thông tin chi tiết",
                    element: (
                      <RequireAuth redirectPath="/" allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
                        <ReceiverDocumentDetail />
                      </RequireAuth>
                    ),
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
        element: <RequireAuth allowedRoles={[ROLES.ADMIN]} />,
        breadcrumb: "Quản lý",
        children: [
          {
            path: "documents",
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
            path: "categories",
            breadcrumb: "Chuyên mục",
            element: <ManageCategory />,
          },
          {
            path: "document-type",
            element: <ManageDocumentType />,
            breadcrumb: "Loại văn bản",
          },
          {
            path: "agencies",
            element: <ManageAgency />,
            breadcrumb: "Cơ quan ban hành",
          },
        ],
      },
    ],
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
    breadcrumb: "403",
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
