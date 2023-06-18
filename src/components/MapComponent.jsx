import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Searchfield } from "./Searchfield";
import CountryDetails from "./CountryDetails";
import axios from "axios";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoia2FzaGlwaCIsImEiOiJjbGl5cWtxYW8wa2l2M3NxZnU0bXA2b3RhIn0.VaZGSH5bHSRaqcbn8rn2tQ",
});

const MapComponent = () => {
  // State to store country data
  const [countryData, setCountryData] = useState(null);
  const [open, setOpen] = useState(null);

  // Function to handle country click event
  const handleCountryClick = async (countryCode) => {
    try {
      // Make API request to fetch country data
      const response = await axios.get(
        `https://restcountries.com/v2/alpha/${countryCode}`
      );
      // console.log(response.data);
      setCountryData(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  return (
    <>
      {/* Search field component */}
      <Searchfield setCountryData={setCountryData} setOpen={setOpen} />

      {/* Map component */}
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          overflow: "hidden",
          height: "100vh",
          // Adjusted width to create space on the right side
          cursor: "pointer",
        }}
        center={[0, 0]}
        zoom={[1]}
        onClick={(map, event) => {
          const features = map.queryRenderedFeatures(event.point);
          if (features && features.length > 0) {
            const feature = features[0];
            const countryCode = feature.properties.iso_3166_1;
            handleCountryClick(countryCode);
          }
        }}
      >
        {/* Layer for country fill */}
        <Layer
          type="line"
          id="country-line"
        >
          {/* Features for world bounds */}
          <Feature coordinates={[-180, 90]} />
          <Feature coordinates={[180, 90]} />
          <Feature coordinates={[180, -90]} />
          <Feature coordinates={[-180, -90]} />
        </Layer>
      </Map>

      {/* Country details component */}
      <CountryDetails countryData={countryData} open={open} setOpen={setOpen} />
    </>
  );
};

export default MapComponent;
