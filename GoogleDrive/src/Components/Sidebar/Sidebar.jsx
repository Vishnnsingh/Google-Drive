// import React, { useContext, useState } from "react";
// import Styles from "../Sidebar/Sidebar.module.css";
// import { FaPlus } from "react-icons/fa6";
// import { TiHomeOutline, TiCloudStorageOutline } from "react-icons/ti";
// import {
//   RiDriveFill,
//   RiUserSharedFill,
//   RiSpam2Line,
//   RiDeleteBin6Line,
// } from "react-icons/ri";
// import { FaComputer, FaRegClock, FaRegStar } from "react-icons/fa6";
// import AddNewFile from "../AddNewFile/AddNewFile";
// import myContext from "../Contaxt/MyContaxt";

// const Sidebar = () => {

// const [files, setFiles] = useState([]);
//   const Ctx = useContext(myContext);
//   const { resData } = Ctx;
//   // const [showModal, setShowModal] = useState(false); // Modal visibility

//   // const [addFileOpen, setAddFileOpen] =useState(false)

//   const handleUploadComplete = () => {
//     setUploadFile(false);
//     const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
//     if (resData) {
//       existingFiles.push(resData);
//       localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles));
//       setFiles(existingFiles);
//     }
//   };

//   return (

//     <>
//     <div className={Styles.conatiner}>
//       <div className={Styles.plus}  >
//         {/* <AddNewFile/> */}

//         {uploadFile && <AddNewFile onUploadComplete={handleUploadComplete} />}
       
//         <FaPlus />
//         <span>New</span>
//       </div>

//       <div className={Styles.subcontainer}>
//         <div className={Styles.conatainerOne}>
//           <div className={Styles.items}>
//             <TiHomeOutline />
//             <span>Home</span>
//           </div>

//           <div className={Styles.items}>
//             <RiDriveFill />
//             <span>My Drive</span>
//           </div>

//           <div className={Styles.items}>
//             <FaComputer />
//             <span>Computers</span>
//           </div>
//         </div>

//         <div className={Styles.conatainerSecond}>
//           <div className={Styles.items}>
//             <RiUserSharedFill />
//             <span>Shared with me</span>
//           </div>
//           <div className={Styles.items}>
//             <FaRegClock />
//             <span>Recent</span>
//           </div>
//           <div className={Styles.items}>
//             <FaRegStar />
//             <span>Starred</span>
//           </div>
//         </div>

//         <div className={Styles.conatainerthird}>
//           <div className={Styles.items}>
//             <RiSpam2Line />
//             <span>Spam</span>
//           </div>
//           <div className={Styles.items}>
//             <RiDeleteBin6Line />
//             <span>Bin</span>
//           </div>
//           <div className={Styles.items}>
//             <TiCloudStorageOutline />
//             <span>Storage</span>
//           </div>
//         </div>

        

        
//       </div>
//       <div className={Styles.conatainerfourth}>
//           <progress
//             className={Styles.progress}
//             size="tiny"
//             value="50"
//             max="1000"
//           />

//           <span>1,009.5 MB of 15 GB used</span>
//           <button className={Styles.get}>Get more storage</button>
//         </div>
//     </div>

//     </>
//   );
// };

// export default Sidebar;


// import React, { useContext, useState } from "react";
// import Styles from "../Sidebar/Sidebar.module.css";
// import { FaPlus, FaComputer, FaRegClock, FaRegStar } from "react-icons/fa6";
// import { TiHomeOutline, TiCloudStorageOutline } from "react-icons/ti";
// import {
//   RiDriveFill,
//   RiUserSharedFill,
//   RiSpam2Line,
//   RiDeleteBin6Line,
// } from "react-icons/ri";
// import AddNewFile from "../AddNewFile/AddNewFile";
// import myContext from "../Contaxt/MyContaxt";

// const Sidebar = () => {
//   const [files, setFiles] = useState([]);
//   const [uploadFile, setUploadFile] = useState(false);
//   const Ctx = useContext(myContext);
//   const { resData } = Ctx;

