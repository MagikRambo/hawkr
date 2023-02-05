import React from "react"

export default async function reverseGeocode(){
    
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY!

    const LAT = 40.747104747417886
    const LNG = -111.84798275571772
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${API_KEY}`


    var address;
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
             address = data.results[0].formatted_address;
            // console.log(parts);
            // console.log(parts.formatted_address);
        }).catch(err => console.warn(err.message))
    
    console.log(address)
    return address;
}