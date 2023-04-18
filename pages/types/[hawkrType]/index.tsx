import React, { useEffect, useState } from 'react'
import Map from '../../../components/Map';
import { Transition } from '@headlessui/react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import get_shops_with_location from "../../api/getShopsWithLocation";
import get_shops_by_id from "../../api/getShopById";
import InfoCard from '../../../components/InfoCard'
import Pagination from '../../../components/pagination';
import { useRouter } from 'next/router';

//Image imports
import hawkr_icon from '../../../public/img/hawkr_icon.png';
import LeftArrow from '../../../public/img/Left_Arrow.svg'
import RightArrow from '../../../public/img/Right_Arrow.svg'
import Image from 'next/image'
import Link from 'next/link';
import get_hawkr_types from '../../api/getHawkrTypes';
import get_shops_by_type from '../../api/getShopsByType';
import { useQuery, useQueryClient } from 'react-query';
import { supabase } from '../../../utils/supabaseClient';

type SidePanelMenuProps = {
  data:any
}
const getShopsByType = async ({hawkrType}:any) => {
    const { data } = await supabase.rpc('get_shop_by_type', {shop_type: hawkrType})
    return data
  }

function SidePanelMenu(props: SidePanelMenuProps) {
  const [curr_page, setCurrPage] = useState(1)
  const router = useRouter()
  const routerType = router.query.type
  //Hawkr-blue is #1498
  return (
      <main className="flex">
        <section className="flex-grow h-screen pt-6 px-6 bg-slate-200 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <h1 className=' pb-2 pl-2 font-bold text-gray-600 text-2xl'> {routerType} Hawkrs near me</h1>

            <div className="flex flex-col">
              {props.data?.map((item: any) => (
                <Link key={item.shopID} href={`/shops/${item.shopID}`}>
                <InfoCard
                  img={item.shop_image_url ? item.shop_image_url : hawkr_icon}
                  description={item.shopDescription}
                  title={item.shopName}
                  open={item.open}
                  />
                  </Link>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center">
              <Link href='/hawkrVendorInfo' className="text-xl font-medium text-black">Want to run your business?</Link>
              <Link href='/hawkrVendorInfo'className="text-2xl font-bold text-sky-500">Setup a Hawkr</Link>
            </div>
          <Pagination curr_page_idx={curr_page} total_items={props.data ? props.data["length"]: 0} 
            items_on_each_page={10} on_page_swith_to={(num)=>setCurrPage(num)}/>
        </section>
      </main>
  )
}

function Types_Dyn() {

  let [showOpen, setShowOpen] = useState(true)

  let router = useRouter()
  let hawkrType = router.query
  const queryClient = useQueryClient()

  const {isLoading, data:shops, isError, error} = useQuery(['shops-by-type', hawkrType.hawkrType], () => getShopsByType(hawkrType), 
  {
    initialData: () => {
      const shop:any = (queryClient.getQueryData('shops-by-type') as {data: any})?.data?.find( (s:any) => s.hawkrType === hawkrType.hawkrType)
      // console.log(shop)
      return shop
    },
    enabled: !!hawkrType,
  })

  let openShops = shops?.filter( (shop:any) => shop.open )

  return (
    <>
      <div className="flex justify-between bg-slate-200">
        <Transition className="w-full sm:w-2/5" show={showOpen}
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-full sm:w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-full sm:w-2/5 ' leaveTo='opacity-0 w-0'>
          <button className='p-2 border-gray-300 bg-white text-gray-700 m-5 sm:hidden'
            onClick={() => setShowOpen(!showOpen)}>
            {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src} /> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src} />Show List</div>}
          </button>
          <SidePanelMenu data={openShops} />
        </Transition>
        <div className='relative grow'>
          <button className={'absolute z-10 sm:rounded sm:border border-gray-300 bg-white sm:px-2.5 sm:py-1.5 sm:text-xs font-medium text-gray-700 sm:shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:m-8' + (showOpen ? "" : "absolute m-5")}
            onClick={() => setShowOpen(!showOpen)}>
            {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src} /> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src} />Show List</div>}
          </button>
          <Map data={openShops} />
        </div>
      </div>
    </>
  )
}

export default Types_Dyn;