//   const handleUploadComplete = () => {
//     setUploadFile(false);
//     if (resData) {
//       const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
//       const updatedFiles = [...existingFiles, resData];
//       localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
//       setFiles(updatedFiles);
//     }
//   };

//   return (
//     <div className={Styles.containerss}>
//       <div className={Styles.plus} onClick={() => setUploadFile(true)}>
        
//         {uploadFile && <AddNewFile onUploadComplete={handleUploadComplete} />}
        
        
//         <FaPlus />
//         <span>New</span>
//       </div>

//       <div className={Styles.subcontainer}>
//         <div className={Styles.containerOne}>
//           <div className={Styles.items}><TiHomeOutline /><span>Home</span></div>
//           <div className={Styles.items}><RiDriveFill /><span>My Drive</span></div>
//           <div className={Styles.items}><FaComputer /><span>Computers</span></div>
//         </div>

//         <div className={Styles.containerSecond}>
//           <div className={Styles.items}><RiUserSharedFill /><span>Shared with me</span></div>
//           <div className={Styles.items}><FaRegClock /><span>Recent</span></div>
//           <div className={Styles.items}><FaRegStar /><span>Starred</span></div>
//         </div>

//         <div className={Styles.containerThird}>
//           <div className={Styles.items}><RiSpam2Line /><span>Spam</span></div>
//           <div className={Styles.items}><RiDeleteBin6Line /><span>Bin</span></div>
//           <div className={Styles.items}><TiCloudStorageOutline /><span>Storage</span></div>
//         </div>
//       </div>

//       <div className={Styles.containerFourth}>
//         <progress className={Styles.progress} value="50" max="1000" />
//         <span>1,009.5 MB of 15 GB used</span>
//         <button className={Styles.get}>Get more storage</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import React, { useContext, useState, useEffect } from "react";
// import Styles from "../Sidebar/Sidebar.module.css";
// import { FaPlus, FaComputer, FaRegClock, FaRegStar } from "react-icons/fa6";
// import { TiHomeOutline, TiCloudStorageOutline } from "react-icons/ti";
// import {
//   RiDriveFill,
//   RiUserSharedFill,
//   RiSpam2Line,
//   RiDeleteBin6Line,
// } from "react-icons/ri";
// import AddNewFile from "../AddNewFile/AddNewFile";
// import myContext from "../Contaxt/MyContaxt";

// const Sidebar = () => {
//   const [files, setFiles] = useState([]);
//   const [uploadFile, setUploadFile] = useState(false);
//   const Ctx = useContext(myContext);
//   const { resData } = Ctx;

//   // Load uploaded files from localStorage on initial render
//   useEffect(() => {
//     const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
//     setFiles(existingFiles); // Set the files from localStorage to the state
//   }, []);

//   // Handle file upload completion and update the state and localStorage
//   const handleUploadComplete = () => {
//     setUploadFile(false); // Close the upload modal
//     if (resData) {
//       // Retrieve existing files from localStorage
//       const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

//       // Update the files array with the newly uploaded file
//       const updatedFiles = [...existingFiles, resData];

//       // Store the updated files array in localStorage
//       localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));

//       // Immediately update the state, which will trigger re-render
//       setFiles(updatedFiles); // This will trigger re-render immediately
//     }
//   };


  
//   // const handleUploadComplete = () => {
//   //   setUploadFile(false);
//   //   const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
//   //   if (resData && resData.secure_url) { // Check if file has a URL
//   //     existingFiles.push(resData);
//   //     localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles));
//   //     setFiles(existingFiles);
//   //   }
//   // };

//   // Check and render uploaded files on the UI when files are updated
//   useEffect(() => {
//     if (files.length > 0) {
//       console.log("Files have been updated:", files); // Debugging: ensure files are updated
//     }
//   }, [files]); // Will trigger whenever files change

//   return (
//     <div className={Styles.containerss}>
//       {/* New File button */}
//       <div className={Styles.plus} onClick={() => setUploadFile(true)}>
//         {uploadFile && <AddNewFile onUploadComplete={handleUploadComplete} />}
//         <FaPlus />
//         <span>New</span>
//       </div>

