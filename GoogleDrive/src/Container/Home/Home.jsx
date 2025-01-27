import React, { useState, useEffect, useRef } from "react";
import Nofile from '../../assets/Nofile.svg'
import Styles from "../Home/Home.module.css";
import { MdArrowDropDown } from "react-icons/md";
import { IoArrowUpOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosList } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { RiSpam2Line } from "react-icons/ri";
import { FaFile } from "react-icons/fa6";
import AddNewFile from "../../Components/AddNewFile/AddNewFile";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [fileDetails, setFileDetails] = useState([]);
  const [visibleMenu, setVisibleMenu] = useState(null); // Track which menu is open
  const menuRefs = useRef([]); // Refs to manage dropdown menu elements

  // Load file details from localStorage when the component mounts
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFileDetails(storedFiles);
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        visibleMenu !== null &&
        menuRefs.current[visibleMenu] &&
        !menuRefs.current[visibleMenu].contains(event.target)
      ) {
        setVisibleMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visibleMenu]);

  const handleUploadComplete = (data) => {
    const newFile = {
      id: uuidv4(),
      name: data.original_filename,
      size: (data.bytes / 1024).toFixed(2) + " KB",
      lastModified: new Date(data.created_at).toLocaleString(),
      url: data.secure_url,
      publicId: data.public_id,
    };

    const updatedFileDetails = [...fileDetails, newFile];
    setFileDetails(updatedFileDetails);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFileDetails));
  };

  const handleDelete = (fileId) => {
    const updatedFileDetails = fileDetails.filter((file) => file.id !== fileId);
    setFileDetails(updatedFileDetails);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFileDetails));
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleOpenFile = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className={Styles.maincontainer}>
      <div className={Styles.containersadd}>
        <div>
          <button className={Styles.mydrive}>
            My Drive
            <MdArrowDropDown />
            <AddNewFile onUploadComplete={handleUploadComplete} />
          </button>
        </div>
        <div className={Styles.subcontaineradd}>
          <div>
            <button className={Styles.listbtn}>
              <IoIosList />
            </button>
            <button className={Styles.gridbtn}>
              <BsGrid />
            </button>
          </div>
          <div className={Styles.sp}>
            <RiSpam2Line />
          </div>
        </div>
      </div>

      <div className={Styles.subcontainerbtn}>
        <button className={Styles.bttn}>
          Type <MdArrowDropDown />
        </button>
        <button className={Styles.bttn}>
          People <MdArrowDropDown />
        </button>
        <button className={Styles.bttn}>
          Modified <MdArrowDropDown />
        </button>
        <button className={Styles.bttn}>
          Source <MdArrowDropDown />
        </button>
      </div>

      <div className={Styles.listheader}>
        <div className={Styles.name}>
          <span>Name</span>
          <IoArrowUpOutline />
        </div>
        <div className={Styles.listsubheader}>
          <span>Owner</span>
          <div className={Styles.last}>
            <span>Last modified</span>
            <MdArrowDropDown />
          </div>
          <span>File size</span>
          <BsThreeDotsVertical className={Styles.dooot} />
        </div>
      </div>

      {/* Display uploaded files */}
      {fileDetails.length > 0 ? (
        fileDetails.map((file, index) => (
          <div className={Styles.sublistheader} key={file.id}>
            <div
              className={Styles.name}
              onClick={() => handleOpenFile(file.url)}
            >
              <FaFile />
              <span>{file.name}</span>
            </div>

            <div className={Styles.listsubheaders}>
              <span onClick={() => handleOpenFile(file.url)}>me</span>

              <div className={Styles.last}>
                <span onClick={() => handleOpenFile(file.url)}>
                  {file.lastModified}
                </span>
              </div>

              <span onClick={() => handleOpenFile(file.url)}>{file.size}</span>

              <BsThreeDotsVertical
                className={Styles.dooot}
                onClick={() => setVisibleMenu(index)}
              />

              {/* Dropdown for actions */}
              {visibleMenu === index && (
                <div
                  ref={(el) => (menuRefs.current[index] = el)}
                  className={Styles.dropdownMenu}
                >
                 
                 <button
                    className={Styles.bbtn}
                  >
                    Action
                  </button>

                  <button
                    className={Styles.bbtn}
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={Styles.bbtn}
                    onClick={() => handleCopyLink(file.url)}
                  >
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={Styles.nofileuploaded}>
          <img className={Styles.nofileimg} src={Nofile} alt="" />
          
          <h1>Welcome to Drive, the home for all your files</h1>
          <p>Use the “New” button to upload</p>
          </div>
      )}
    </div>
  );
};

export default Home;


