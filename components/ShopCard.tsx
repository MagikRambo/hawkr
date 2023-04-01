import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
// import { HeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

type ShopCardProps = {
    hawkrType: string,
    location: {lat: number, lng: number},
    shopDescription: string,
    shopID: string,
    shopName: string,
    open: boolean,
  }

  // <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
export default function ShopCard(props: ShopCardProps){

  const [HeartStatus, setHeartStatus] = useState<boolean>(true)

  function toggleHeart(){
    if (HeartStatus){
      setHeartStatus(false)
    }else{
      setHeartStatus(true)
    }
  }

  return (
    <main className="flex">
      <section className='flex-grow h-screen pt-10 px-16 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
        <div className='h-60'/>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-6xl font-bold pt-8'>{props.shopName}</h1>
            <p className='text-xl pb-4'>{props.hawkrType}</p>
          </div>
          {HeartStatus ? <button onClick={toggleHeart}><HeartIcon className='h-14 cursor-pointer mr-7 '/></button> : <button onClick={toggleHeart}><svg className="h-14 cursor-pointer mr-2 " width="96" height="96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#ef4444"><path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"></path></svg></button>
          }
        </div>
        <p className='font-bold text-xl py-2'>Current Location: {props.location.lat} {props.location.lng}</p>
        <p className='font-bold text-4xl py-4'>Vender Detail</p>
        <p className='py-2 text-2xl'>{props.shopDescription}</p>

        {/** The text Review Part*/}
        <p className='font-bold text-4xl py-4'>Leave a Review</p>
        <div className='flex justify-start'>
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
          <StarIcon className="h-10 cursor-pointer" />
        </div>
        <div className='py-2 mt-1 h-52'>
          <textarea className='block h-full w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm'/>
        </div>
        <div className="mt-2 flex justify-end">
        <button type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Post
        </button>
      </div>
      </section>
    </main>
  )
}