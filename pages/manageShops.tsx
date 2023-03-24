import { useSessionContext, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { getShopImage, uploadShopImage } from "./api/cdnHelpers";
import get_vendor_by_id from "./api/getVendorByID";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getShopsByVendorId from "./api/getShopsByVendorId";

import { Switch } from '@headlessui/react'
import ManageShopsForm from "../components/ManageShopsForm";

//NOTE: Current state of project - Location of shop/user is where the shop was created in form
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

export default function manageShops(){

    const supabase = useSupabaseClient();

    type VendorContent = Awaited<ReturnType<typeof get_vendor_by_id>>
    type ImageContent = Awaited<ReturnType<typeof getShopImage>>
    type shopsContent = Awaited<ReturnType<typeof getShopsByVendorId>>

    type formProps = {
        shopName: string,
        shopDescription: string,
        hawkrType: string,
        file: FileList,
        hoursOpen: string,
        minutesOpen: string, 
        ampmOpen: string,
        hoursClosed: string,
        minutesClosed: string,
        ampmClosed: string,
        liveTracking: Boolean,
        messagesFlag: Boolean
    }

    type shopType = {
        shopID: string,
        vendorID: string,
        shopName: string,
        shopDescription: string,
        open: boolean,
        timeOpen: string,
        timeClosed: string,
        messagesOn: boolean,
        liveTracking: boolean,
        hawkrType: string,
        shop_image_url: string
    }
     
    const [vendor, setVendor] = useState<VendorContent>()    
    const [reloading, setReloading] = useState<boolean>(true)
    const [userLocation, setUserLocation] = useState<any>()
    const [shops, setShops] = useState<shopsContent>()

    const [enabled, setEnabled] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const [editClicked, setEditClicked] = useState(false)

    const [editShop, setEditShop] = useState<any>()


    const [formData, setFormData] = useState<formProps>()


    const router = useRouter()
    const { isLoading, session, error } = useSessionContext();
    const user = useUser()
    const userID = user?.id

    const [images, setImages] = useState<ImageContent>()
    const SHOP_CDN_URL = 'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/shop-images'

    const [showModal, setShowModal] = useState(false);


    const getUserCurrentLocation = () =>{
        //Getting the current location of user
        navigator.geolocation.getCurrentPosition(position => {
        // Activate button when geolocation has finished
        // Call the callback function
            const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
            setUserLocation(userPosition)
        });
    }

    const  EnableShop = async (shop: shopType) => {

        //if enabled flag is set, one shop is active. cannot enable a shop, unless it is of the id that enabled.
        if (enabled && shop.open){
            const { data, error } = await supabase
            .from('shops')
            .update({ open: false})
            .match(
                {   shopID: shop.shopID,
                    vendorID: shop.vendorID,
                    shopName: shop.shopName ,
                    shopDescription: shop.shopDescription ,
                    timeOpen: shop.timeOpen,
                    timeClosed: shop.timeClosed ,
                    messagesOn: shop.messagesOn ,
                    liveTracking: shop.liveTracking ,
                    hawkrType: shop.hawkrType, 
                },
            )
            shop.open = false;

            setEnabled(false)
            setDisabled(true)
        }
        else if (enabled){
            setEnabled(true)
            setDisabled(false)
            alert('Error: Cannot enable a shop, one is already active')
        }
        else{
            const { data, error } = await supabase
            .from('shops')
            .update({ open: true})
            .match(
                {   shopID: shop.shopID,
                    vendorID: shop.vendorID,
                    shopName: shop.shopName ,
                    shopDescription: shop.shopDescription ,
                    timeOpen: shop.timeOpen,
                    timeClosed: shop.timeClosed ,
                    messagesOn: shop.messagesOn ,
                    liveTracking: shop.liveTracking ,
                    hawkrType: shop.hawkrType, 
                },
            )
            shop.open = true;
            setEnabled(true)
            setDisabled(false)
        }

    }
    
    if(!isLoading && !session){
        router.push('/hawkrVendorInfo')
    }
    
    //retrieve user current location on page build.
    

    useEffect( () => {
        const getVendor = async () =>{
            if (userID)
            {
                const v = await get_vendor_by_id(userID.toString())
                setVendor(v)
            }
        }



        const getShops = async () => {
            if (userID){
                const res_shops = await getShopsByVendorId(userID.toString())
                setShops(res_shops)
            }
        }

        getVendor().catch(console.error)
        getShops().catch(console.error)
        getUserCurrentLocation()
    }, [userID])

    
    console.log('2nd section mapped imanges: ', images)
    console.log('SHOPS CONTENT: ', shops?.data)

    // ##################################################### Returning state below

    if (vendor && vendor.data && vendor.data[0]["state"] === 2){
        return(
            //If there exists no shops ---> Prompt this screen
            //Window boxed screen of bg color
            <>
            {shops && shops.data && !shops.data[0] && (
                <div className=" h-[80vh] w-screen bg-slate-200 text-black">
                {/* Centering Items */}
                    <div className="flex justify-center items-center h-[80vh]">
                        {!showModal && (
                        <div className="text-4xl text-gray-500 space-y-2">
                                
                            <h1 className="">No Shops have been found</h1>
                            <h1 className="pl-10">Lets create one together!</h1>
                            <div className="pl-20 py-2 text-xl">
                            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Create Shop
                            </button>
                            </div>
                        </div>
                        
                        )}
    

                    {showModal &&  <ManageShopsForm  userID={userID} images={images} setShowModal={setShowModal}/>}
                    </div>
                </div>
            )}

            {/* !!!!!!!! SHOPS EXIST !!!!!! */}
            {shops && shops.data && shops.data[0] && (
                <div className="bg-slate-200 h-screen w-screen">

                    {/* Button to create more shops */}

                    <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Create Shop
                    </button>
           
                    <div className="grid h-screen place-items-center ">
                        {/* TODO: Make map function IMAGES BELOW */}
                        <>
                        {shops.data.map((shop) => 
                            <div className="w-80 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                                <div className="h-64 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover rounded-xl bg-center"
                                     style={{backgroundImage: `url(${shop.shop_image_url ? shop.shop_image_url :'https://via.placeholder.com/500'})`}}
                                >
                                    <div className="flex justify-between">
                                        <input type="checkbox"/>
                                        <div className="relative h-32 w-32 ">
                                            <button onClick={() => {
                                                setEditClicked(true)
                                                setEditShop(shop)
                                                setShowModal(true)
                                                }} 
                                                className="absolute -right-4 -top-4 rounded-xl bg-gray-900 bg-opacity-50 pl-2 pb-2 text-white hover:bg-gray-500 hover:bg-opacity-50 hover:text-blue-500">
                                            <div className="relative -left-1 -bottom-1">

                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M18.2929 3.70711C18.6834 3.31658 19.3166 3.31658 19.7071 3.70711L20.4142 4.41421C20.8047 4.80474 20.8047 5.4379 20.4142 5.82843L12.2628 13.9799C12.0432 14.1994 11.7756 14.3648 11.481 14.463L8.93669 15.3111C8.85851 15.3372 8.78414 15.2628 8.8102 15.1846L9.65831 12.6403C9.7565 12.3457 9.92191 12.0781 10.1415 11.8585L18.2929 3.70711Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="relative flex space-x-40 -left-4 -bottom-4 w-full rounded-xl pl-2 bg-slate-800 bg-opacity-90">
                                        <p className="text-2xl"> Open </p>

                                        {/*  Enable flag if open */}
                                        {shop.open && !enabled && (setEnabled(true), console.log(enabled), setDisabled(false))}
                                        
                                        <Switch
                                            checked={shop.open}
                                            onChange={() => EnableShop(shop)}
                                            className={classNames(
                                                shop.open ? 'bg-green-600' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 -bottom-1 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'
                                                )}
                                                >
                                                <span className="sr-only">Use setting</span>
                                                    <span
                                                    className={classNames(
                                                        shop.open ? 'translate-x-5' : 'translate-x-0',
                                                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                        )}
                                                        >
                                                    <span
                                                    className={classNames(
                                                        shop.open ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                                                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                                        )}
                                                        aria-hidden="true"
                                                        >
                                                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                                        <path
                                                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    </span>
                                                    <span
                                                    className={classNames(
                                                        shop.open ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                                                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                                        )}
                                                        aria-hidden="true"
                                                        >
                                                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
                                                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                                    </svg>
                                                    </span>
                                                </span>
                                            </Switch>

                                    </div>
                                </div>
                            </div>
                            )}
                        <div className="text-black">
                            {showModal &&  <ManageShopsForm  userID={userID} images={images} setShowModal={setShowModal} editFlag={true} formProps={editShop} />}
                        </div>
                        </>

                        

                    </div>

                </div>

            )} 

            </>
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