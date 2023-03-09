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

    const [showModal, setShowModal] = useState(false);
    
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



    // console.log(user , vendor)
    if (vendor && vendor.data && vendor.data[0]["state"] === 2){
        // console.log("User is a Vendor! \t ", vendor.data[0]["state"])
        return(
            //If there exists no shops ---> Prompt this screen
            //Window boxed screen of bg color
            <div className=" h-[80vh] w-screen bg-slate-200 text-black">
                {/* Centering Items */}
                <div className="flex justify-center items-center h-[80vh]">
                    {!showModal && (<div className="text-4xl text-gray-500 space-y-2">
                            
                        <h1 className="">No Shops have been found</h1>
                        <h1 className="pl-10">Lets create one together!</h1>
                        <div className="pl-20 py-2 text-xl">
                        <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Create Shop
                        </button>
                        </div>
                    </div>)}
                    {showModal ? 
    <div className="overflow-scroll bg-white rounded-xl h-[75vh] w-[75vw] border-4 box-shadow-md">
    <div className="flex justify-end">    
        <button onClick={() => setShowModal(false)} className=" absolute bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
            X
        </button>
    </div>
    <div  className="box-content h-4/5 w-4/5">

    <div className="flex justify-center items-center pl-52">
        <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Create a shop</h3>
                    <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="shop-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Shop Name
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            name="shop-name"
                            id="shop-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            About
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
                    </div>



                <div className="sm:col-span-5">
                    <label htmlFor="hawkrType" className="block text-sm font-medium leading-6 text-gray-900">
                        Hawkr Type
                    </label>
                    <div className="mt-2">
                        <select
                        id="hawkrType"
                        name="hawkrType"
                        autoComplete="hawkrType"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                        <option>Food Truck</option>
                        <option>Art</option>
                        <option>Clothes</option>
                        </select>
                    </div>
                </div>

                {/* <div className="sm:col-span-6">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div> */}



            </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Photo
                        </label>
                        <div className="mt-2 flex items-center">
                            <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            </span>
                            <button
                            type="button"
                            className="ml-5 rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                            Change
                            </button>
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="pt-8">
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                </div>

            </div> */}

            <div className="pt-8">
            <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Shop Settings</h3>
                <p className="mt-1 text-sm text-gray-500">
                Personalized settings on how to run your Shop. Manually or automatically
                </p>
            </div>
            <div className="mt-6">
                <fieldset>
                <legend className="sr-only">Live Tracking</legend>
                <div className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                    Tracking
                </div>
                <div className="mt-4 space-y-4">
                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                            id="liveTracking"
                            name="liveTracking"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3">
                            <label htmlFor="liveTracking" className="text-sm font-medium leading-6 text-gray-900">
                            Live Tracking
                            </label>
                            <p className="text-sm text-gray-500">Automatically track your location. No need for manual entry</p>
                        </div>
                    </div>

                    <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                            id="messagesFlag"
                            name="messagesFlag"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3">
                            <label htmlFor="messagesFlag" className="text-sm font-medium leading-6 text-gray-900">
                            Messages
                            </label>
                            <p className="text-sm text-gray-500">Ability to accept messages from client</p>
                        </div>
                    </div>

                </div>
                </fieldset>
                <fieldset className="mt-6">
                <legend className="contents text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                    <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        Everything
                    </label>
                    </div>
                    <div className="flex items-center">
                    <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        Same as email
                    </label>
                    </div>
                    <div className="flex items-center">
                    <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                        No push notifications
                    </label>
                    </div>
                </div>
                </fieldset>
            </div>
            </div>
        </div>

        <div className="pt-5">
            <div className="flex justify-end">
            <button
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
            </div>
        </div>
        </form>
        </div>
        </div>
 </div> : null}
                </div>
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