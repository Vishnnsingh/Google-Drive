import React, { useContext, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Styles from "../Layout/Layout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { UserContext } from "../../App";
const Layout = () => {

  
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    let localStroageUser =localStorage.getItem("userDetails");
    if(localStroageUser){
      localStroageUser = JSON.parse(localStroageUser)
      userCtx.setUser(localStroageUser)
    }
    const isLoggedIn = userCtx.user.displayname || localStroageUser.displayname;
    if(!isLoggedIn){
       navigate("/");
    }
  },[])

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
