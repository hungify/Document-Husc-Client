import { lazy } from "react";

import { ROLES } from "configs/roles";
const RequireAuth = lazy(() => import("components/RequireAuth"));
const Unauthorized = lazy(() => import("features/403/Unauthorized"));
const NotFound = lazy(() => import("features/404/NotFound"));
const TabsAuth = lazy(() => import("features/Auth/Auth"));
const DashBoard = lazy(() => import("features/Dashboard/Dashboard"));
const DocumentDetails = lazy(() => import("features/DocumentDetails/DocumentDetails"));
const DraftDocuments = lazy(() => import("features/DraftDocuments/DraftDocuments"));
const Home = lazy(() => import("features/Home/Home"));
const InboxDocuments = lazy(() => import("features/InboxDocuments/InboxDocuments"));
const ArchiveDocuments = lazy(() => import("features/ArchiveDocuments/ArchiveDocuments"));
const ManageAgencies = lazy(() => import("features/ManageAgencies/ManageAgencies"));
const ManageCategories = lazy(() => import("features/ManageCategories/ManageCategories"));
const ManageDepartments = lazy(() => import("features/ManageDepartments/ManageDepartments"));
const AddOrEditDocument = lazy(() => import("features/ManageDocuments/AddOrEditDocument"));
const ManageTypesOfDocuments = lazy(() =>
  import("features/ManageTypesOfDocuments/ManageTypesOfDocuments")
);
const Profile = lazy(() => import("features/Profile/Profile"));
const SentDocuments = lazy(() => import("features/SentDocuments/SentDocuments"));
const MainLayout = lazy(() => import("layouts/MainLayout/MainLayout"));

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
            element: <DocumentDetails />,
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
                element: <InboxDocuments />,
              },
              {
                path: ":slug",
                element: <DocumentDetails />,
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
                element: <DocumentDetails />,
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
            path: "archives",
            element: <ArchiveDocuments />,
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
