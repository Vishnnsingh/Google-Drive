import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../Header/Header.module.css";
import { IoSearchSharp } from "react-icons/io5";
import Filter from "../../assets/Filter.png";
import { MdOutlineOfflinePin } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoSettingsOutline, IoApps } from "react-icons/io5";
import Logo from "../../assets/Logo.jpg";
import { UserContext } from "../../App";
import myContext from "../Contaxt/MyContaxt";


const Header = () => {


  const { resDate, search, searchQuery, handleSearchChange, filteredData } = useContext(myContext);

  const userCtx = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const [searchQuery, setSearchQuery] = useState(""); // Manage search input
  const navigate = useNavigate();

  // Handle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  // Logout function
  const logoutHandler = () => {
    userCtx.setUser(null); // Clear user data
    localStorage.setItem("isLoggingOut", "true"); // Set flag for manual logout
    navigate("/", { replace: true }); // Redirect to login and replace history entry
  };

  // Handle search input change
  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearchQuery(value); // Update search query
  //   if (onSearch) {
  //     onSearch(value); // Notify parent component
  //   }
  // };

  useEffect(() => {
    const isLoggingOut = localStorage.getItem("isLoggingOut") === "true";

    if (!userCtx.user && !isLoggingOut) {
      // If no user and not logging out, stay on the current page (back navigation prevention)
      navigate(-1, { replace: true });
    }

    if (!userCtx.user) {
      localStorage.removeItem("isLoggingOut"); // Clear the flag after logout
    }
  }, [userCtx.user, navigate]);

   


  return (
    <div className={Styles.headerContainerr}>
      <div className={Styles.imgheader}>
        <div className={Styles.ll}>
          <img className={Styles.logo} src={Logo} alt="Logo" />
          <span className={Styles.drive}>Drive</span>
        </div>

        <div className={Styles.midelleheader}>
          <div className={Styles.mhm}>
            <IoSearchSharp  onClick={search}/>
            <input
              className={Styles.input}
              type="text"
              placeholder="Search in Drive"
              value={searchQuery}
              onChange={handleSearchChange} 
               // Update search query
            />
          </div>
          <div className={Styles.ll}>
            <div className={Styles.ccs}>
              <img className={Styles.filter} src={Filter} alt="Filter" />
            </div>
          </div>
        </div>

        <div className={Styles.rightheader}>
          <div className={Styles.cb}>
            <MdOutlineOfflinePin />
          </div>
          <div className={Styles.cb}>
            <MdOutlineContactSupport />
          </div>
          <div className={Styles.cb}>
            <IoSettingsOutline />
          </div>
          <div className={Styles.cb}>
            <IoApps />
          </div>

          <div className={Styles.profileContainer} onClick={toggleDropdown}>
            <span className={Styles.profile}>
              {userCtx.user?.displayname &&
                `${userCtx.user.displayname.split(" ")[0][0]} `}
            </span>
            {dropdownVisible && (
              <div className={Styles.dropdownMenu}>
                <span>My profile</span>

                <div className={Styles.vv}>
               


                <span className={Styles.profiless}>
              {userCtx.user?.displayname &&
                `${userCtx.user.displayname}`}
            </span>
            <button className={Styles.logout} onClick={logoutHandler}>Logout</button>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