//       {/* Sidebar menu items */}
//       <div className={Styles.subcontainer}>
//         <div className={Styles.containerOne}>
//           <div className={Styles.items}><TiHomeOutline /><span>Home</span></div>
//           <div className={Styles.items}><RiDriveFill /><span>My Drive</span></div>
//           <div className={Styles.items}><FaComputer /><span>Computers</span></div>
//         </div>

//         <div className={Styles.containerSecond}>
//           <div className={Styles.items}><RiUserSharedFill /><span>Shared with me</span></div>
//           <div className={Styles.items}><FaRegClock /><span>Recent</span></div>
//           <div className={Styles.items}><FaRegStar /><span>Starred</span></div>
//         </div>

//         <div className={Styles.containerThird}>
//           <div className={Styles.items}><RiSpam2Line /><span>Spam</span></div>
//           <div className={Styles.items}><RiDeleteBin6Line /><span>Bin</span></div>
//           <div className={Styles.items}><TiCloudStorageOutline /><span>Storage</span></div>
//         </div>
//       </div>

//       {/* Storage information */}
//       <div className={Styles.containerFourth}>
//         <progress className={Styles.progress} value="50" max="1000" />
//         <span>1,009.5 MB of 15 GB used</span>
//         <button className={Styles.get}>Get more storage</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useContext, useState, useEffect } from "react";
import Styles from "../Sidebar/Sidebar.module.css";
import { FaPlus, FaComputer, FaRegClock, FaRegStar } from "react-icons/fa6";
import { TiHomeOutline, TiCloudStorageOutline } from "react-icons/ti";
import {
  RiDriveFill,
  RiUserSharedFill,
  RiSpam2Line,
  RiDeleteBin6Line,
} from "react-icons/ri";
import AddNewFile from "../AddNewFile/AddNewFile";
import myContext from "../Contaxt/MyContaxt";

const Sidebar = () => {
  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(false);
  const Ctx = useContext(myContext);
  const { resData } = Ctx;

  // UseEffect to load files from localStorage initially
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFiles(storedFiles);  // Sync state with localStorage data
  }, []);  // Empty dependency array means it runs only once after initial render

  // Handle the file upload and update state and localStorage
  const handleUploadComplete = () => {
    if (resData && resData.secure_url) { // Ensure resData is valid
      // Get existing files from localStorage
      const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
      
      // Add new file to the existing list
      existingFiles.push(resData);

      // Save updated files back to localStorage
      localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles));

      // Update the state to trigger re-render and reflect changes in the UI
      setFiles(existingFiles);  // This triggers the UI update immediately
    }

    // Close the file upload form after completing upload
    setUploadFile(false);
  };

  return (
    <div className={Styles.containerss}>
      {/* New File button */}
      <div className={Styles.plus} onClick={() => setUploadFile(true)}>
        {uploadFile && <AddNewFile onUploadComplete={handleUploadComplete} />}
        <FaPlus />
        <span>New</span>
      </div>

      {/* Sidebar menu items */}
      <div className={Styles.subcontainer}>
        <div className={Styles.containerOne}>
          <div className={Styles.items}><TiHomeOutline /><span>Home</span></div>
          <div className={Styles.items}><RiDriveFill /><span>My Drive</span></div>
          <div className={Styles.items}><FaComputer /><span>Computers</span></div>
        </div>

        <div className={Styles.containerSecond}>
          <div className={Styles.items}><RiUserSharedFill /><span>Shared with me</span></div>
          <div className={Styles.items}><FaRegClock /><span>Recent</span></div>
          <div className={Styles.items}><FaRegStar /><span>Starred</span></div>
        </div>

        <div className={Styles.containerThird}>
          <div className={Styles.items}><RiSpam2Line /><span>Spam</span></div>
          <div className={Styles.items}><RiDeleteBin6Line /><span>Bin</span></div>
          <div className={Styles.items}><TiCloudStorageOutline /><span>Storage</span></div>
        </div>
      </div>

      {/* Storage information */}
      <div className={Styles.containerFourth}>
        <progress className={Styles.progress} value="50" max="1000" />
        <span>1,009.5 MB of 15 GB used</span>
        <button className={Styles.get}>Get more storage</button>
      </div>
    </div>
  );
};

export default Sidebar;
