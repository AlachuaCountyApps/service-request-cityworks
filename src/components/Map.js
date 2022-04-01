import { Box, Button, Modal } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const containerStyle = {
  width: '400px',
  height: '400px',
};

export default function Map({ open, handleClose }) {
  const [center, setCenter] = useState({ lat: 29.651634, lng: -82.324829 });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 29.651634,
    lng: -82.324829,
  });

  const mapRef = useRef(null);

  const handleMapLoad = (map) => {
    mapRef.current = map;
  };

  const handleBoundsChange = () => {
    if (!mapRef.current) return;
    const mapCenter = mapRef.current.getCenter().toJSON(); //get map center
    setMarkerPosition(mapCenter);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMarkerPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <LoadScript googleMapsApiKey='AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg'>
          <GoogleMap
            onLoad={handleMapLoad}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onCenterChanged={handleBoundsChange}
          >
            <Marker position={markerPosition} />
            <></>
          </GoogleMap>
        </LoadScript>
        <Button variant='contained' sx={{ my: 2 }} fullWidth>
          Set Issue Location
        </Button>
        <Button variant='outlined' onClick={handleClose} fullWidth>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
