import React, { Fragment, useState } from 'react'
import Map from './Map';

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
          <div className='relative ease-in-out w-100 transition duration-500 hover:w-100'>
            <p>Some good juice right here</p>
          </div>
          <div className='relative grow'>
            <button className='absolute z-10 rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm
             hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 m-8'
              onClick={()=>this.setState({showOpen: !this.state.showOpen})}>
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