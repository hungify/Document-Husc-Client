import RequireAuth from "components/RequireAuth";
import { ROLES } from "configs/roles";
import Unauthorized from "features/403/Unauthorized";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/Auth";
import DashBoard from "features/Dashboard/Dashboard";
import DetailDocument from "features/DocumentDetails/DocumentDetails";
import DraftDocuments from "features/DraftDocuments/DraftDocuments";
import Home from "features/Home/Home";
import ManageAgencies from "features/Manage/ManageAgencies/ManageAgencies";
import ManageCategories from "features/Manage/ManageCategories/ManageCategories";
import AddEditDocument from "features/Manage/ManageDocuments/AddEditDocument";
import ManageDocuments from "features/Manage/ManageDocuments/ManageDocuments";
import ManageRevokeDocuments from "features/Manage/ManageRevokeDocuments/ManageRevokeDocuments";
import ManageTypesOfDocuments from "features/Manage/ManageTypesOfDocuments/ManageTypesOfDocuments";
import ReceiverDocuments from "features/ReceiverDocuments/ReceiverDocuments";
import SentDocuments from "features/SentDocuments/SentDocuments";
import MainLayout from "layouts/MainLayout/MainLayout";

export const routePathDefinition = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        breadcrumb: "Trang chủ",
        element: <Home />,
      },
      {
        path: "detail",
        breadcrumb: null,
        children: [
          {
            path: ":documentId",
            element: <DetailDocument />,
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
            children: [
              {
                index: true,
                breadcrumb: "Văn bản đến",
                element: <ReceiverDocuments />,
              },
              {
                path: "detail",
                breadcrumb: null,
                children: [
                  {
                    path: ":inboxId",
                    element: <DetailDocument />,
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
                element: <SentDocuments />,
                breadcrumb: "Văn bản đã gửi",
              },
              {
                path: "detail",
                breadcrumb: null,
                children: [
                  {
                    path: ":forwardId",
                    element: <DetailDocument />,
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
            path: "draft",
            breadcrumb: "Văn bản nháp",
            element: <DraftDocuments />,
          },
          {
            path: "documents",
            breadcrumb: "Văn bản",
            children: [
              {
                index: true,
                element: <ManageDocuments />,
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
            element: <ManageCategories />,
          },
          {
            path: "types-of-documents",
            element: <ManageTypesOfDocuments />,
            breadcrumb: "Loại văn bản",
          },
          {
            path: "agencies",
            element: <ManageAgencies />,
            breadcrumb: "Cơ quan ban hành",
          },
          {
            path: "revoke-documents",
            element: <ManageRevokeDocuments />,
            breadcrumb: "Văn bản thu hồi",
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
