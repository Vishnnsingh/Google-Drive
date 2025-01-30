import React, { useState, useContext, useEffect, useRef } from "react";
import Nofile from "../../assets/Nofile.svg";
import Styles from "../Home/Home.module.css";
import { MdArrowDropDown } from "react-icons/md";
import { IoArrowUpOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosList } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { RiSpam2Line } from "react-icons/ri";
import { FaFile } from "react-icons/fa6";
import AddNewFile from "../../Components/AddNewFile/AddNewFile";
import Chat from "../../Components/chat/Chat";
import myContext from "../../Components/Contaxt/MyContaxt";
import { v4 as uuidv4 } from 'uuid';
// import { Toaster, toast } from 'alert';

const Home = () => {
  const [uploadFile, setUploadFile] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [showDropdown, setShowDropdown] = useState(null); // Use null to represent no dropdown open
  const [files, setFiles] = useState([]);
  const [draggingFileIndex, setDraggingFileIndex] = useState(null); // Track which file is being dragged
  // const { filteredData } = useContext(myContext);
  const { filteredData = [] } = useContext(myContext);

  const Ctx = useContext(myContext);
  const { resData } = Ctx;

  const dropdownRef = useRef([]);
  const fileRef = useRef([]);

  const callings = () => {
    setUploadFile(true);
  };

  // const handleUploadComplete = () => {
  //   setUploadFile(false);
  //   const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
  //   if (resData) {
  //     existingFiles.push(resData);
  //     localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles));
  //     setFiles(existingFiles);
  //   }
  // };

  const handleUploadComplete = () => {
    setUploadFile(false);
    const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    if (resData && resData.secure_url) { // Check if file has a URL
      existingFiles.push(resData);
      localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles));
      setFiles(existingFiles);
      // toast.success("File uploaded successfully!");
      // alert("ok")
    }
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const toggleDropdown = (index) => {
    setShowDropdown((prev) => (prev === index ? null : index)); // Toggle the dropdown
  };

  const deleteFile = (fileIndex) => {
    const updatedFiles = files.filter((file, index) => index !== fileIndex);
    setFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  const copyLink = (fileUrl) => {
    navigator.clipboard.writeText(fileUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying link: ", error);
      });
  };

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFiles(storedFiles);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.some((ref) => ref && ref.contains(event.target)) &&
        fileRef.current &&
        !fileRef.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setShowDropdown(null); // Close the dropdown if clicked outside
        
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openFile = (fileUrl) => {
    // You can replace this with your preferred file opening logic.
    // Example: Open the file URL in a new tab.
    window.open(fileUrl, "_blank");
  };

  const bytesToKB = (bytes) => {
    if (!bytes) return "0 KB";  // Return "0 KB" if no file size is provided
    const kb = bytes / 1024;  // Convert bytes to KB
    return `${kb.toFixed(2)} KB`;  // Return KB value rounded to two decimal places
  };

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggingFileIndex(index);
  };

  // Handle drag over (this allows the drop)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle file drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    const updatedFiles = [...files];
    const [draggedFile] = updatedFiles.splice(draggingFileIndex, 1);
    updatedFiles.splice(index, 0, draggedFile);
    setFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    setDraggingFileIndex(null); // Reset dragging state
  };


  // const displayedFiles = filteredData.length > 0 ? filteredData : files;
  // const displayedFiles = Array.isArray(filteredData) && filteredData.length > 0 ? filteredData : files;
  const displayedFiles = (filteredData && filteredData.length > 0) ? filteredData : files;


  console.log("filteredData:", filteredData);

  return (

    <div className={Styles.maincontainer}>
     


      <div className={Styles.containersadd}>
        <div>
          {uploadFile && <AddNewFile onUploadComplete={handleUploadComplete} />} 
          <button className={Styles.mydrive} onClick={callings}>
            My Drive
            <MdArrowDropDown />
          </button>
        </div>
        <div className={Styles.subcontaineradd}>
          <div>
            <button className={Styles.listbtn} onClick={() => toggleViewMode("list")}>
              <IoIosList />
            </button>
            <button className={Styles.gridbtn} onClick={() => toggleViewMode("grid")}>
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
      
      

      {/* List View */}
      {viewMode === "list" && (
        <>


        


          
        
          <div className={Styles.sublistheader}>
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

          {displayedFiles.map((file, index) => (
            <div
              key={index}
              className={Styles.sublistheader}
              ref={(el) => (fileRef.current[index] = el)}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className={Styles.name} onClick={() => openFile(file?.secure_url)}>
                <FaFile />
                <span>{file?.display_name}</span>
              </div>
              <div className={Styles.listsubheaders}>
                <span>me</span>
                <div className={Styles.last} onClick={() => openFile(file?.secure_url)}>
                  <span>{file?.created_at}</span>
                </div>
                <span onClick={() => openFile(file?.secure_url)}>{bytesToKB(file?.bytes)}</span>
                <BsThreeDotsVertical className={Styles.dooot} onClick={() => toggleDropdown(index)} />
                {showDropdown === index && (
                  <div className={Styles.dropdownMenu} ref={(el) => (dropdownRef.current[index] = el)}>
                    <button className={Styles.bbtn}>Action</button>
                    <button className={Styles.bbtn} onClick={() => deleteFile(index)}>
                      Delete
                    </button>
                    <button className={Styles.bbtn} onClick={() => copyLink(file?.secure_url)}>
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
         
        </>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className={Styles.gridcontainer}>
          {files.map((file, index) => (
            <div
              key={index}
              className={Styles.gridItem}
              ref={(el) => (fileRef.current[index] = el)}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <span className={Styles.originalName}>{file?.display_name}</span>
              <img src={file?.secure_url} className={Styles.gridImage} alt="file" />
              <span>{bytesToKB(file?.bytes)}</span>
              <span>{file?.created_at}</span>
              {/* <BsThreeDotsVertical className={Styles.dooot} onClick={() => toggleDropdown(index)} /> */}
              {/* {showDropdown === index && (
                <div className={Styles.dropdownMenu} ref={(el) => (dropdownRef.current[index] = el)}>
                  <button className={Styles.bbtn}>Action</button>
                  <button className={Styles.bbtn} onClick={() => deleteFile(index)}>
                    Delete
                  </button>
                  <button className={Styles.bbtn} onClick={() => copyLink(file?.secure_url)}>
                    Copy Link
                  </button>
                </div>
              )} */}
            </div>
          ))}
        </div>
      )}

      {/* Show no file uploaded message if there are no files */}
      {files.length === 0 && (
        <div className={Styles.nofileuploaded}>
          <img className={Styles.nofileimg} src={Nofile} alt="No file" />
          <h1>Welcome to Drive, the home for all your files</h1>
          <p>Use the “New” button to upload</p>
        </div>
      )}

      <div className={Styles.chaat}>
        <Chat />
      </div>


     

    </div>
  );
};

export default Home;


// import React, { useState, useContext, useEffect, useRef } from "react";
// import Nofile from "../../assets/Nofile.svg";
// import Styles from "../Home/Home.module.css";
// import { MdArrowDropDown } from "react-icons/md";
// import { IoArrowUpOutline } from "react-icons/io5";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { IoIosList } from "react-icons/io";
// import { BsGrid } from "react-icons/bs";
// import { RiSpam2Line } from "react-icons/ri";
// import { FaFile } from "react-icons/fa6";
// import AddNewFile from "../../Components/AddNewFile/AddNewFile";
// import myContext from "../../Components/Contaxt/MyContaxt";

// const Home = () => {
//   const [uploadFile, setUploadFile] = useState(false);
//   const [viewMode, setViewMode] = useState("list");
//   const [showDropdown, setShowDropdown] = useState(null);
//   const [files, setFiles] = useState([]);
//   const [draggingFileIndex, setDraggingFileIndex] = useState(null);
//   const { filteredData = [] } = useContext(myContext);
//   const { resData } = useContext(myContext);

//   const dropdownRef = useRef([]);
//   const fileRef = useRef([]);

//   useEffect(() => {
//     const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
//     setFiles(storedFiles);

//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.some((ref) => ref && ref.contains(event.target)) &&
//         fileRef.current &&
//         !fileRef.current.some((ref) => ref && ref.contains(event.target))
//       ) {
//         setShowDropdown(null);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleUploadComplete = () => {
//     setUploadFile(false);
//     // const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
//     const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

//     if (resData && resData.secure_url) {
//       existingFiles.push(resData);
//       localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles));
//       setFiles(existingFiles);
//     }
//   };

//   const toggleViewMode = (mode) => {
//     setViewMode(mode);
//   };

//   const toggleDropdown = (index) => {
//     setShowDropdown((prev) => (prev === index ? null : index));
//   };

//   const deleteFile = (fileIndex) => {
//     const updatedFiles = files.filter((_, index) => index !== fileIndex);
//     setFiles(updatedFiles);
//     localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
//   };

//   const copyLink = (fileUrl) => {
//     navigator.clipboard.writeText(fileUrl).then(() => alert("Link copied!"));
//   };

//   const openFile = (fileUrl) => {
//     window.open(fileUrl, "_blank");
//   };

//   const bytesToKB = (bytes) => {
//     if (!bytes) return "0 KB";
//     return `${(bytes / 1024).toFixed(2)} KB`;
//   };

//   const handleDragStart = (index) => setDraggingFileIndex(index);

//   const handleDragOver = (e) => e.preventDefault();

//   const handleDrop = (e, index) => {
//     e.preventDefault();
//     const updatedFiles = [...files];
//     const [draggedFile] = updatedFiles.splice(draggingFileIndex, 1);
//     updatedFiles.splice(index, 0, draggedFile);
//     setFiles(updatedFiles);
//     localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
//     setDraggingFileIndex(null);
//   };

//   // const displayedFiles = filteredData.length > 0 ? filteredData : files;
//   const displayedFiles = (filteredData?.length > 0 ? filteredData : files) || [];


//   return (
//     <div className={Styles.maincontainer}>
//       <div className={Styles.containersadd}>
//         {uploadFile && <AddNewFile onUploadComplete={handleUploadComplete} />}
//         <button className={Styles.mydrive} onClick={() => setUploadFile(true)}>
//           My Drive <MdArrowDropDown />
//         </button>
//         <div className={Styles.subcontaineradd}>
//           <button className={Styles.listbtn} onClick={() => toggleViewMode("list")}>
//             <IoIosList />
//           </button>
//           <button className={Styles.gridbtn} onClick={() => toggleViewMode("grid")}>
//             <BsGrid />
//           </button>
//           <RiSpam2Line />
//         </div>
//       </div>

//       {viewMode === "list" ? (
//         <div className={Styles.listheader}>
//           <div className={Styles.name}>
//             <span>Name</span> <IoArrowUpOutline />
//           </div>
//           {displayedFiles.map((file, index) => (
//             <div
//               key={index}
//               className={Styles.sublistheader}
//               ref={(el) => (fileRef.current[index] = el)}
//               draggable
//               onDragStart={() => handleDragStart(index)}
//               onDragOver={handleDragOver}
//               onDrop={(e) => handleDrop(e, index)}
//             >
//               <div className={Styles.name} onClick={() => openFile(file?.secure_url)}>
//                 <FaFile />
//                 <span>{file?.display_name}</span>
//               </div>
//               <span>{bytesToKB(file?.bytes)}</span>
//               <BsThreeDotsVertical onClick={() => toggleDropdown(index)} />
//               {showDropdown === index && (
//                 <div className={Styles.dropdownMenu} ref={(el) => (dropdownRef.current[index] = el)}>
//                   <button onClick={() => deleteFile(index)}>Delete</button>
//                   <button onClick={() => copyLink(file?.secure_url)}>Copy Link</button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className={Styles.gridcontainer}>
//           {displayedFiles.map((file, index) => (
//             <div
//               key={index}
//               className={Styles.gridItem}
//               draggable
//               onDragStart={() => handleDragStart(index)}
//               onDragOver={handleDragOver}
//               onDrop={(e) => handleDrop(e, index)}
//             >
//               <span>{file?.display_name}</span>
//               <img src={file?.secure_url} className={Styles.gridImage} alt="file" />
//               <span>{bytesToKB(file?.bytes)}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {files.length === 0 && (
//         <div className={Styles.nofileuploaded}>
//           <img src={Nofile} alt="No file" />
//           <p>No files uploaded yet</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
