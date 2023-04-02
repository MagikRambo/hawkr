import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';

type ShopCardProps = {
    hawkrType: string,
    location: {lat: number, lng: number},
    shopDescription: string,
    shopID: string,
    shopName: string,
  }

export default function ShopCard(props: ShopCardProps){

  return (
    <main className="flex text-slate-950">
      <section className='flex-grow h-screen px-16 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden'>
        <img className='m-0 object-fill' src='\img\hawkr_icon.png' />
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-6xl font-bold pt-8'>{props.shopName}</h1>
            <p className='text-xl pb-4'>{props.hawkrType}</p>
          </div>
          <HeartIcon className='h-14 cursor-pointer mr-7 '/>
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
          className="inline-flex mb-10 items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Post
        </button>
      </div>
      </section>
    </main>
  )
}