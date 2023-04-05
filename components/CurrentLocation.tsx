import React from 'react';
// Styles
import { StyledBtn } from './CurrentLocation.styles';

type Props = {
  moveTo: (position: google.maps.LatLngLiteral) => void;
  showOpen: boolean
};

function CurrentLocation({moveTo, showOpen}:Props) {
  const [disabled, setDisabled] = React.useState(false);

  return (
    <>
    <button
      className= {(showOpen? 'sm:block hidden ':'') + 'absolute z-[5] right-5 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'}
      disabled={disabled}
      onClick={() => {
        // Deactivate button when geolocation is working
        setDisabled(true);
        navigator.geolocation.getCurrentPosition(position => {
          // Activate button when geolocation has finished
          setDisabled(false);
          // Call the callback function
          moveTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log({lag: position.coords.latitude, lng: position.coords.longitude});
        });
      }}
    >
      {disabled ? <p>Searching ...</p> : <p>Get Current Position</p>}
    </button>
    </>
  );
};

export default CurrentLocation;
