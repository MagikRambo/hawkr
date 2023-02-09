import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { GetStaticProps, GetServerSideProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import { getShopImage } from "./api/cdnHelpers";

// export async function getServerSideProps(){

//     // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

//     const supabase = useSupabaseClient()

//     const shopID = '01f77779-1153-4869-b2c1-64e7b3fb8588'
//     const { data } = await getShopImage(shopID, supabase);
//     console.log("DATA FROM THE FETCH: ", data)
//     return { props: { data: data } };
//   };
  

export default function testcdn({data}:any){
    const SHOP_CDN_URL = 'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/shop-images'
    const last = '01f77779-1153-4869-b2c1-64e7b3fb8588/MagikRambo.jpeg'
    const userID = '01f77779-1153-4869-b2c1-64e7b3fb8588'
    const supabase = useSupabaseClient()

    const [images, setImages] = useState([])

    // console.log(data);

    // const getShopImage =  async (user:string) => {

    //     const {data, error} = await supabase
    //     .storage
    //     .from('shop-images')
    //     .list(user + "/", {
    //         limit: 10,
    //         offset: 0,
    //         sortBy: {column: "name", order: "asc"}
    //     })
    
    
    //     if(data !== null){
    //         console.log("IN FUNCTION: ", data)
    //         return {data: data}
    //     }
    //     else{
    //         alert("Error loading images")
    //         console.log(error)
    //     }
    // }
    
 
    // var d 
    // useEffect(() => {
    //     d = getShopImage(userID);
    //     console.log("INSIDE USE EFFECT: ", d)
    // }, [])

    // var d;
    // var e;
    useEffect(() => {
        getShopImage(userID, supabase, setImages)
    }, [])

    // console.log("MAIN THREAD: ", images)
    return(
        <div>
            <h1> Testing page for cdn functions</h1>
            {/* <Image width={10} height={10} alt="rambo" src={SHOP_CDN_URL + '/' + last}/> */}
            <div>

                {images.map( (image) => {
                    return(
                        <>
                        {console.log(image)}
                        {console.log(`Image ID: ${image.id}\tImage Name: ${image.name}`)}
                        {console.log(`URL: ${SHOP_CDN_URL}/${userID}/${image.name}`)}
                        <Image key={image.id} height={10} width={10} alt="hi" src={SHOP_CDN_URL + '/' + userID + '/' + image.name}/>
                        </>
                        );
                })}
            </div>
            <FileUpload/>
        </div>
    )
}