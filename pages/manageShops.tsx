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
import clsx from 'clsx'

//NOTE: Current state of project - Location of shop/user is where the shop was created in form
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

export default function manageShops(){

    const supabase = useSupabaseClient();

    type VendorContent = Awaited<ReturnType<typeof get_vendor_by_id>>
    type ImageContent = Awaited<ReturnType<typeof get_vendor_by_id>>
    type shopsContent = Awaited<ReturnType<typeof getShopsByVendorId>>



    // const router = useRouter()
    // type ContentKind = Parameters<typeof get_vendor_by_id>
    
    const [vendor, setVendor] = useState<VendorContent>()    
    // const [user, setUser] = useState<any>()
    // const [userID, setUserID] = useState<NonNullable<string>>()
    const [reloading, setReloading] = useState<boolean>(true)
    const [userLocation, setUserLocation] = useState<any>()
    const [shops, setShops] = useState<shopsContent>()

    const [enabled, setEnabled] = useState(false)


    // const userID = user?.id
    const router = useRouter()
    const { isLoading, session, error } = useSessionContext();
    const user = useUser()
    const userID = user?.id

    const [images, setImages] = useState<ImageContent>()
    const SHOP_CDN_URL = 'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/shop-images'

    const [showModal, setShowModal] = useState(false);


    const bg_colors = {
        'bg-blue-500': enabled,
        'bg-red-500': !enabled
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();

    const getUserCurrentLocation = () =>{
        //Getting the current location of user
        navigator.geolocation.getCurrentPosition(position => {
        // Activate button when geolocation has finished
        // Call the callback function
            const userPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
            setUserLocation(userPosition)
        });
    }
    
 
    const onSubmit = async (formData:any) => {

    console.log('data contents: ',formData)
    var img_src
    console.log('FILE STATUS: ', formData.file)
    if (formData.file['length'] > 0){
        //TODO / NOTE: when creating shop. can upload 1 image, but when editing. Needs to get first then remove from CDN and update DB
        await uploadShopImage(formData.file[0], supabase, user?.id)
        const res_image =  await getShopImage(userID, supabase, setImages)
        
        console.log('res image return: ', res_image)
        setImages(res_image)

        console.log('USE STATE CONTENT OF IMAGES: ', images)
    //    console.log('VARIABLE D: ', d)

        // const image:any = images[0] //TODO: make type for this

        console.log(images)
        img_src =`${SHOP_CDN_URL}/${userID}/${res_image.data[0].name}`
        console.log("SUCCESSFULLLY ADDED TO CDN BRO!!!! :)")
        // formData.append('file', src)
    }

    console.log('USER CURRENT LOCATION: ', userLocation)
    
    let vendorID = userID
    let shopName = formData.shopName
    let shopDescription = formData.shopDescription
    let messagesOn = formData.messagesFlag
    let liveTracking = formData.liveTracking
    let hawkrType = formData.hawkrType
    let timeOpen = `${formData.hoursOpen}:${formData.minutesOpen}${formData.ampmOpen}`
    let timeClosed = `${formData.hoursClosed}:${formData.minutesClosed}${formData.ampmClosed}`
    
    console.log(timeOpen, timeClosed)
    const { data, error } = await supabase
    .from('shops')
    .insert([
      { vendorID: vendorID,
        shopName: shopName ,
        shopDescription: shopDescription ,
        open: false ,
        timeOpen: timeOpen,
        timeClosed: timeClosed ,
        messagesOn: messagesOn ,
        liveTracking: liveTracking ,
        hawkrType: hawkrType, 
        shop_image_url: img_src ? img_src : null},
    ])
    

    const { data:data2, error:error2 } = await supabase
    .from('locations')
    .insert([
      { UUID: vendorID, location: userLocation },
    ])
  

    console.log('supabase DETAILA !!!!!!! \t ', data2, error2)
    console.log('form Data contents: ', formData);

    if (!error2 || !error){
        toast("Successfully created your shop!")
    }else{
        if (error){
            alert('Error in creating shop')
        }else{
            alert('Error in uploading locations')
        }
    }

    reset()
    };

    
    // console.log('isLoading:\t', isLoading, 'user:\t', user, 'session:\t', session)
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

        const getImages = async () => {
            if (userID)
            {
                const I = await getShopImage(userID, supabase, setImages)
            }
        }

        const getShops = async () => {
            if (userID){
                const res_shops = await getShopsByVendorId(userID.toString())
                setShops(res_shops)
            }
        }

        // fetchData().catch(console.error)
        getVendor().catch(console.error)
        getImages().catch(console.error)
        getShops().catch(console.error)
        getUserCurrentLocation()
    }, [user])
    
    // return <p>Redirecting...</p>
    console.log('2nd section mapped imanges: ', images)


    const modelContext = (
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
    </div>)}
    {showModal && ( 
        <div className="overflow-scroll bg-white rounded-xl h-[75vh] w-[75vw] shadow-xl">
        <div className="flex justify-end">    
        {/* Dark color for button:  dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 */}
        <button type="button" onClick={() => setShowModal(false)} className="absolute ml-auto mx-1.5 my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-default" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        </div>
        <div  className="box-content h-4/5 w-4/5">

        <div className="flex justify-center items-center pl-52">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                className="space-y-8 divide-y divide-gray-200"
                >
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
                            <label htmlFor="shopName" className="block text-sm font-medium leading-6 text-gray-900">
                                Shop Name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                id="shopName"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("shopName", {required: true})}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="shopDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                id="shopDescription"
                                rows={3}
                                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                {...register("shopDescription", {required: true})}
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
                            autoComplete="hawkrType"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register("hawkrType", {required: true})}
                            >
                            <option>FoodTruck</option>
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
                                Current Shop Photo
                            </label>
                            <div className="mt-2 flex items-center">
                            {images?.data?.map( (image) => {
                                return(
                                    <>
                                    {/* {console.log(image)}
                                    {console.log(`Image ID: ${image.id}\tImage Name: ${image.name}`)}
                                    {console.log(`URL: ${SHOP_CDN_URL}/${userID}/${image.name}`)} */}
                                    <Image key={image.id} height={100} width={100} alt="hi" src={SHOP_CDN_URL + '/' + userID + '/' + image.name}/>
                                    </>
                                    );
                            })}
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                                Shop Photo
                            </label>
                            
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" 
                                aria-describedby="file_input_help" 
                                type="file"
                                {...register("file", {required: false})}
                                />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                        </div>
                    </div>
                </div>

                {/* Time Open */}
                <div className="pt-8">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Time Open</h3>
                        <p className="mt-1 text-sm text-gray-500">Typical time open during days open</p>
                    </div>
                </div>

                <div className="mt-2 p-3 w-7/12 bg-white rounded-lg shadow-xl">
                    <div className="flex-col">
                        <select className="border-transparent bg-transparent text-l appearance-none outline-none"
                            {...register("hoursOpen", {required: true})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        </select>
                        <span className="text-l mr-2">:</span>
                        <select className="border-transparent bg-transparent text-l appearance-none outline-none"
                            {...register("minutesOpen", {required: true})}>
                        <option value="00">00</option>
                        <option value="05">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        </select>
                        <select className="border-transparent bg-transparent text-l appearance-none outline-none"
                            {...register("ampmOpen", {required: true})}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                        </select>
                    </div>
                </div>

                {/* Time Closed */}
                <div className="pt-8">
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Time Closed</h3>
                        <p className="mt-1 text-sm text-gray-500">Time open up to this time</p>
                    </div>
                </div>

                <div className="mt-2 p-3 w-7/12 bg-white rounded-lg shadow-xl">
                    <div className="flex-col">
                        <select className="border-transparent bg-transparent text-l appearance-none outline-none"
                            {...register("hoursClosed", {required: true})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        </select>
                        <span className="text-l mr-2">:</span>
                        <select className="border-transparent bg-transparent text-l appearance-none outline-none"
                            {...register("minutesClosed", {required: true})}>
                        <option value="00">00</option>
                        <option value="05">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        </select>
                        <select className="border-transparent bg-transparent text-l appearance-none outline-none"
                            {...register("ampmClosed", {required: true})}>
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                        </select>
                    </div>
                </div>


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
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                {...register("liveTracking", {required: false})}
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
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                {...register("messagesFlag", {required: false})}
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
                    {/* <fieldset className="mt-6">
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
                    </fieldset> */}
                </div>
                </div>
            </div>

            <div className="py-5">
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
            <ToastContainer />
    </div>
    )}
