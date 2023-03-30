import { useSessionContext, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { getShopImage, uploadShopImage } from "./api/cdnHelpers";
import get_vendor_by_id from "./api/getVendorByID";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getShopsByVendorId from "./api/getShopsByVendorId";

import { Dialog, Switch, Transition } from '@headlessui/react'
import ManageShopsForm from "../components/ManageShopsForm";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
     
    const tabs = [
        { name: 'ALL SHOPS', href: '#', current: true },
        { name: 'ACTIVE', href: '#', current: false },
        { name: 'INACTIVE', href: '#', current: false },

      ]
      
      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    const [vendor, setVendor] = useState<VendorContent>()    

    const [shops, setShops] = useState<shopsContent>()

    const [enabled, setEnabled] = useState(false)

    const [editClicked, setEditClicked] = useState(false)

    const [editShop, setEditShop] = useState<any>()
    const [removeShop, setRemoveShop] = useState<any>()

    const [submissionType, setSubmissionType] = useState<string>('')
    const [userLocation, setUserLocation] = useState<any>()


    const router = useRouter()
    const { isLoading, session, error } = useSessionContext();
    const user = useUser()
    const userID = user?.id as NonNullable<string>

    const [images, setImages] = useState<ImageContent>()

    const [showModal, setShowModal] = useState(false);

    const [getShops, setGetShops] = useState(true);

    const [open, setOpen] = useState(false)

    // console.log('chan. sub. type: ',ChangeSubmissionType)
    // console.log('typeof chan. sub. type: ', typeof(ChangeSubmissionType))
    const ChangeSubmissionType = (arg:string) => {
        setSubmissionType(arg)
    }

    const deleteShop = async (shopID:string) => {

        const bucket = "shop-images"

        const {data, error} = await supabase
        .from('shops')
        .delete()
        .eq('shopID', shopID)


        const { data:list, error:listError } = await supabase.storage.from(bucket).list(`${userID}/${shopID}`);
        const filesToRemove = list?.map((x) => `${userID}/${shopID}/${x.name}`) as NonNullable<Array<string>>;
        const { data:resRemove, error:resRemoveError } = await supabase.storage.from(bucket).remove(filesToRemove);

        if (shops){
            for (let i = 0; i < shops.data["length"]; i++ ){
                console.log(shops.data[i].shopID)
                console.log(shopID)
                if (shops.data[i].shopID === shopID){
                    //quick fix

                    if (shops.data[i].open){
                        shops.data[i].open = false
                        setEnabled(false)
                    }

                    console.log(i)
                    // delete(shops.data[i])
                    // shops.data.splice(i,1)
                    setGetShops(true)
                    console.log(shops)
                    break
                }
            }
        }
            
        console.log(shops)
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
        }
        else if (enabled){
            setEnabled(true)
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
        getVendor().catch(console.error)
    }, [userID])

    useEffect( ()  => {
        const getShops = async () => {
            if (userID){
                const res_shops = await getShopsByVendorId(userID.toString())
                setShops(res_shops)
                setGetShops(false)
            }
        }
        getShops().catch(console.error)

    }, [userID, getShops])

    console.log(userLocation)

    console.log('SUBMISSION TYPE CONTENTS: ', submissionType)
    if (submissionType === 'CREATE'){
        toast("Successfully created your shop!")
        setSubmissionType('')
        
    }else if (submissionType === 'EDIT'){
        toast('Successfully edited your shop!')
        setSubmissionType('')
    }
    
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
    

                    {showModal &&  <ManageShopsForm getShops={setGetShops} userID={userID} setSubmissionType={setSubmissionType} showModal={showModal} setShowModal={setShowModal}/>}
                    </div>
                </div>
            )}

            {/* !!!!!!!! SHOPS EXIST !!!!!! */}
            {shops && shops.data && shops.data[0] && (
                <div className="bg-slate-200 h-screen w-screen">

                {/* Bar above to creat shops etc.... */}
                    <div className="relative bg-gray-300 border-b border-gray-400 pb-5 sm:pb-0 w-screen h-30 ">

                        <div className="relative pt-8 pl-10 text-2xl font-bold text-black">
                           
                           <div className="flex">
                                <p> Manage Shops </p>
                                <p className="pl-2"> |</p>
                                <p className="pl-2"> {shops.data["length"]} Shops </p>
                                {/* Button to create more shops */}

                                <div className="absolute right-12 top-10  ">

                                    <button 
                                        onClick={() => (setEditClicked(false), setEditShop(null), setShowModal(true))} 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                    + Create Shop
                                    </button>
                                </div>
                                
                             </div> 
                        </div>
                        <div className="pl-10 mt-4">
                            <div className="sm:hidden">
                            <label htmlFor="current-tab" className="sr-only">
                                Select a tab
                            </label>
                            <select
                                id="current-tab"
                                name="current-tab"
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                defaultValue={tabs.find((tab) => tab.current).name}
                            >
                                {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                                ))}
                            </select>
                            </div>
                            <div className="hidden sm:block">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                <a
                                    key={tab.name}
                                    href={tab.href}
                                    className={classNames(
                                    tab.current
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                >
                                    {tab.name}
                                </a>
                                ))}
                            </nav>
                            </div>
                        </div>
                    </div>

           
                    <div className="relative grid grid-cols-4 h-screen place-items-center ">
                        {/* TODO: Make map function IMAGES BELOW */}
                        <>
                        {shops.data.map((shop) => 
                            <div className="w-80 rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                                <div className="h-64 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover rounded-xl bg-center"
                                     style={{backgroundImage: `url(${shop.shop_image_url})`}}
                                >
                                    <div className="flex justify-between">
                                        <div className="relative h-32 w-32">
                                            <button type="button"
                                                onClick={() => (setOpen(true), setRemoveShop(shop))} 
                                                className="relative -left-6 -top-6 focus-visible:outline-offset-[-4px] rounded-xl bg-gray-900 bg-opacity-50 pl-2 pb-2 text-white hover:bg-gray-500 hover:bg-opacity-50 hover:text-blue-500"
                                                >
                                                <div className="relative right-1 -bottom-1">

                                                    <span className="sr-only">Dismiss</span>
                                                    <XMarkIcon className="h-6 w-6 text-white font-extrabold" aria-hidden="true" />
                                                </div>
                                                </button>
                                            </div>
                                        <div className="relative h-32 w-32 ">
                                            <button onClick={() => {
                                                setEditClicked(true)
                                                setEditShop(shop)
                                                setShowModal(true)
                                                }} 
                                                className="absolute -right-4 -top-4 rounded-xl bg-gray-900 bg-opacity-50 pl-2 pb-2 text-white hover:bg-gray-500 hover:bg-opacity-50 hover:text-blue-500"
                                            >
                                                <div className="relative -left-1 -bottom-1">

                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M18.2929 3.70711C18.6834 3.31658 19.3166 3.31658 19.7071 3.70711L20.4142 4.41421C20.8047 4.80474 20.8047 5.4379 20.4142 5.82843L12.2628 13.9799C12.0432 14.1994 11.7756 14.3648 11.481 14.463L8.93669 15.3111C8.85851 15.3372 8.78414 15.2628 8.8102 15.1846L9.65831 12.6403C9.7565 12.3457 9.92191 12.0781 10.1415 11.8585L18.2929 3.70711Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>

                                    </div>
                                    
                                    <div className="relative -left-4 -bottom-4 w-full h-18 rounded-xl pl-2 bg-slate-800 bg-opacity-90">
                                        <p className="text-xl">{shop.shopName}</p>
                                    <div className="relative flex space-x-40 -left-2  w-full h-10 rounded-xl pl-2 bg-slate-800 bg-opacity-90">
                                        <p className="text-2xl"> Open </p>

                                        {/*  Enable flag if open */}
                                        {shop.open && !enabled && (setEnabled(true), console.log(enabled))}
                                        
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
                            </div>
                            )}
                        <div className="text-black">
                            {showModal &&  <ManageShopsForm getShops={setGetShops} shop={editShop} userID={userID} setSubmissionType={setSubmissionType} showModal={showModal} setShowModal={setShowModal} editFlag={editClicked} formProps={editShop} />}
                        </div>
                        <ToastContainer/>
                        </>

                        

                    </div>


                    <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpen}>
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button
                                    type="button"
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Deactivate account
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to deactivate your account? All of your data will be permanently removed
                                        from our servers forever. This action cannot be undone.
                                    </p>
                                    </div>
                                </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={() => (deleteShop(removeShop.shopID), console.log(removeShop), setOpen(false))}
                                >
                                    Deactivate
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                        </div>
                    </Dialog>
                    </Transition.Root>
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