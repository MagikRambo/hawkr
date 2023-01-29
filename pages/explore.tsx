import React, { Fragment, useState } from 'react'
import Map from './Map';
import { Transition } from '@headlessui/react'

type ExploreProps = {
};

type ExploreState = {
  showOpen: boolean;
};

type ExploreMenuProps = {
}

type ExploreMenuState = {
}

class ExploreMenu extends React.Component<ExploreMenuProps, ExploreMenuState>{
  constructor(props: ExploreMenuProps){
    super(props);
  };

  render(){
    return (<></>)
  };
}

class Explore extends React.Component<ExploreProps, ExploreState>{
  constructor(props: ExploreProps){
    super(props);
    this.state = {showOpen: true}
  };

  render(){
    return (
      <>
        <div className="flex justify-between">
          <Transition className="w-2/5" show={this.state.showOpen} 
          enter='transition-all' enterFrom='opacity-0 w-0' enterTo='opacity-100 w-2/5'
          leave='transition-all' leaveFrom='opacity-100 w-2/5' leaveTo='opacity-0 w-0'>
          <div className='py-6 px-6'>
            {/* This is the place to put code*/}
            <p>Some good juice right here  d </p>
            {/* This is the place to put code*/}
          </div>
          </Transition>
          <div className='relative grow'>
            <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
              onClick={()=>this.setState({showOpen: ! this.state.showOpen})}>
              {this.state.showOpen ? "Hide Menu" : "Show Menu"}
            </button>
            <Map shops={[]}/>
          </div>
        </div>
      </>
    )
  };
}

export default Explore;