</div>)

    console.log(shops?.data)
    //retrieve vendor and check if client is a vendor


    // ##################################################### Returning state below

    if (vendor && vendor.data && vendor.data[0]["state"] === 2){
        return(
            //If there exists no shops ---> Prompt this screen
            //Window boxed screen of bg color
            <>
            {shops && shops.data && !shops.data[0] && (
                <div className=" h-[80vh] w-screen bg-slate-200 text-black">
                {/* Centering Items */}
                    {modelContext}
                </div>
            )}
            {shops && shops.data && shops.data[0] && (
                <div className="bg-slate-200 h-screen w-screen">

                    {/* Button to create more shops */}

                    <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Create Shop
                    </button>
           
                       


                    <div className="grid h-screen place-items-center">
                    {/* TODO: Make map function IMAGES BELOW */}
                        <div className="w-80 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                            <div className="h-64 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover rounded-xl bg-center bg-[url(https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/shop-images/e86dccfa-9039-458f-9815-9a783480dbec/IMG_4612.jpg)]">
                                
                                
                                <div className="flex justify-between">
                                    <input type="checkbox"/>
                                    <div className="relative h-32 w-32 ">
                                        <button className="absolute -right-4 -top-4 rounded-xl bg-gray-900 bg-opacity-50 pl-2 pb-2 text-white hover:bg-gray-500 hover:bg-opacity-50 hover:text-blue-500">
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

                                        <Switch
                                            checked={enabled}
                                            onChange={setEnabled}
                                            className={classNames(
                                                enabled ? 'bg-green-600' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 -bottom-1 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2'
                                                )}
                                                >
                                                <span className="sr-only">Use setting</span>
                                                    <span
                                                    className={classNames(
                                                        enabled ? 'translate-x-5' : 'translate-x-0',
                                                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                        )}
                                                        >
                                                    <span
                                                    className={classNames(
                                                        enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
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
                                                        enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
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