import Map from "./Map"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
export default function Explore() {
        const { isLoaded } = useLoadScript({
          googleMapsApiKey: "AIzaSyAUwo9Bcp-d1hf1Zu6BIPZkFrTB5MjLQIU",
        });
       
        if (!isLoaded) return <div>Loading...</div>;
        return <MyMap/>;
       }

function MyMap(){
    const center = useMemo(() => ({ lat: 44, lng: -80}), []);
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
          <Marker position={center} />
        </GoogleMap>
      );
    }


    // return (
    //     <>        <h1>This is Explore page</h1>
       
    //     </>

    // );
    // }