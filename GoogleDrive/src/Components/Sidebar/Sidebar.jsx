import React, { useState } from "react";
import Styles from "../Sidebar/Sidebar.module.css";
import { FaPlus } from "react-icons/fa6";
import { TiHomeOutline, TiCloudStorageOutline } from "react-icons/ti";
import {
  RiDriveFill,
  RiUserSharedFill,
  RiSpam2Line,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { FaComputer, FaRegClock, FaRegStar } from "react-icons/fa6";
import AddNewFile from "../AddNewFile/AddNewFile";
import myContext from "../Contaxt/MyContaxt";

const Sidebar = () => {


  
  // const [showModal, setShowModal] = useState(false); // Modal visibility

  // const [addFileOpen, setAddFileOpen] =useState(false)

  return (

    <>
    <div className={Styles.conatiner}>
      <div className={Styles.plus}  >
        {/* <AddNewFile/> */}
       
        <FaPlus />
        <span>New</span>
      </div>

      <div className={Styles.subcontainer}>
        <div className={Styles.conatainerOne}>
          <div className={Styles.items}>
            <TiHomeOutline />
            <span>Home</span>
          </div>

          <div className={Styles.items}>
            <RiDriveFill />
            <span>My Drive</span>
          </div>

          <div className={Styles.items}>
            <FaComputer />
            <span>Computers</span>
          </div>
        </div>

        <div className={Styles.conatainerSecond}>
          <div className={Styles.items}>
            <RiUserSharedFill />
            <span>Shared with me</span>
          </div>
          <div className={Styles.items}>
            <FaRegClock />
            <span>Recent</span>
          </div>
          <div className={Styles.items}>
            <FaRegStar />
            <span>Starred</span>
          </div>
        </div>

        <div className={Styles.conatainerthird}>
          <div className={Styles.items}>
            <RiSpam2Line />
            <span>Spam</span>
          </div>
          <div className={Styles.items}>
            <RiDeleteBin6Line />
            <span>Bin</span>
          </div>
          <div className={Styles.items}>
            <TiCloudStorageOutline />
            <span>Storage</span>
          </div>
        </div>

        

        
      </div>
      <div className={Styles.conatainerfourth}>
          <progress
            className={Styles.progress}
            size="tiny"
            value="50"
            max="1000"
          />

          <span>1,009.5 MB of 15 GB used</span>
          <button className={Styles.get}>Get more storage</button>
        </div>
    </div>

    </>
  );
};

export default Sidebar;