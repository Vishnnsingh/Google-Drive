// import React, { useContext, useState } from "react";
// import Styles from "./AddNewFile.module.css";
// import myContext from "../Contaxt/MyContaxt";

// const AddNewFile = ({ onUploadComplete }) => {

//   const [isVisible, setIsVisible] = useState(true);  // Modal is visible initially

//   const Ctx = useContext(myContext);
//   const { eventhandle } = Ctx;
//   console.log(Ctx);

//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     eventhandle(e);  // Calling eventhandle when file is selected
//   };

//   const handleFileUpload = () => {
//     if (!file) {
//       alert("Please select a file first.");
//       return;
//     }

//     // Simulating upload process (or actual upload logic here)
//     // setTimeout(() => {
//     console.log("File uploaded successfully!");
    
//     // Call the provided callback function to notify parent about upload completion
//     onUploadComplete();

//     // Hide the modal after upload
//     setIsVisible(false);  // Close the modal
//     // }, 2000);
//   };

//   return (
//     <>
//       {isVisible && (
//         <div className={Styles.modalOverlay}>
//           <div className={Styles.modalContent}>
//             <h2>Upload File</h2>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleFileUpload} className={Styles.closeButton}>
//               Upload
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddNewFile;




import React, { useContext, useState } from "react";
import Styles from "./AddNewFile.module.css";
import myContext from "../Contaxt/MyContaxt";

const AddNewFile = ({ onUploadComplete }) => {
  const [isVisible, setIsVisible] = useState(true);  // Modal is visible initially
  const [file, setFile] = useState(null);

  const Ctx = useContext(myContext);
  const { eventhandle } = Ctx;  // Retrieve eventhandle from context

  // Ensure the file is set correctly when the user selects a file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);  // Update file state
      console.log("File selected:", selectedFile);
    } else {
      console.log("No file selected.");
    }
    // Call eventhandle only if there is a file selected
    if (selectedFile) {
      eventhandle(e);  // Calling eventhandle when file is selected
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Simulating upload process (or actual upload logic here)
    console.log("File uploaded successfully!");

    // Call the provided callback function to notify parent about upload completion
    onUploadComplete();

    // Hide the modal after upload
    setIsVisible(false);  // Close the modal
  };

  return (
    <>
      {isVisible && (
        <div className={Styles.modalOverlay}>
          <div className={Styles.modalContent}>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload} className={Styles.closeButton}>
              Upload
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewFile;



// const Pop = (props)=> {
//   return(
//     <>
       
//     </>
//   )
// }


{/* {
      isVisible ? <Pop handleFileUpload = {handleFileUpload} handleFileChange = {handleFileChange} /> : null
     } */}