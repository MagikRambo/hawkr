import { uploadShopImage } from "../pages/api/cdnHelpers"
import { useSupabaseClient } from "@supabase/auth-helpers-react"



export default function FileUpload(){
    const supabase = useSupabaseClient();
    let userID = '01f77779-1153-4869-b2c1-64e7b3fb8588'

    return(
    <div className="flex w-full h-screen items-center justify-center bg-grey-lighter">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-700">
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal text-gray-800">Select a file</span>
            <input type='file' className="hidden" onChange={(e) => uploadShopImage(e,supabase,userID)} />
        </label>
    </div>   
    )
    }