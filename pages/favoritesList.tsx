import React, { useEffect, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import InfoCard from '../components/favoritesList/InfoCard'
import Pagination from '../components/pagination';

//Image imports
import hawkr_icon from '../public/img/hawkr_icon.png';
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'
import Link from 'next/link';
import {supabase} from '../utils/supabaseClient';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import get_shops_by_id from './api/getShopById';

type ExploreMenuProps = {
  shops:any
}

export const getStaticProps: GetStaticProps = async () => {


  const { data } = await getShopsWithLocations();
  return { props: { shops: data } };
};


function FavoritesMenu(props: ExploreMenuProps) {

  const [curr_page, setCurrPage] = useState(1)

  //Hawkr-blue is #1498
  return (
      <main className="flex">
        <section className="flex-grow h-screen pt-6 px-6 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <h1 className=' pb-2 pl-2 font-bold text-gray-600 text-2xl'> Favorites List</h1>

            <div className="flex flex-col">
              {props.shops?.map((item: any) => (
                <>
                {item.open && (
                <Link href={`shops/${item.shopID}`}>
                <InfoCard
                  key={item.shopID}
                  img={hawkr_icon}
                  description={item.shopDescription}
                  title={item.shopName}
                  open={item.open}
                  />
                  </Link>
                )}
                  </>
                ))}
            </div>

            <h1 className=' pb-2 pl-2 font-bold text-gray-600 text-2xl'> Closed Shops</h1>
            <div className="flex flex-col">
              {props.shops?.map((item: any) => (
                <>
                {!item.open && (
                <Link href={`shops/${item.shopID}`}>
                <InfoCard
                  key={item.shopID}
                  img={hawkr_icon}
                  description={item.shopDescription}
                  title={item.shopName}
                  open={item.open}
                  />
                  </Link>
                )}
                  </>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center">
              {/* TODO: Set up the links to the set-up hawkr page*/}
              <Link href='#' className="text-xl font-medium text-black">Want to run your business?</Link>
              <Link href='#'className="text-2xl font-bold text-sky-500">Setup a Hawkr</Link>
            </div>
          <Pagination curr_page_idx={curr_page} total_items={props.shops["length"]} 
          items_on_each_page={10} on_page_swith_to={(num)=>setCurrPage(num)}/>
        </section>
      </main>
  )
}


export default function FavoritesList({ shops }: InferGetStaticPropsType<typeof getStaticProps>) {

  let [showOpen, setShowOpen] = useState(true)

  //filter to only get open shops to pass to Map
  let openShops = shops.filter((shop:any) => shop.open === true)

  const [favoriteShops, setFavoriteShops] = useState<any>([])
  const [shopIDs, setShopIDs] = useState<any>('')

  let user = useUser()
  const userID = user?.id

  const [loading, setLoading] = useState<boolean>(false)


//   const { data:list, error:listError } = await supabase.storage.from(bucket).list(`${userID}/${shopID}`);
//   const filesToRemove = list?.map((x) => `${userID}/${shopID}/${x.name}`) as NonNullable<Array<string>>;
//   const { data:resRemove, error:resRemoveError } = await supabase.storage.from(bucket).remove(filesToRemove);

  useEffect(() => {

    setLoading(true)
    const getFavoriteShopsId = async () => {
        if(userID){
            const {data:shop_ids, error} = await supabase
            .from('favoritesList')
            .select('shopID')
            .eq('clientID', userID)
            
            if(shop_ids){
                setShopIDs(shop_ids)

                console.log(shop_ids)
                let openArr:any[] = []

                for(let i = 0; i < shop_ids["length"]; i++)
                {
                 const {data:shop} =  await get_shops_by_id(String(shop_ids[i].shopID))
                 openArr.push(shop[0])
                 console.log(shop[0])
                }

                console.log(openArr)
                setFavoriteShops(openArr)
                console.log('favorites: ', favoriteShops)
                setLoading(false)

                
            }
        }
    }


   getFavoriteShopsId().catch(console.error)
//    getFavoriteShops().catch(console.error)

  }, [userID]);


  if (loading){
    return(
        <>
        <p>Loading ...</p>
        </>
    )
  }
  else if(favoriteShops["length"] === 0 || !favoriteShops){
    return(
        <>
        <p>No shops present</p>
        </>
    )
  }
  else{
    console.log(favoriteShops)

    return (
        <>
      <div className="flex justify-between bg-slate-200">
        <Transition className="w-2/5" show={showOpen}
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
          <FavoritesMenu shops={favoriteShops} />
        </Transition>
        <div className='relative grow'>
          <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
             onClick={() => setShowOpen(!showOpen)}>
            {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src} /> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src} />Show List</div>}
          </button>
          <Map shops={favoriteShops} />
        </div>
      </div>
    </>
  )
}
}

