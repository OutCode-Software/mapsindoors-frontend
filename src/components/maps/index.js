import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal";
const mapsindoors = window?.mapsindoors;

export const Maps = () => {
  const mapElementReference = useRef(null); // We need a reference to the mi-map in order to add event listeners.
  const [isOpen, setIsOpen] = useState(false);
  const [locationDetails, setLocationDetails] = useState();
  const mapKey = "d876ff0e60bb430b8fabb145"; // key to display map
  useEffect(() => {
    // to set the center ponit of the venue
    mapElementReference.current.addEventListener("mapsIndoorsReady", (e) => {
      e.target.getMapInstance().then((mapInstance) => {
        mapInstance.setZoom(19);
        mapsindoors.services.VenuesService.getVenues().then((venue) => {
          mapInstance.setCenter({
            lat: venue[0].anchor.coordinates[1],
            lng: venue[0].anchor.coordinates[0],
          });
        });
      });
    });
  }, []);
  useEffect(() => {
    // The function passed to useEffect will run after the render is committed to the screen.
    // Get the MapsIndoors instance from getMapsIndoorsInstance()

    mapElementReference.current
      .getMapsIndoorsInstance()
      .then((mapsIndoorsInstance) => {
        mapsIndoorsInstance?.addListener("click", (location) => {
          console.log("location", location);
          setLocationDetails(location);
          setIsOpen(true);
          // to set the color of clicked map specfic polygon
          // set display rules for the different types of locations in your MapsIndoors conten
          mapsIndoorsInstance?.setDisplayRule(location.id, {
            polygonFillColor: "#31c631",
            polygonStrokeColor: "#395FE6",
            polygonVisible: true,
            // to show the color of the room / buidling / floor in zoomin and zoom out
            polygonZoomFrom: 18,
            polygonZoomTo: 23,
            zIndex: 10,
            polygonStrokeOpacity: 1,
            polygonFillOpacity: 1,
            labelVisible: false,
          });
        });
      });
  }, [isOpen]);
  return (
    <div className="map">
      {/* mi map tag  */}
      <mi-map-googlemaps
        ref={mapElementReference}
        style={{ height: "100vh", width: "100%" }}
        mi-api-key={mapKey}
      ></mi-map-googlemaps>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {" "}
        <div className="maps-details">
          <div>
            <span>Name</span>
            <h4>{locationDetails?.properties?.name}</h4>
          </div>
          {locationDetails?.properties?.building && (
            <div>
              <span>Building</span>
              <h4>{locationDetails?.properties?.building}</h4>
            </div>
          )}

          <div>
            <span>Venue</span>
            <h4>{locationDetails?.properties?.venue}</h4>
          </div>
        </div>
      </Modal>
    </div>
  );
};
