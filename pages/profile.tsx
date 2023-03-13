

type ProfileProps = {
  userType:boolean
  }

export default function profile(props: ProfileProps){
  if(props.userType)
    return (
      <main className="bg-slate-200 justify-center">
          <div className="py-36 px-44">
            <img className="my-12 w-36 h-36 mx-auto rounded-full ring-4 ring-gray-300 hover:ring-5 hover:ring-slate-500"
                src="/img/hawkr_icon.png"
                alt="Hawkr"/>
            <div className="flex justify-center">
              <button className="py-2 px-2 text-2xl font-bold text-cyan-500">
                Vendor Page
              </button>
              <button className="py-2 px-2 text-2xl font-bold text-cyan-500">
                History
              </button>
            </div>
            <div className="py-1 px-80 content-center">
              <h1 className="py-10 font-bold text-3xl text-center">Desprition</h1>
              <textarea className='block px-12 py-10 rounded-lg ring-gray-300 ring-4 h-full w-full'>
              </textarea>
              <h1 className="py-10 font-bold text-3xl text-center">Vendor Page</h1>
              <div className='block bg-white px-12 py-10 rounded-lg ring-gray-300 ring-4 h-full w-full'>
                {/**Content of Vendor Page */}
              </div>
            </div>
            <div className="py-12 flex flex-col items-center">
              <button className="py-2 text-2xl font-bold text-cyan-500">
                Edit Vendor Page
              </button>
              <button className="py-2 text-2xl font-bold text-cyan-500">
                Popup
              </button>
              <button className="py-2 text-2xl font-bold text-cyan-500">
                Log Out
              </button>
            </div>
          </div>
      </main>
    )
  else
    return (
      <main className="bg-slate-200 justify-center">
          <div className="py-36 px-44">
            <img className="my-10 w-36 h-36 mx-auto rounded-full ring-4 ring-gray-300 hover:ring-5 hover:ring-slate-500"
                src="/img/hawkr_icon.png"
                alt="Hawkr"/>
            <div className="py-5 px-80 content-center">
              <h1 className="py-12 font-bold text-3xl text-center">Desprition</h1>
              <textarea className='block px-12 py-10 rounded-lg ring-gray-300 ring-4 h-full w-full'>
              </textarea>
            </div>
            <div className="py-12 flex flex-col items-center">
              <button className="py-2 text-2xl font-bold text-cyan-500">
                Setup as Hawkr
              </button>
              <button className="py-2 text-2xl font-bold text-cyan-500">
                Log Out
              </button>
            </div>
          </div>
      </main>
    )
}
