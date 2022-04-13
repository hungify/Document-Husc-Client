// import "antd/dist/antd.css";
// import RequireAuth from "components/RequireAuth";
// import { ROLES } from "config/roles";
// import "draft-js/dist/Draft.css";
// import Unauthorized from "features/403/Unauthorized";
// import NotFound from "features/404/NotFound";
// import Auth from "features/Auth/Auth";
// import ForgotPassword from "features/Auth/pages/ForgotPassword";
// import Login from "features/Auth/pages/Login";
// import Register from "features/Auth/pages/Register";
// import DashBoard from "features/Dashboard/Dashboard";
// import Home from "features/Home/Home";
// import ReceiverDocument from "features/ReceiverDocument/ReceiverDocument";
// import ReceiverDocumentDetail from "features/ReceiverDocument/ReceiverDocumentDetail";
// import SentDocument from "features/SentDocument/SentDocument";
// import SentDocumentDetail from "features/SentDocument/SentDocumentDetail";
// import MainLayout from "layouts/MainLayout/MainLayout";
// import { Routes } from "react-router-dom";
// import { createRoutesFromChildren, Route } from "use-react-router-breadcrumbs";

// const GenerateAppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<Home />} />

//         <Route element={<Auth />}>
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="forgot" element={<ForgotPassword />} />
//         </Route>

//         <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]} />}>
//           <Route path="dashboard" element={<DashBoard />} />
//           <Route path="inbox" element={<ReceiverDocument />}>
//             Auth
//             <Route path=":inboxId" element={<ReceiverDocumentDetail />} />
//           </Route>
//           <Route path="forward" element={<SentDocument />}>
//             <Route path="detail/:forwardId" element={<SentDocumentDetail />} />
//           </Route>
//         </Route>
//         <Route path="inbox/:inboxId" element={<ReceiverDocumentDetail />} />
//         <Route path="unauthorized" element={<Unauthorized />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// const AppRoutes = GenerateAppRoutes();
// export const appRouteObjects = createRoutesFromChildren(AppRoutes);
