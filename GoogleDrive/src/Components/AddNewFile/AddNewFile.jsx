
import React, { useState } from "react";
import axios from "axios";
import Styles from "../AddNewFile/AddNewFile.module.css";

const AddNewFile = ({ onUploadComplete }) => {
  const [upload, setUpload] = useState(null);
  const [fileDetails, setFileDetails] = useState(null); // Store file details
  const [isUploading, setIsUploading] = useState(false); // Track uploading status
  const [showModal, setShowModal] = useState(false); // Modal visibility

  const eventhandle = async (e) => {
    const file = e.target.files[0]; // Directly get the file

    if (!file) return; // If no file is selected, do nothing

    // Set file details before upload
    setFileDetails({
      name: file.name, // Original file name
      size: (file.size / 1024).toFixed(2) + " KB", // File size in KB
      lastModified: new Date(file.lastModified).toLocaleString(), // Last modified date
    });

    const data = new FormData();
    data.append("file", file); // Append the selected file to the FormData
    data.append("upload_preset", "GoogleCludeClone");
    data.append("cloud_name", "deozxwmrx");

    // Start uploading process
    setIsUploading(true);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/deozxwmrx/image/upload",
        data
      );

      console.log(res.data); // Log the entire response object to see the structure
      if (onUploadComplete && res.data.url) {
        onUploadComplete(res.data);
        console.log("Uploaded Image URL: ", res.data.url); // Log the specific URL if it exists
      }

      // Stop uploading after successful upload
      setIsUploading(false);
      setShowModal(false); // Close modal after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false); // Stop uploading on error
    }
  };

  const handleUploadClick = () => {
    // Trigger file input when the upload button is clicked
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Upload File</button>

      {showModal && (
        <div className={Styles.modalOverlay}>
          <div className={Styles.modalContent}>
            <h2>Upload File</h2>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={eventhandle}
            />
            <button onClick={handleUploadClick} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Choose File"}
            </button>

            <button onClick={() => setShowModal(false)} className={Styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewFile;
