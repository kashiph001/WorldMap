import React, { useState } from "react";
import axios from "axios";
import icon from "..//assets/images/search-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Searchfield = ({ setCountryData, setOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    
    try {
      // Make a GET request to fetch country data based on the search query
      const response = await axios.get(
        `https://restcountries.com/v2/name/${searchQuery}`
      );

      let countryCode;
      if (response.data.length > 0) {
        // Iterate through the response data to find a matching country name
        response.data.forEach((data) => {
          if (
            data.name
              .toLowerCase()
              .split(" ")
              .includes(searchQuery.toLocaleLowerCase())
          ) {
            // Store the alpha-2 country code of the matching country
            countryCode = data.alpha2Code;
            // Set the country data in the parent component using setCountryData
            setCountryData(data);
            setOpen(true); //opening Drawer
          }
        });
      } else {
        // If no matching country is found, set the country data to null
        setCountryData(null);

        // Show info toaster notification
        toast.info("Country not found!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error searching country:", error);
      // In case of an error, set the country data to null
      setCountryData(null);

      // Show error toaster notification
      toast.error("Error searching country!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // Clear the input field
    setSearchQuery("");
  };

  return (
    <div className="search-field-container">
      <div className="search-field">
        {/* Input field to enter the country name */}
        <input
          type="text"
          placeholder="Enter country name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search icon, clicking on it triggers the handleSearch function */}
        <img src={icon} onClick={handleSearch} alt="" />
        {/* Toast container */}
        <ToastContainer />
      </div>
    </div>
  );
};
