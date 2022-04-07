import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';
import Geocode from 'react-geocode';

const googleKey = `AIzaSyBRbdKmyFU_X9r-UVmsapYMcKDJQJmQpAg`;

Geocode.setApiKey(googleKey);
Geocode.setLocationType('ROOFTOP');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 400 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const containerStyle = {
  width: '400px',
  height: '400px',
};

const mobileContainerStyle = { width: '300px', height: '400px' };

const mapLibraries = ['places'];

export default function Map({
  open,
  handleClose,
  address,
  handleAddressChange,
}) {
  const [mapSize, setMapSize] = useState({
    width: '400px',
    height: '400px',
  });
  const [center, setCenter] = useState({ lat: 29.651634, lng: -82.324829 });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 29.651634,
    lng: -82.324829,
  });
  const [getAddressManually, setGetAddressManually] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const mapRef = useRef(null);

  const handleResize = () => {
    if (window.innerWidth <= 800) setMapSize(mobileContainerStyle);
    else setMapSize(containerStyle);
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setCenter(markerPosition);
  };

  const handleBoundsChange = () => {
    if (!mapRef.current) return;
    const mapCenter = mapRef.current.getCenter().toJSON(); //get map center
    if (mapCenter) setMarkerPosition(mapCenter);
  };

  const handleOnIdle = () => {
    // Get address from latitude & longitude.
    Geocode.fromLatLng(markerPosition.lat, markerPosition.lng).then(
      (response) => {
        updateSelectedAddress(response.results[0]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const updateSelectedAddress = (data) => {
    const addressObj = {};
    address.location = addressObj.street = data.formatted_address;
    for (let i = 0; i < data.address_components.length; i++) {
      for (let j = 0; j < data.address_components[i].types.length; j++) {
        switch (data.address_components[i].types[j]) {
          case 'locality':
            addressObj.city = data.address_components[i].long_name;
            break;
          case 'administrative_area_level_2':
            addressObj.county = data.address_components[i].long_name;
            break;
          case 'postal_code':
            addressObj.zip = data.address_components[i].long_name;
            break;
          case 'route':
            addressObj.shortAddress = data.address_components[i].short_name;
            break;
          case 'street_number':
            addressObj.streetNumber = data.address_components[i].long_name;
            break;
          default:
            break;
        }
      }
    }
    handleAddressChange(addressObj);
  };

  const onLoad = (autoc) => {
    setAutocomplete(autoc);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const locationData = autocomplete.getPlace();
      const lat = locationData.geometry.location.lat();
      const lng = locationData.geometry.location.lng();
      updateSelectedAddress(locationData);
      setCenter({ lat, lng });
      setMarkerPosition({ lat, lng });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleAddressSelectionModeChange = () => {
    setGetAddressManually(!getAddressManually);
  };

  useEffect(() => {
    handleResize();
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

  window.addEventListener('resize', handleResize);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              variant='contained'
              onClick={handleAddressSelectionModeChange}
              fullWidth
            >
              {!getAddressManually
                ? 'Click here to Enter Address Manually'
                : 'Click here to Set Location on Map'}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <LoadScript googleMapsApiKey={googleKey} libraries={mapLibraries}>
              <GoogleMap
                onLoad={handleMapLoad}
                mapContainerStyle={mapSize}
                center={center}
                zoom={14}
                onCenterChanged={handleBoundsChange}
                onIdle={handleOnIdle}
              >
                {getAddressManually && (
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                    bounds={
                      new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(-82.657043, 29.726635),
                        new window.google.maps.LatLng(-82.657035, 29.726937),
                        new window.google.maps.LatLng(-82.657054, 29.727429),
                        new window.google.maps.LatLng(-82.657043, 29.728345),
                        new window.google.maps.LatLng(-82.657051, 29.728784),
                        new window.google.maps.LatLng(-82.657055, 29.729708),
                        new window.google.maps.LatLng(-82.657047, 29.730093),
                        new window.google.maps.LatLng(-82.657048, 29.730583)
                      )
                    }
                  >
                    <input
                      type='text'
                      placeholder='Enter Issue Address'
                      style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `340px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: 'absolute',
                        left: '40%',
                        marginLeft: '-120px',
                      }}
                    />
                  </Autocomplete>
                )}

                <Marker position={markerPosition} />
              </GoogleMap>
            </LoadScript>
          </Grid>
          {!getAddressManually && (
            <Grid item xs={12}>
              <TextField
                label='Address'
                value={address.street}
                disabled
                fullWidth
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant='contained'
              onClick={() => {
                handleOnIdle();
                handleClose();
              }}
              fullWidth
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
