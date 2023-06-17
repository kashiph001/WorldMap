import React from "react";
import { Drawer } from "antd";

const CountryDetails = ({ countryData, open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Check if countryData is available */}
      {countryData && (
        <Drawer
          style={{
            backgroundColor: "rgb(228,236,194)",
          }}
          title="Country Details"
          placement="right"
          onClose={onClose}
          open={open} // Use "visible" instead of "open" to control the visibility of the Drawer
        >
          <div>
            {/* Display country name */}
            <h1>{countryData.name}</h1>

            {/* Display country flag */}
            <img src={countryData.flag} alt="" width="80%" />

            {/* Display country capital */}
            <p>
              <strong>Capital:</strong> {countryData.capital}
            </p>

            {/* Display country currency */}
            <p>
              <strong>Currency:</strong> {countryData.currencies[0].name} (
              {countryData.currencies[0].code})
            </p>

            {/* Display country population */}
            <p>
              <strong>Population:</strong> {countryData.population}
            </p>

            {/* Display country latitude and longitude */}
            <p>
              <strong>LatLang:</strong>{" "}
              {countryData.latlng.map((lala) => lala).join(", ")}
            </p>

            {/* Display country languages */}
            <p>
              <strong>Languages:</strong>{" "}
              {countryData.languages.map((lang) => (
                <span className="country-lang" key={lang.name}>
                  {lang.name}{" "}
                </span>
              ))}
            </p>

            {/* Display country area */}
            <p>
              <strong>Area:</strong> {countryData.area} km²
            </p>

            {/* Display country time zones */}
            <p>
              <strong>TimeZone:</strong> {countryData.timezones}
            </p>

            {/* Display country region */}
            <p>
              <strong>Region:</strong> {countryData.region}
            </p>
          </div>
        </Drawer>
      )}
    </div>
  );
};

export default CountryDetails;
