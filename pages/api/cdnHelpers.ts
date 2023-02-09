import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { createClient } from "@supabase/supabase-js";
import { useState } from "react"

// const supabase = useSupabaseClient();
// const [images, setImages] = useState<any>([]);

//https://www.youtube.com/watch?v=8tfdY0Sf2rA&t=210s
// Video helps with functions above ^
export async function uploadShopImage(e, supabase, userID){

    let file = e.target.files[0]
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .upload(userID + "/" + file.name, file)

    if(data){
        console.log("successfully uploaded")
        alert('Successfully Uploaded!')
    }
    else{
        console.log(error)
    }
}

export async function uploadProfileImage(e,user){
    let file = e.target.files[0]
    const supabase = useSupabaseClient();

    const {data, error} = await supabase
    .storage
    .from('profile-images')
    .upload(user.id + "/" + file.name, file)

    if(data){
        console.log("successfully uploaded")
        alert('Successfully Uploaded!')
    }
    else{
        console.log(error)
    }
}

export async function getShopImage(shopID, supabase, setImages){
    
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .list(shopID + "/", {
        limit: 10,
        offset: 0,
        sortBy: {column: "name", order: "asc"}
    })


    if(data !== null){
        setImages(data);
    }
    else{
        alert("Error loading images")
        console.log(error)
    }
}
export async function getProfileImage(profileID, supabase, setImages){
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .list(profileID + "/", {
        limit: 10,
        offset: 0,
        sortBy: {column: "name", order: "asc"}
    })


    if(data !== null){
        setImages(data);
    }
    else{
        alert("Error loading images")
        console.log(error)
    }
}