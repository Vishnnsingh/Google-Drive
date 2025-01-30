
import React, { useState, useEffect } from "react";
import myContext from './MyContaxt';
import axios from "axios";

const MyState = (props) => {
  const [resData, setResData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState(null); // State for filtered results

  const eventhandle = async (e) => {
    const file = e.target.files[0]; // Get selected file
    if (!file) return;
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "GoogleCludeClone");
    data.append("cloud_name", "deozxwmrx");
  
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/deozxwmrx/image/upload",
        data
      );
      setResData(res.data); // Update state with response
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("There was an issue uploading the image. Please try again.");
    }
  };
  
  // Log data when resData updates
  useEffect(() => {
    console.log("Updated API Data:", resData);
  }, [resData]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };


  const search = () => {
    if (!resData) return;

    const result = resData?.original_name?.toLowerCase().includes(searchQuery.toLowerCase());
    setFilteredData(result ? resData : null); // If found, set filteredData to resData, else set to null
  };

  return (
    <myContext.Provider value={{ resData, eventhandle ,setResData, search, searchQuery, handleSearchChange, filteredData }}>
      {props.children}
      {/* Input field to trigger upload */}
     
    </myContext.Provider>
  );
};

export default MyState;
