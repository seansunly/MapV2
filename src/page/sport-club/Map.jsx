import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import debounce from "lodash/debounce";

import {
  fetchMaps,
  seleteAllMaps,
} from "../../redux/feature/mapSlice/MapSlices";
import { counts, hoverMapsss } from "../../redux/feature/HoverOnMapSlcie";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const Map = () => {
  const dispatch = useDispatch();
  const maps = useSelector(seleteAllMaps);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const countnumber = useSelector(counts);
  const hoverimage = useSelector(hoverMapsss);

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [startLocation] = useState({
    lat: 11.578359693811585,
    lng: 104.90177606762974,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchMaps());
  }, [dispatch]);

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      maps.forEach((marker) => {
        bounds.extend({
          lat: parseFloat(marker.latitude),
          lng: parseFloat(marker.longitude),
        });
      });
      map.fitBounds(bounds);
      setMap(map);
    },
    [maps]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerHover = (marker) => {
    setHoveredMarker(marker);
  };

  const handleMarkerHoverExit = () => {
    setHoveredMarker(null);
  };

  const calculateDistance = useCallback((origin, destination) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          const distanceInKm = response.rows[0].elements[0].distance.text;
          return distanceInKm;
        } else {
          console.error("Error calculating distance:", status);
          return null;
        }
      }
    );
  }, []);

  const handleMarkerClick = useCallback(
    (marker) => {
      setSelectedMarker(marker);
      map.panTo({
        lat: parseFloat(marker.latitude),
        lng: parseFloat(marker.longitude),
      });

      const nearby = maps
        .map((m) => ({
          ...m,
          distance: calculateDistance(
            {
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            },
            {
              lat: parseFloat(m.latitude),
              lng: parseFloat(m.longitude),
            }
          ),
        }))
        .filter(
          (m) => m.distance && parseFloat(m.distance.split(" ")[0]) < 10 // Filter within 10 km
        )
        .sort((a, b) => {
          return (
            parseFloat(a.distance.split(" ")[0]) -
            parseFloat(b.distance.split(" ")[0])
          );
        });

      setNearbyMarkers(nearby);
    },
    [maps, map, calculateDistance]
  );

  const debouncedSearch = useCallback(
    debounce((term) => {
      const filteredMarker = maps.find((marker) =>
        marker.sport_name.toLowerCase().includes(term.toLowerCase().trim())
      );
      if (filteredMarker) {
        setSelectedMarker(filteredMarker);
      }
    }, 300),
    [maps]
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const filteredMaps = searchTerm
    ? maps.filter((marker) =>
        marker.sport_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim())
      )
    : maps;

  useEffect(() => {
    if (selectedMarker) {
      handleMarkerClick(selectedMarker);
    }
  }, [selectedMarker, handleMarkerClick]);

  return isLoaded ? (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />
      <p>{countnumber}</p>
      <div>
        <img src={hoverimage} alt="" />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: startLocation.lat,
          lng: startLocation.lng,
        }}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {filteredMaps.map((marker, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            onMouseOver={() => handleMarkerHover(marker)}
            onMouseOut={handleMarkerHoverExit}
            onClick={() => handleMarkerClick(marker)}
          >
            {hoveredMarker === marker && (
              <InfoWindow
                position={{
                  lat: parseFloat(marker.latitude),
                  lng: parseFloat(marker.longitude),
                }}
                options={{
                  disableAutoPan: true,
                }}
              >
                <div className="w-[200px] h-[150px] bg-white shadow-lg rounded-lg p-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {marker.sport_name}
                  </h3>
                  <h1>{distance}i</h1>
                  {selectedMarker === marker && distance && (
                    <p className="text-gray-600 mb-4">Distance: {distance}</p>
                  )}
                  <div>
                    <img src={hoverimage} alt="" />
                  </div>
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt={marker.sport_name}
                    src={marker.image}
                  />
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}

        {nearbyMarkers.map((marker, index) => (
          <Marker
            key={`nearby-${index}`}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            icon={{
              url: hoverimage,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          >
            <InfoWindow>
              <div>
                <h3>{marker.sport_name}</h3>
                <p>Distance: {marker.distance}</p>
              </div>
            </InfoWindow>
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default React.memo(Map);
