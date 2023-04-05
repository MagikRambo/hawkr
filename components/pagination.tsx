
import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

// Props of Pgination:
type PaginationProps = {
  // 1  current page index
  curr_page_idx: number,
  // 2  total items of the list 
  total_items: number,
  // 3  how many items on each page 
  //    it's going to be {items_on_each_page * (page_idx - 1)} of {total_items} showing on the pagination
  items_on_each_page: number,
  // 4  callback function for swithc page, passing in when init, 
  //    it's going to be called every time hite the page
  on_page_swith_to: (page_idx: number) => void,
}

export default function Pagination(props: PaginationProps) {
  const [curr_page, setCurrPage] = useState(1);

  const getItemStyle = (active_page_idx: number) => {
    return active_page_idx == curr_page? "relative z-10 inline-flex items-center border border-cyan-500 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600 focus:z-20" :
    "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  }

  const getNavPages = (curr_page: number) => {
    const from_idx = curr_page < 4? 1: curr_page - 3;
    const to_idx = curr_page > Math.ceil(props.total_items/props.items_on_each_page) - 3?
                    Math.ceil(props.total_items/props.items_on_each_page) : curr_page + 3;
    const arr = new Array();
    for(let i = from_idx; i <= to_idx; ++i) {
      arr.push(i)
    }
    return arr
  }

  const pages = getNavPages(props.curr_page_idx);
  
  return (
    <div className="flex items-center justify-between border-t px-4 pt-1 pb-5 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {/** The text of showing how many result in current page */}
        <div>
          <p className="text-sm text-gray-700">
            Showing 
            <span className="font-medium">
              {(props.curr_page_idx-1)*props.items_on_each_page+1}</span> to {' '}
            <span className="font-medium">
              {props.curr_page_idx*props.items_on_each_page > props.total_items 
              ? props.total_items: props.curr_page_idx*props.items_on_each_page}
            </span> of{' '}
            <span className="font-medium">{props.total_items}</span> results
          </p>
        </div>

        {/** Pagination nav */}
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            onClick={()=>props.on_page_swith_to(props.curr_page_idx==1?1:(props.curr_page_idx-1))}>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/** Buttons in pagination */}
            {pages?.map((item: number)=>(
              <button key={item} className={getItemStyle(item)} onClick={() => props.on_page_swith_to(item)}>
                {item}
              </button>
            ))}

            <button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            onClick={()=>props.on_page_swith_to(props.curr_page_idx>=Math.ceil(props.total_items/props.items_on_each_page)?
            Math.ceil(props.total_items/props.items_on_each_page):props.curr_page_idx+1)}>
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}