import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { createClient } from "@supabase/supabase-js";
import { useState } from "react"

// const supabase = useSupabaseClient();
// const [images, setImages] = useState<any>([]);

//https://www.youtube.com/watch?v=8tfdY0Sf2rA&t=210s
// Video helps with functions above ^

export async function getBaseHawkrImage(supabase){

    const {data, error} = await supabase
    .storage
    .from('base-hawkr')
    .list("", {
        limit: 1,
        offset: 0,
        sortBy: {column: "name", order: "asc"}
    })

    if(data !== null){
        return {
            data: data,
            error: null
        }
    }
    else{
        alert("Error loading base image")
        console.log(error)
        return {
            data: null,
            error: error
        }
    }
}

// TO be utilized in 'Create a Shop' or 'Edit a shop'
export async function uploadShopImage(e, supabase, userID, shopID){

    console.log('uploadShop Image Function!! : ', e)

    // console.log(userID, shop[0])
    let file = e

    console.log(file)
    console.log(typeof(file))
    console.log(file.name)
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .upload(userID + "/" + shopID + '/' + file.name, file, 
    {cacheControl: '3600', 
    upsert: false, 
    })

    if(data){
        console.log("successfully uploaded", data)
        // alert('Successfully Uploaded!')
    }
    else{
        console.log(error)
    }
}

export async function uploadProfileImage(e,user){
    console.log(e.target.files)
    let file = e.target.files[0]
    const supabase = useSupabaseClient();

    const {data, error} = await supabase
    .storage
    .from('profile-images')
    .upload(user.id + "/" + file.name, file)

    if(data){
        console.log("successfully uploaded")
        // alert('Successfully Uploaded!')
    }
    else{
        console.log(error)
    }
}

export async function removeShopImage(e, supabase, userID, shopID){
    
    let file_name = e
    const path = `${userID}/${shopID}/${file_name}`
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .remove([path])

    // .upload(userID + "/" + shopID + '/' + file.name, file)

    if(data){
        console.log("Successfully deleted ", data)
        // alert('Successfully Uploaded!')
    }
    else{
        console.log(error)
    }

}

export async function replaceShopImage(old_path, file, supabase, userID, shopID){

    console.log(old_path)
    console.log(file)
    const { data, error } = await supabase
    .storage
    .from('shop-images')
    .update(old_path, file, {
        cacheControl: '3600',
        // Overwrite file if it exis
        upsert: true
    })

}

export async function getShopImage(userID, shopID, supabase){
    
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .list(userID + "/" + shopID + "/", {
        limit: 1,
        offset: 0,
        sortBy: {column: "name", order: "asc"}
    })

    console.log('non-propped data: ', data)
    if(data !== null){
        console.log('MADE IT IN DATA: ', data)
        // setImages(data);
        return {
            data: data,
            error: null
        }
    }
    else{
        alert("Error loading images")
        console.log(error)
        return {
            data: null,
            error: error
        }
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