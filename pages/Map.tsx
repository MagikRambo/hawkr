import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
// import { useQuery } from 'react-query'
import Test01 from '../components/test';

// Components
import CurrentLocation from '../components/CurrentLocation';
//API Calls
import cuz from './api/hello';
import useSWR from 'swr';

//Map Settings
import { containerStyle, center, options } from './settings';
//Image

import foodTruckIcon from './../public/img/foodTruck.svg'
import artIcon from './../public/img/art.svg'
import clothesIcon from './../public/img/clothes.svg'

// Styles
import { Wrapper, LoadingView } from './Map.styles';
import { NextApiRequest, NextApiResponse } from 'next';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};


  export default function Map(){
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

  // const testAPICall01 = () => {
  //   const [data, setData] = useState(null)
  
  //   useEffect(() => {
  //     fetch('/api/hello')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setData(data)
  //       })
  //   }, [])
  //   return data
  // }
  //const [propValues, setPropValues] = React.useState<JSON>(JSON.parse(cuz));
//apiURL: (address: string, req: {method: string, body: JSON})
  const fetcher  = async (apiURL:string, apiBody:{method:string, body:string}) => fetch(apiURL).then((res) => res.json())
  const address = `/api/hello`
  const {data, error} = useSWR(address, fetcher)
  const testAPICall = async () => {
  
    const f = await fetcher(address, {
      method: "GET",
      body: JSON.stringify('apple'),
    });
    console.log("testAPI was called", f);
  }
  //testAPICall()
  const [helloVar, setHelloVar] = React.useState<any>(testAPICall);
  // const [helloVar01, setHelloVar01] = React.useState<any>(testAPICall01);

  //console.log(helloVar)
  // console.log(helloVar01)
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

  const onMarkerClick = (marker: MarkerType) => setSelectedMarker(marker);
  const foodTruckSVG = foodTruckIcon.src as string
  const artSVG = artIcon.src as string
  const clothesSVG = clothesIcon.src as string

  if (!isLoaded) return <div> Map Loading ...</div>
  // if (foodTruckSVG) console.log(foodTruckSVG)
  return (
    <Wrapper>
      <CurrentLocation moveTo={moveTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={getUserCurrentLocation()}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnMount}
        onClick={onMapClick}
        >
        {clickedPos.lat ? <Marker position={clickedPos} /> : null}
        {clickedPos.lat ? <Marker
            position={{lat: 40.747104747417886, lng: -111.84798275571772}}
            icon={{
              url: foodTruckSVG,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />: null}
                  {clickedPos.lat ? <Marker
            position={{lat: 40.762341053140275, lng: -111.8356704711914}}
            icon={{
              url: foodTruckSVG,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />: null}
                  {clickedPos.lat ? <Marker
            position={{lat: 40.7687279133525, lng: -111.85475528120186}}
            icon={{
              url: artSVG,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />: null}
                  {clickedPos.lat ? <Marker
            position={{lat: 40.77165302930935, lng: -111.84608638166573}}
            icon={{
              url: artSVG,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />: null}
                  {clickedPos.lat ? <Marker
            position={{lat: 40.76229220499177, lng: -111.85501277326729}}
            icon={{
              url: clothesSVG,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />: null}
                  {clickedPos.lat ? <Marker
            position={{lat: 40.75650603621897, lng: -111.85484111189034}}
            icon={{
              url: clothesSVG,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />: null}
        </GoogleMap>
        <Test01/>
    </Wrapper>
  );
};
