import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { SupabaseClient, useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import TypesMenu from './typesMenu'
import { Router, useRouter } from 'next/router'
import getVendorById from '../pages/api/getVendorById'
import { Database } from '../utils/database.types'

import Image from 'next/image'
import FavoritesList from '../pages/favoritesList';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useQuery } from 'react-query'
type Profiles = Database['public']['Tables']['profiles']['Row']


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
interface Position {
    readonly coords: Coordinates;
    readonly timestamp: number;
  }
  interface Coordinates {
    readonly latitude: number;
    readonly longitude: number;
    readonly altitude: number | null;
    readonly accuracy: number;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly speed: number | null;
  }



async function fetchUserLocation() {
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  
  async function updateUserLocation(supabase: SupabaseClient<any, "public", any>, userID:string, userPosition: { lat: number; lng: number }) {

  
    const { data: openTrackedShops, error: openShopsError } = await supabase
      .from("shops")
      .select("*")
      .match({
        vendorID: userID,
        open: true,
        liveTracking: true,
      });
  
    if (openTrackedShops && openTrackedShops["length"] > 0) {
      const { data, error } = await supabase
        .from("locations")
        .update({ UUID: userID, location: userPosition })
        .match({ UUID: userID });
    }
  }


function Navbar() {
    const [exploreOpen, setExploreOpen] = useState(false)
    const [typesOpen, setTypesOpen] = useState(false)
    const [currIdx, setCurIdx] = useState(0)
    const [vendor, setVendor] = useState<VendorContent>()
    const router = useRouter()
    const session = useSession()
    const supabase = useSupabaseClient()

    type VendorContent = Awaited<ReturnType<typeof getVendorById>>

    // Start Supabase user code
    const user = useUser()
    const userID:NonNullable<any> = user?.id
    const [UUID, setUUID] = useState<Profiles['UUID']>()
    const [state, setState] = useState<Profiles['state']>(null)
    const [name, setName] = useState<Profiles['name']>(null)
    const [loading, setLoading] = useState(true)

    useQuery("userLocation", fetchUserLocation, {
        refetchInterval:  15 * 60 * 1000, //15 minutes refetch location
        refetchIntervalInBackground: true,
        enabled: !!userID,
        onSuccess: async (position: Position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          await updateUserLocation(supabase, userID, userPosition);
        },
      });
    

    // FETCH THE VENDOR DATA
    useEffect(() => {
        const getVendor = async () => {
            if (userID) {
                const v = await getVendorById(userID.toString())
                setVendor(v)
                loadData()
            }
        }
        getVendor().catch(console.error)
    }, [user])
    // console.log('vendor nav: ', vendor)
    // End Supabase user code


    async function signOut() {
        try {
            if (!user) {

                throw Error('No user')
            }

            await supabase.auth.signOut()

            // window.location.href = "/login"
            router.push('/login')
        }
        catch (error) {
            alert(error)
            console.log("Catch: ", error)
        }
    }

    async function loadData() {
        try {
            setLoading(true)
            if (!user) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('UUID', user.id)
                .single()

            if (status == 406) {
                console.log("error: no user found")
            }
            if (error && status !== 406) {
                console.log("error: ", error.message)
            }

            // setData(data)
            if (data) {
                setUUID(data.UUID)
                setState(data.state)
                setName(data.name)
            }
        } catch (error) {
            console.log("error: ", error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Disclosure as="nav" className="bg-white shadow w-screen">
            {({ open }) => (
                <>
                    {/* For Webpage */}
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/#">
                                        {/* <div className='h-8 w-8'> */}

                                            <Image
                                                height={100}
                                                width={100}
                                                className="block h-8 w-auto lg:hidden"
                                                src="/img/hawkr_icon.png"
                                                alt="Hawkr"
                                                />
                                            <Image
                                                // fill={true}
                                                height={100}
                                                width={100}
                                                className="hidden h-8 w-auto lg:block"
                                                src="/img/hawkr_icon.png"
                                                alt="Hawkr"
                                                />
                                        {/* </div> */}
                                    </Link>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    {/* Current: "border-cyan-400 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <Link href="/explore"
                                        className={classNames(currIdx == 1 ? "border-cyan-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                            "inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium")}
                                    >
                                        Explore Nearby
                                    </Link>
                                    <Link
                                        href="/types"
                                        className={classNames(currIdx == 2 ? "border-cyan-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                            "inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium")}
                                    >
                                        Hawkr Type
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-1 items-center px-2 lg:ml-6 lg:justify-center">
                                <div className="w-full max-w-lg content-center lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-cyan-400 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                {!session ? (
                                    <Link
                                        href="/login"
                                        className={classNames(currIdx == 3 ? "border-cyan-400 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                            "inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium")}
                                    >
                                        Sign In
                                    </Link>) : (
                                    <>
                                        <button
                                            type="button"
                                            className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                                            <div>
                                                <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2">
                                                    <span className="sr-only">Open user menu</span>
                                                    <div className='h-8 w-8'>

                                                    <Image
                                                        fill={true}
                                                        className="rounded-full"
                                                        src="/img/hawkr_icon.png"
                                                        alt=""
                                                        />
                                                    </div>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/profile"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>

                                                    {vendor && vendor.data && vendor.data['length'] > 0 && vendor.data[0]["state"] == 1 && (
                                                        <Menu.Item>
                                                            {({ active }) => (<Link href="/favoritesList" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                                Favorites List
                                                            </Link>)}
                                                        </Menu.Item>)}

                                                    {vendor && vendor.data && vendor.data['length'] > 0 && vendor.data[0]["state"] == 2 && (
                                                        <Menu.Item>
                                                            {({ active }) => (<Link href="/manageShops" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                                Manage Shops
                                                            </Link>)}
                                                        </Menu.Item>)}

                                                    {vendor && vendor.data && vendor.data['length'] > 0 && vendor.data[0]["state"] == 1 && (
                                                        <Menu.Item>
                                                            {({ active }) => (<Link href="/becomeVendor" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                                Become Vendor
                                                            </Link>)}
                                                        </Menu.Item>)}

                                                    {/* <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                                    Messages</Link>)}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => ( <Link href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                                    History</Link>)}
                                                        </Menu.Item> */}

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="#"
                                                                onClick={() => { signOut() }}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign out
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* For smaller screens */}
                    {!session ?
                        (
                            <Disclosure.Panel className="lg:hidden">
                                {/** not Signed in*/}
                                <div className="border-t border-gray-200 pt-4 pb-3">
                                    <Disclosure.Button as='a'
                                        href="/explore" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Explore Nearby
                                    </Disclosure.Button>
                                    <Disclosure.Button as='a'
                                        href="/types" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Hawkr Types
                                    </Disclosure.Button>
                                    <Disclosure.Button as='a'
                                        href="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                        Sign In
                                    </Disclosure.Button>
                                </div>
                            </Disclosure.Panel>
                        ) : (
                            <Disclosure.Panel className="lg:hidden">
                                {/** Signed in*/}
                                <div className="border-t border-gray-200 pt-4 pb-3">
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <Image
                                                fill={true}
                                                className="h-10 w-10 rounded-full"
                                                src="/img/hawkr_icon.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{name}</div>
                                            {/* <div className="text-sm font-medium text-gray-500">tom@example.com</div> */}
                                        </div>
                                        <button
                                            type="button"
                                            className="mr-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        <Disclosure.Button
                                            as="a"
                                            href="./profile"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Profile
                                        </Disclosure.Button>
                                        <Disclosure.Button as='a'
                                            href="/explore" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Explore Nearby
                                        </Disclosure.Button>
                                        <Disclosure.Button as='a'
                                            href="/types" className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Hawkr Types
                                        </Disclosure.Button>
                                        {vendor && vendor.data && vendor.data['length'] > 0 && vendor.data[0]["state"] >= 1 && (<Link
                                            href="/favoritesList"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Favorites List
                                        </Link>)}
                                        {vendor && vendor.data && vendor.data['length'] > 0 && vendor.data[0]["state"] === 2 && (<Link
                                            href="/manageShops"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Manage Shops
                                        </Link>)}
                                        {vendor && vendor.data && vendor.data['length'] > 0 && vendor.data[0]["state"] == 1 && (<Link
                                            href="/becomeVendor"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Become Vendor
                                        </Link>)}
                                        <Disclosure.Button

                                            onClick={() => { signOut() }}
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Sign out
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>)}
                </>
            )}
        </Disclosure>
    )

}

export default Navbar;