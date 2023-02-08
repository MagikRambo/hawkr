import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"

const supabase = useSupabaseClient();
const [images, setImages] = useState<any>([]);

//https://www.youtube.com/watch?v=8tfdY0Sf2rA&t=210s
// Video helps with functions above ^
export async function uploadShopImage(e, user){

    let file = e.target.files[0]

    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .upload(user.id + "/" + file.name, file)

    if(data){
        console.log("successfully uploaded")
    }
    else{
        console.log(error)
    }
}

export async function uploadProfileImage(e,user){
    let file = e.target.files[0]

    const {data, error} = await supabase
    .storage
    .from('profile-images')
    .upload(user.id + "/" + file.name, file)

    if(data){
        console.log("successfully uploaded")
    }
    else{
        console.log(error)
    }
}

export async function getShopImage(e,user){
    let file = e.target.files[0]

    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .list(user?.id + "/", {
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
export async function getProfileImage(e,user){
    let file = e.target.files[0]

    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .list(user?.id + "/", {
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