import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Webboard from "./pages/webboard/Webboard";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Signup";
import Like from "./pages/like/Like";
import Notification from "./pages/notification/Notification";
import Page from "./pages/page/Page";
import Profile from "./pages/profile/Profile";
import Recommended from "./pages/recommend/Recommended";
import EditProfile from "./pages/profile/ProfileOther";
import Reply from "./pages/webboard/Reply";
import ProfileOther from "./pages/profile/ProfileOther";
import Footprint from "./pages/profile/Footprint";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/like", element: <Like /> },
  { path: "/notification", element: <Notification /> },
  { path: "/page", element: <Page /> },
  { path: "/profile/", element: <Profile /> },
  { path: "/recommended", element: <Recommended /> },
  { path: "/webboard", element: <Webboard /> },
  { path: "/reply", element: <Reply /> },
  { path: "/profileother", element: <ProfileOther /> },
  { path: "/footprint", element: <Footprint /> },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
