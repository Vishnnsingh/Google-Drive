import React from "react";

import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../Config/firebase'
import { useNavigate } from "react-router-dom"
import Styles from "../../Container/Login/Login.module.css";
// import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";
import Logins from "../../assets/Logins.jpg";
import { UserContext } from "../../App";
import { useContext } from 'react';


const Login = () => {

  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  
  
  const onLoginClick = async () =>{
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      
      const userDetails = {
        displayname: res.user.displayName,
        email: res.user.email,
        uid: res.user.uid
      }
       
      // console.log(res);
      localStorage.setItem("userDetails", JSON.stringify(userDetails))
      userCtx.setUser(userDetails);
      navigate("/home")
    } catch (error) {
      console.log("error while loading in", error)
    }
  }

  return (
    <>
      <div className={Styles.cc}>
        <div className={Styles.subcc}>
          <img className={Styles.logo} src={Logo} alt="" />
          <span className={Styles.drive}>Disk</span>
        </div>

        <div className={Styles.btncontainer}>
        
            <button className={Styles.btn} onClick={onLoginClick}>Log In</button>
          
        </div>
      </div>

      <div className={Styles.subcon}>
        <div className={Styles.subsubc}>
          <h1 className={Styles.h3h}>Easy and secure access to your content</h1>

          <span className={Styles.spn}>
            Store, share, and collaborate on files and folders from your mobile
            device, tablet, or computer
          </span>

          
            
            <button className={Styles.btn} onClick={onLoginClick}>Log In</button>
          
        </div>

        <div className={Styles.ccc}>
          <img className={Styles.imgl} src={Logins} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
