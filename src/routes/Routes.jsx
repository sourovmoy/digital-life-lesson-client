import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import AddLesson from "../pages/AddLesson/AddLesson";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import MyLessons from "../pages/MyLessons/MyLessons";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import Upgrade from "../pages/Upgrade/Upgrade";
import PaymentSuccess from "../pages/Upgrade/PaymentSuccess";
import PaymentCancel from "../pages/Upgrade/PaymentCancel";
import LessonDetails from "../components/Card/LessonDetails";
import UsersHome from "../pages/Dashboard/Users/UsersHome";
import MyFavorites from "../pages/Dashboard/Users/MyFavorites/MyFavorites";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import AdminDashboard from "../layouts/AdminDashboard";
import ManageLessons from "../pages/Dashboard/Admin/ManageLessons";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/public-lessons",
        Component: PublicLessons,
      },
      {
        path: "/lessons/:id",
        element: (
          <PrivateRoute>
            <LessonDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/upgrade",
        element: (
          <PrivateRoute>
            <Upgrade />
          </PrivateRoute>
        ),
      },
      {
        path: "/upgrade/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/upgrade/cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UsersHome />,
      },
      {
        path: "/dashboard/add-lesson",
        element: <AddLesson />,
      },
      {
        path: "/dashboard/my-lesson",
        element: <MyLessons />,
      },
      {
        path: "/dashboard/my-favorites",
        element: <MyFavorites />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "/dashboard/admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/admin/manage-lessons",
        element: <ManageLessons />,
      },
      {
        path: "/dashboard/admin/profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
