import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
// import { useQuery } from 'react-query'
// Components
// import CurrentLocation from './components/CurrentLocation';
//API Calls

//Map Settings
import { containerStyle, center, options } from './settings';
//Image

// Styles
import { Wrapper, LoadingView } from './Map.styles';


export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
};

// const Map: React.FC = () => {
  export default function Map(){

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!,
  });

  console.log(`Google API KEY: ${process.env.NEXT_PUBLIC_GOOGLE_KEY}`)
  // Save map in ref if we want to access the map
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral);
  const [selectedMarker, setSelectedMarker] = React.useState<MarkerType>({} as MarkerType);

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

  if (!isLoaded) return <div> Map Loading ...</div>

  return (
    <Wrapper>
      {/* <CurrentLocation moveTo={moveTo} /> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
        onClick={onMapClick}
      >
        {clickedPos.lat ? <Marker position={clickedPos} /> : null}
        {/* {nearbyPositions?.map(marker => (
          <Marker
            key={marker.id}
            position={marker.location}
            onClick={() => onMarkerClick(marker)}
            icon={{
              url: beerIcon,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(50, 30)
            }}
          />
        ))}

        {selectedMarker.location && (
          <InfoWindow
            position={selectedMarker.location}
            onCloseClick={() => setSelectedMarker({} as MarkerType)}
            >
              <div>
                <h3>{selectedMarker.name}</h3>
                {isLoadingMarkerWeather ? (
                  <p> Loading Weather ...</p>
                ) : (
                  <>
                    <p>{markerWeather?.text}</p>
                    <p>{markerWeather?.temp} &#xb0;F</p>
                  </>
                )}
              </div>
            </InfoWindow>
        )} */}
        </GoogleMap>
    </Wrapper>
  );
};
