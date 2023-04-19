import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { useUser } from '@supabase/auth-helpers-react';
// import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

import Image from 'next/image';
import reverseGeocode from '../pages/api/reverseGeocode';
type ShopCardProps = {
    hawkrType: string,
    location: {lat: number, lng: number},
    shopDescription: string,
    shopID: string,
    shopName: string,
    open?: boolean,
    shop_image_url: string
  }

  // <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
export default function ShopCard(props: ShopCardProps){

  const [HeartStatus, setHeartStatus] = useState<boolean>(false)
  const [locationName, setLocationName] = useState<string|undefined>('')
  const [favoritesList, setFavoritesList] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const user = useUser();
  const userID = user?.id
  const base_hawkr_img = 'https://mlijczvqqsvotbjytzjm.supabase.co/storage/v1/object/public/base-hawkr/hawkr_icon.png'
  const shopImage = props.shop_image_url ? props.shop_image_url : base_hawkr_img

  useEffect(() => {
    setLoading(true)
    retrieveFavoritesList().catch(console.error)
    retrieveLocationName(props.location.lat, props.location.lng).catch(console.error)
    setLoading(false)
    
    }, [userID])


  async function toggleHeart(shopID:string){
    if (HeartStatus){
      setHeartStatus(false)
      removeFromFavorites(shopID)
    }else{
      setHeartStatus(true)
      insertFavorites(shopID)
    }
  }

const insertFavorites = async (shopID:string) => {
  const { data, error } = await supabase
  .from('favoritesList')
  .insert([
    { clientID: userID, shopID: shopID },
])
}

const removeFromFavorites  = async(shopID:string) => {
  const { data, error } = await supabase
  .from('favoritesList')
  .delete()
  .match({clientID: userID, shopID: shopID})
}

const retrieveFavoritesList = async () => {

  if(userID)
  {
    const {data, error} = await supabase
    .from('favoritesList')
    .select('*')
    .eq('clientID', userID)
    setFavoritesList(data)

    if(data){
      for (let i = 0; i < data["length"]; i++){
        if(data[i].shopID === props.shopID){
          setHeartStatus(true)
        }
      }
    }
  }
}
const retrieveLocationName  = async (lat:number, lng:number) => {
  let resLocationName:string|undefined = await reverseGeocode(lat, lng)

  setLocationName(resLocationName)
  
}

  return (
    <main className="flex text-slate-950 text-black">
      <section className='flex-grow w-screen h-screen px-2 sm:px-16 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
      {/* ~~~~~~~ EDITS NEED TO BE MADE HERE FOR IMAGE ~~~~~~~ */}
      <div className='will-change-auto relative'>
        <img className="rounded-md object-cover border-cyan-500/100 border-2" src={shopImage} alt={`picture of the link ${shopImage}`}/>
      </div>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl sm:text-6xl font-bold pt-8'>{props.shopName}</h1>
            <p className='text-xl pb-4'>{props.hawkrType}</p>
          </div>
          { user && (
          HeartStatus ? 
          <button onClick={() => toggleHeart(props.shopID)}><svg className="h-14 cursor-pointer mr-2 " width="96" height="96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#ef4444"><path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"></path></svg></button> 
          : 
          <button onClick={() => toggleHeart(props.shopID)}><HeartIcon className='h-14 cursor-pointer mr-7 '/></button>
          )}
        </div>
        <p className='font-bold text-xl py-2'>Current Location:</p>
        <p className='font-bold text-xl py-2 '>{locationName}</p>
        <button
        className='inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        onClick={() => router.push(`https://maps.google.com?q=${locationName}`)
      }>
          Take me there
        </button>
        <p className='font-bold text-2xl sm:text-4xl py-4'>Vendor Detail</p>
        <p className='py-2 text-2xl'>{props.shopDescription}</p>

        {/** The text Review Part*/}
        {user && 
        <>
        <p className='font-bold text-2xl sm:text-4xl py-4'>Leave a Review</p>
        <div className='flex justify-start'>
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
        </div>
        <div className='py-2 mt-1 h-52 text-black'>
          <textarea className='block h-full w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'/>
        </div>
        <div className="mt-2 flex justify-end">
        <button type="submit"
          className="inline-flex mb-10 items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Post
        </button>
      </div>
      </>
      }
      </section>
    </main>
  )
}
