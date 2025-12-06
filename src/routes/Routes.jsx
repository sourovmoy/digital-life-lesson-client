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
        path: "/upgrade",
        element: (
          <PrivateRoute>
            <Upgrade />
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
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/add-lesson",
        element: <AddLesson />,
      },
      {
        path: "/dashboard/my-lesson",
        element: <MyLessons />,
      },
    ],
  },
]);
