import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
// import { useQuery } from 'react-query'

// Components
import CurrentLocation from './CurrentLocation';

//Map Settings
import { containerStyle, center, options } from './settings';

// Styles
import { Wrapper, LoadingView } from './Map.styles';


import { createClient } from '@supabase/supabase-js';
import { getHawkrTypeIcon } from '../utils/functions/getHawkrTypeIcon';
import { useRouter } from 'next/router';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

  export default function Map({shops}:any, showOpen:boolean) {
    const {push} = useRouter()

    const { isLoaded } = useLoadScript({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
    });
  

  // Save map in ref if we want to access the map
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
  const [selectedMarker, setSelectedMarker] = React.useState<MarkerType>({} as MarkerType);
  
  const [userCurLocation, setUserCurLocation] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
  const [userLocationReceived, setUserLocationReceived] = React.useState<boolean>(false);
  const [userLocationRenderCount, setUserLocationRenderCount] = React.useState<number>(0);

  const getUserCurrentLocation = () =>{

    //Note: userLocationRenderCount needed atleast 2 times, 5 for safety.
    if(!userLocationReceived || userLocationRenderCount < 5){
      //Getting the current location of user
      navigator.geolocation.getCurrentPosition(position => {
        // Activate button when geolocation has finished
        // Call the callback function
        
        if (mapRef.current){
          const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
          mapRef.current.panTo(userPosition);
          mapRef.current.setZoom(12);
          setClickedPos(userPosition)
          setUserLocationReceived(true);
          setUserLocationRenderCount(userLocationRenderCount + 1);
        }
      });
    }
    return userCurLocation;
  }
  
  const moveTo = (position: google.maps.LatLngLiteral) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat: position.lat, lng: position.lng });
      mapRef.current.setZoom(12);
      setClickedPos(position);
    }
  };

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  const onUnMount = (): void => {
    mapRef.current = null;
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    setClickedPos({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
    setSelectedMarker({} as MarkerType);
    console.log({lat: e.latLng!.lat(), lng: e.latLng!.lng()});
  };

  const onMarkerClick = (marker: MarkerType) => {
  
    setSelectedMarker(marker)
    push(`https://maps.google.com?q=${marker.location.lat},${marker.location.lng}`)

    // console.log(marker)
  };

  if (!isLoaded) return <div> Map Loading ...</div>

  return (
    <div>
      <CurrentLocation moveTo={moveTo} showOpen={showOpen}/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        // This looks like it should be kept?
        center={getUserCurrentLocation()}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnMount}
        onClick={onMapClick}
        >
        {clickedPos.lat ? <Marker position={clickedPos} /> : null}
        {clickedPos.lat ? shops?.map((marker:any) => (

          <Marker
          key={marker.shopsID}
          position={marker.location}
          onClick={() => onMarkerClick(marker)}
          icon ={{
            url: getHawkrTypeIcon(marker.hawkrType),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(50, 30)
          }}
          />
          )): null}
        </GoogleMap>
        </div>
  );
};
