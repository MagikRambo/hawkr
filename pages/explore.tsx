// import Map from "./Map";


// import React, { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import info from '../utils/info'
// import InfoCard from '../components/InfoCard'
// import { GetStaticProps, InferGetStaticPropsType } from 'next';
// import getShopsWithLocations from './api/getVendors';

// const infoP = info;

// type ExploreProps = {
//   handleOpen: (o: boolean, idx:number)=>void,
//   open: boolean;
//   shops: any;
// };

// type ExploreState = {
// };

// export const getStaticProps: GetStaticProps = async () => {

//     const { data } = await getShopsWithLocations();
//     return { props: { shops: data }};
//   };

// function Explore({shops}: InferGetStaticPropsType<typeof getStaticProps>){
//     var [isOpen, setIsOpen] = useState(true)
//     function closeModal() {
//         setIsOpen(false)
//       }
    
//       function openModal() {
//         setIsOpen(true)
//       }
//     return (
//     <Transition.Root show={isOpen} as={Fragment}>
//        <Dialog as="div" className="relative z-10" onClose={closeModal}>
//         {/* <div className="fixed inset-0 overflow-hidden"> */}
//           {/* <div className="absolute inset-0 overflow-hidden"> */}
//             <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-500 sm:duration-700"
//                 enterFrom="-translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-500 sm:duration-700"
//                 leaveFrom="translate-x-0"
//                 leaveTo="-translate-x-full"
//               >
//                 <Dialog.Panel className="pointer-events-auto w-[700px] max-w-screen">
//                   <div className="flex  flex-col overflow-y-scroll bg-white shadow-xl">
//                     <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
//                       <div className="flex items-start justify-between">
//                         <Dialog.Title className="text-lg font-medium text-gray-900">Explore</Dialog.Title>
//                         <div className="ml-3 flex h-7 items-center">
//                           <button
//                             type="button"
//                             className="-m-2 p-2 text-gray-400 hover:text-gray-500"
//                             onClick={closeModal}>
//                             <span className="sr-only">Close panel</span>
//                             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="mt-8">
//                         {infoP.map((item) => (
                          
//                           <InfoCard
//                           key={item._id}
//                           img={item.img}
//                           location={item.location}
//                           description={item.description}
//                           title={item.title}
//                           star={item.star}
//                           price={item.price}
//                           total={item.total}
//                           />
                          
//                           ))}
//                         </div>
//                     </div>

//                     {/* <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <p>Subtotal</p>
//                         <p>$262.00</p>
//                       </div>
//                       <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//                       <div className="mt-6">
//                         <a
//                           href="#"
//                           className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//                         >
//                           Checkout
//                         </a>
//                       </div>
//                       <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                         <p>
//                           or
//                           <button
//                             type="button"
//                             className="font-medium text-indigo-600 hover:text-indigo-500"
//                             onClick={() => ExploreProps.handleOpen(false, 0)}
//                           >
//                             Continue Shopping
//                             <span aria-hidden="true"> &rarr;</span>
//                           </button>
//                         </p>
//                       </div>


//                     </div> */}
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           {/* </div> */}
//         {/* </div > */}
//        </Dialog >
//      </Transition.Root >

//     )
// }

// export default Explore;









// import React, { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import info from '../utils/info'
// import InfoCard from '../components/InfoCard'
// import {motion} from 'framer-motion'
// import Map from '../pages/Map';
// import { GetStaticProps, InferGetStaticPropsType } from 'next';
// import getShopsWithLocations from './api/getVendors';
// const searchResults = info;

// type ExploreProps = {
//   handleOpen: (o: boolean, idx:number)=>void,
//   open: boolean;
//   shops: any;
// };

// type ExploreState = {
// };

// export const getStaticProps: GetStaticProps = async () => {

//     const { data } = await getShopsWithLocations();
//     return { props: { shops: data }};
//   };
// function Explore({shops}:any){
//     var [isOpen, setIsOpen] = useState(true)
//     function closeModal() {
//         setIsOpen(false)
//       }
    
//       function openModal() {
//         setIsOpen(true)
//       }
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       viewport={{ once: true }}
//     >
//       <main className="flex">
//         <section className="flex-grow pt-14 px-6">
          
//           {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
//             <p className="button">Cancellation Flexible</p>
//             <p className="button">Type of Place</p>
//             <p className="button">Price</p>
//             <p className="button">Rooms and Beds</p>
//             <p className="button">More filters</p>
//           </div> */}
//           <div className="flex flex-col">
//             {searchResults?.map((item: any) => (
//               <InfoCard
//                 key={item.img}
//                 img={item.img}
//                 location={item.location}
//                 description={item.description}
//                 title={item.title}
//                 star={item.star}
//                 price={item.price}
//                 total={item.total}
//               />
//               ))}
//           </div>
//         </section>

//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="box hidden xl:inline-flex xl:min-w-[600px]"
//         >
//         <Map shops={shops}/>
//         </motion.div>
//       </main>
//       </motion.div>
//       );

// };

/* THIS IS THE SPOT OF DIFFERENCE */
import React, { Fragment, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import getShopsWithLocations from './api/getVendors';
import InfoCard from '../components/InfoCard'
import {motion} from 'framer-motion'
import { getHawkrTypeIcon } from '../utils/functions/getHawkrTypeIcon';

//Image imports
import hawkr_icon from '../public/img/hawkr_icon.png';
import info from '../utils/info'
import LeftArrow from '../public/img/Left_Arrow.svg'
import RightArrow from '../public/img/Right_Arrow.svg'
import Image from 'next/image'



type ExploreProps = {
};

type ExploreState = {
  showOpen: boolean;
};

type ExploreMenuProps = {
  shops:any

}

type ExploreMenuState = {
}
export const getStaticProps: GetStaticProps = async () => {

  const { data } = await getShopsWithLocations();
  return { props: { shops: data }};
};

function ExploreMenu (props: ExploreMenuProps){

    console.log(props.shops)
    return (
      <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
    >
      <main className="flex">
        <section className="flex-grow pt-14 px-6 bg-slate-200">
          
          {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexible</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div> */}
          <div className="flex flex-col">
            {props.shops?.map((item: any) => (
              <InfoCard
                key={item.shopID}
                img={hawkr_icon}
                location={"item.location"}
                description={item.shopDescription}
                title={item.shopName}
              />
              ))}
          </div>
        </section>
      </main>
      </motion.div>
    )
}

function Explore ({shops} : InferGetStaticPropsType<typeof getStaticProps>){

  let [showOpen, setShowOpen] = useState(true)

    // console.log(shops)
    return (
      <>
        <div className="flex justify-between bg-slate-200">
          <Transition className="w-2/5" show={showOpen} 
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
            <ExploreMenu shops={shops}/>
          </Transition>
          <div className='relative grow'>
            <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
              onClick={()=>setShowOpen(!showOpen)}>
              {showOpen ? <Image width={23} height={23} alt="LeftArrow" src={LeftArrow.src}/> : <div className="flex text-blue-500 text-base"><Image width={20} height={20} alt="RightArrow" src={RightArrow.src}/>Show List</div>}
            </button>
            <Map shops={shops}/>
          </div>
        </div>
      </>
    )
}

export default Explore;