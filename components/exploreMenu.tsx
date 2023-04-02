import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
//import info from '../utils/info'
import InfoCard from './InfoCard'
import {motion} from 'framer-motion'
import Map from './Map';

//const searchResults = info;

type ExploreProps = {
  handleOpen: (o: boolean, idx:number)=>void,
  open: boolean;
  shops: any;
};

type ExploreState = {
};

function ExploreMenu(ExploreProps : any){
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
    >
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          
          {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexible</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div> */}
          <div className="flex flex-col">
            {/* {searchResults?.map((item: any) => (
              <InfoCard
                key={item.img}
                img={item.img}
                location={item.location}
                description={item.description}
                title={item.title}
                star={item.star}
                price={item.price}
                total={item.total}
              />
              ))} */}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="box hidden xl:inline-flex xl:min-w-[600px]"
        >
          <Map shops={ExploreProps.shops}/>
        </motion.div>
      </main>
      </motion.div>
      );

};

export default ExploreMenu;

// import React, { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import info from '../utils/info'
// import InfoCard from './InfoCard'

// const infoP = info;

// type ExploreProps = {
//   handleOpen: (o: boolean, idx:number)=>void,
//   open: boolean;
//   shops: any;
// };

// function ExploreMenu(ExploreProps : any){



//     return (
//       <>
//     <Transition.Root show={ExploreProps.open} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={()=>ExploreProps.handleOpen(false, 0)}>
//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
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
//                   <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                     <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
//                       <div className="flex items-start justify-between">
//                         <Dialog.Title className="text-lg font-medium text-gray-900">Explore</Dialog.Title>
//                         <div className="ml-3 flex h-7 items-center">
//                           <button
//                             type="button"
//                             className="-m-2 p-2 text-gray-400 hover:text-gray-500"
//                             onClick={() => ExploreProps.handleOpen(false, 0)}>
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
//                           {/* Add in fetch more content here  <- 1 or more ->*/}
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div >
//       </Dialog >
//     </Transition.Root >
//     </>

//     )
// }

// export default ExploreMenu;