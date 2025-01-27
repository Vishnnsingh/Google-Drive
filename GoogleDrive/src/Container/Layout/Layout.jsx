import React from "react";
import Header from "../../Components/Header/Header";
import Styles from "../Layout/Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
const Layout = () => {
  return (
    <div>
      <Header />

      <div className={Styles.homecontainer}>
      <Sidebar />
      <Outlet />
      </div>
       
    </div>
  );
};

export default Layout;
