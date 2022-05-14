import RequireAuth from "components/RequireAuth";
import { ROLES } from "configs/roles";
import Unauthorized from "features/403/Unauthorized";
import NotFound from "features/404/NotFound";
import TabsAuth from "features/Auth/Auth";
import DashBoard from "features/Dashboard/Dashboard";
import DetailDocument from "features/DocumentDetails/DocumentDetails";
import DraftDocuments from "features/DraftDocuments/DraftDocuments";
import Home from "features/Home/Home";
import ReceiverDocuments from "features/InboxDocuments/InboxDocuments";
import ManageRevokeDocuments from "features/Manage/ManageRevokeDocuments/ManageRevokeDocuments";
import ManageAgencies from "features/ManageAgencies/ManageAgencies";
import ManageCategories from "features/ManageCategories/ManageCategories";
import ManageDepartments from "features/ManageDepartments/ManageDepartments";
import AddOrEditDocument from "features/ManageDocuments/AddOrEditDocument";
import ManageTypesOfDocuments from "features/ManageTypesOfDocuments/ManageTypesOfDocuments";
import Profile from "features/Profile/Profile";
import SentDocuments from "features/SentDocuments/SentDocuments";
import MainLayout from "layouts/MainLayout/MainLayout";

export const routePathDefinition = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        breadcrumb: "Trang chủ",
        index: true,
        element: <Home />,
      },
      {
        path: "detail",
        breadcrumb: null,
        children: [
          {
            path: ":slug",
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
            path: "profile",
            breadcrumb: "Thông tin tài khoản",
            element: <Profile />,
          },
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
                path: ":slug",
                element: <DetailDocument />,
                breadcrumb: "Thông tin chi tiết",
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
                path: ":slug",
                element: <DetailDocument />,
                breadcrumb: "Thông tin chi tiết",
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={[ROLES.ADMIN]} />,
        breadcrumb: "Quản lý",
        children: [
          {
            path: "issue",
            element: <AddOrEditDocument />,
            breadcrumb: "Ban hành văn bản",
          },
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
                element: <Home />,
              },
              {
                path: "edit",
                breadcrumb: null,
                children: [
                  {
                    path: ":slug",
                    element: <AddOrEditDocument />,
                    breadcrumb: "Chỉnh sửa văn bản",
                  },
                ],
              },
            ],
          },
          {
            path: "departments",
            element: <ManageDepartments />,
            breadcrumb: "Cơ quan ban hành",
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
