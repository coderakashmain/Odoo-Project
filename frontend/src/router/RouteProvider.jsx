import React from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import routeList from "./Routes";
import Layout from "../layout/layout";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/signup/signup";
import ForgotPass from "../component/Login/Foregetpass";

function RouteProvider() {
  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgotPass />} />
      <Route path="/" element={<Layout />}>
        {routeList.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Route>
    </ReactRoutes>
  );
}

export default RouteProvider;
