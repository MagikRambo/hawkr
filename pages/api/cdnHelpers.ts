import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react"

// const supabase = useSupabaseClient();
// const [images, setImages] = useState<any>([]);

//https://www.youtube.com/watch?v=8tfdY0Sf2rA&t=210s
// Video helps with functions above ^

// TO be utilized in 'Create a Shop' or 'Edit a shop'
export async function uploadShopImage(e: any, supabase: SupabaseClient<any, "public", any>, userID: string | undefined, shop: { shopID: any; }[] | null){

    console.log('uploadShop Image Function!! : ', e)
    if(shop != null){
        console.log(userID, shop[0])
        let file = e
        const {data, error} = await supabase
        .storage
        .from('shop-images')
        .upload(userID + "/" + shop[0].shopID + '/' + file.name, file)
        
        if(data){
            console.log("successfully uploaded", data)
            // alert('Successfully Uploaded!')
        }
        else{
            console.log(error)
        }
    }

}

export async function useUploadProfileImage(e: { target: { files: any[]; }; },user: { id: string; }){
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

export async function getShopImage(userID: string, shopID: string | SupabaseClient<any, "public", any>, supabase: any){
    
    const {data, error} = await supabase
    .storage
    .from('shop-images')
    .list(userID + "/" + shopID + "/", {
        limit: 10,
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
export async function getProfileImage(profileID: string, supabase: { storage: { from: (arg0: string) => { (): any; new(): any; list: { (arg0: string, arg1: { limit: number; offset: number; sortBy: { column: string; order: string; }; }): PromiseLike<{ data: any; error: any; }> | { data: any; error: any; }; new(): any; }; }; }; }, setImages: (arg0: any) => void){
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