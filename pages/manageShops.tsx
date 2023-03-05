import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { supabase } from "../utils/supabaseClient";
import get_vendor_by_id from "./api/getVendorByID";

export default function manageShops(){


    // console.log(userID)
    type VendorContent = Awaited<ReturnType<typeof get_vendor_by_id>>
    // const router = useRouter()
    // type ContentKind = Parameters<typeof get_vendor_by_id>
    
    const [vendor, setVendor] = useState<VendorContent>()    
    // const [user, setUser] = useState<any>()
    // const [userID, setUserID] = useState<NonNullable<string>>()
    const [reloading, setReloading] = useState<boolean>(true)
    // const userID = user?.id
    const router = useRouter()
    const { isLoading, session, error } = useSessionContext();
    const user = useUser()
    const userID = user?.id
    
    // console.log('isLoading:\t', isLoading, 'user:\t', user, 'session:\t', session)
    if(!isLoading && !session){
        router.push('/hawkrVendorInfo')
    }
    

    useEffect( () => {
        const getVendor = async () =>{
            if (userID)
            {
                const v = await get_vendor_by_id(userID.toString())
                setVendor(v)
            }
        }

        // fetchData().catch(console.error)
        getVendor().catch(console.error)
    }, [user])
    
        // return <p>Redirecting...</p>

    
    //retrieve vendor and check if client is a vendor



    console.log(user , vendor)
    if (vendor && vendor.data && vendor.data[0]["state"] === 2){
        console.log("User is a Vendor! \t ", vendor.data[0]["state"])
        return(
            <div className=" bg-green-200">
                <h1> YOU DID IT! </h1>
            </div>
        )
        

    }
    // IF the user is a client redirect to hawkrVendorInfo Page
    else if (vendor && vendor.data && vendor.data[0]["state"] === 1){ 
        router.push('/hawkrVendorInfo')
        return (
            <div>
                <h1>Redirecting ...</h1>
            </div>
        ) 
    }


  }