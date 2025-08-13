import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BookList from "../Pages/BookList/BookList";
import EditBoxPage from "../Pages/Boxes/EditBox";
import OrderList from "../Pages/OrderList/OrderList";
import ReviewsPage from "../Pages/Reviews/Reviews";
import BlogPage from "../Pages/Blog/Blog";
import AdminManagementPage from "../Pages/Admin/Admin";
import SendMailAll from "../Pages/SendMailAll/SendMailAll";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },

  {
    path: "/forgate-password",
    element: <ForgatePassword />,
  },
  {
    path: "/verification",
    element: <VerifyPass />,
  },

  {
    path: "/new-password",
    element: <Newpass />,
  },
   {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/book-list",
            element: <BookList />,
          },
          {
            path: "/order-list",
            element: <OrderList />,
          },
          {
            path: "/add-book-to-invoice",
            element: <EditBoxPage />,
          },
          {
            path: "/reviews",
            element: <ReviewsPage />,
          },
          {
            path: "/send-mail-all",
            element: <SendMailAll />,
          },
          {
            path: "/blog",
            element: <BlogPage />,
          },
          {
            path: "/administrator",
            element: <AdminManagementPage />,
          },
          {
            path: "/settings/about-us",
            element: <AboutUs />,
          },
          {
            path: "/settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/admin-profile",
            element: <AdminProfile />,
          },

        ],
      },
]);
