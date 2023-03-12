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

    useEffect(() => {
        getShopImage(userID, supabase, setImages)
    }, [])

    return(
        <div>
            <h1> Testing page for cdn functions</h1>
            <div>

                {/* {images.map( (image) => {
                    return(
                        <>
                        {console.log(image)}
                        {console.log(`Image ID: ${image.id}\tImage Name: ${image.name}`)}
                        {console.log(`URL: ${SHOP_CDN_URL}/${userID}/${image.name}`)}
                        <Image key={image.id} height={100} width={100} alt="hi" src={SHOP_CDN_URL + '/' + userID + '/' + image.name}/>
                        </>
                        );
                })} */}
            </div>
            <FileUpload/>
        </div>
    )
}