import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./components/layout/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./page/home/Home.jsx";
import AboutUs from "./page/about-us/AboutUs.jsx";
import SportClub from "./page/sport-club/SportClub.jsx";
import Events from "./page/events/Events.jsx";
import News from "./page/news/News.jsx";
import History from "./page/history/History.jsx";
import Login from "./page/auth/login/Login.jsx";
import Register from "./page/auth/register/Register.jsx";
import SportClubDetail from "./page/sportclub-details/SportClubDetail.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import SportNewClub from "./page/sport-club/SportNewClub.jsx";
import SportNewDital from "./page/sport-club/SportNewDital.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      // {
      //   path: "/home",
      //   element: <Home />,
      // },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/sport-club",
        element: <SportClub />,
      },
      {
        path: "/sportclub-details",
        element: <SportClubDetail />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/sportClub",
        element: <SportNewClub />,
      },
      {
        path: "/spordDital",
        element: <SportNewDital/>
      },
      // {
      //   path: "/product-detail",
      //   element: <ProductDetail />,
      // },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
