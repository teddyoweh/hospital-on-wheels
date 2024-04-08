"use client"
import React from 'react';
import { GoogleMap, useLoadScript, Marker,OverlayView } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
const customMarkerStyle = {
 
  backgroundColor: '#c6d5ee',
  height: '25px',
  width: '25px',
  borderRadius: '100%',
  color: 'white',
  borderWidth: '3px',
  borderStyle: 'solid',
  borderColor: '#c6d5ee',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

};
const customMarkerStyle_ = {
 
  backgroundColor: '#4285f4',
  height: '15px',
  width: '15px',
  borderRadius: '50%',
  color: 'white',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#fff',
};
const customNurseStyle = {
  height: '30px',
  width: '30px',
  objectFit: 'cover',
  borderRadius: '100%',
}
export const MapScreen = ({center,nurses}) => {
  const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
function getCoordsArray(data) {
  let coordsArray = [];
  data.forEach(item => {
      if (item.coords && item.coords.lat && item.coords.lng) {
          coordsArray.push({
              lat: parseFloat(item.coords.lat),
              lng: parseFloat(item.coords.lng),
              img:item.uimg
          });
      }
  });
  return coordsArray;
}


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDHMb59ssAVVcI05TNPLXXYThJG-ykcTXI',
    libraries,
  });

  
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  const mapOptions = {
    disableDefaultUI: true, // Hides the default UI (zoom in/out buttons, etc.)
    clickableIcons: false, 
    styles: [
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'on', // Hide all labels
              },
            ],
          },
        {
          featureType: 'poi',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off', // Hide icons for places
            },
          ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off', // Hide administrative regions
              },
            ],
          },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              {
                visibility: 'off', // Hide transit routes
              },
            ],
          },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off', // Hide icons for transit (buses, trains, etc.)
              },
            ],
          },
      ],
   
  };
 
 
 
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        clickableIcons={false}
        center={center}
        options={mapOptions} // Pass the map options

      >
        <CustomMarker position={center} />
        {/* {nurses && getCoordsArray(nurses).map((nurse, index) => (
          <NursesMarkerMarker position={{
            lat: nurse.lat,
            lng: nurse.lng,
          }} img={nurse.img} key={index} />
        ))} */}

      </GoogleMap>
    </div>
  );
};
const CustomMarker = ({ position }) => {
    return (
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(width, height) => ({
          x: -(width / 2),
          y: -(height / 2),
        })}
      >
                <div style={customMarkerStyle}>
                <div style={customMarkerStyle_}></div>
                </div>

      </OverlayView>
    );
  };


  const NursesMarkerMarker = ({ position,img }) => {
    return (
      <OverlayView
        position={position}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(width, height) => ({
          x: -(width / 2),
          y: -(height / 2),
        })}
      >
                <img src={img} style={customNurseStyle} alt="nurse" />

      </OverlayView>
    );
  };