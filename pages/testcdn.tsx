import Image from "next/image";
import FileUpload from "../components/FileUpload";



export default function testcdn(){
    const SHOP_CDN_URL = 'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/shop-images'
    const last = '01f77779-1153-4869-b2c1-64e7b3fb8588/MagikRambo.jpeg'
    return(
        <div>
            <h1> Testing page for cdn functions</h1>
            <Image width={10} height={10} alt="rambo" src={SHOP_CDN_URL + '/' + last}/>
            <FileUpload/>
        </div>
    )
}