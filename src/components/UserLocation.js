import { Link } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function UserLocation({ getUserLocation }) {
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          console.log(result.state);
          getUserLocation();
        } else if (result.state === 'prompt') {
          console.log(result.state);
          getUserLocation();
        } else if (result.state === 'denied') {
          setShowLink(true);
          console.log(result.state);
        }
      });
    } else {
      console.log('Not available');
    }
  }, []);

  return (
    <div>
      {showLink && (
        <Link
          href="https://support.google.com/chrome/answer/142065?hl=en"
          target="_blank"
        >
          How to allow a website to access your location
        </Link>
      )}
    </div>
  );
}
