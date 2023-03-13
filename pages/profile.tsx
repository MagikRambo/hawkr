import type { NextPage } from 'next'
import { Session, useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { stat } from "fs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Database } from '../utils/database.types'

type Profiles = Database['public']['Tables']['profiles']['Row']

function Profile(props:any){
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [UUID, setUUID] = useState<Profiles['UUID']>()
  const [state, setState] = useState<Profiles['state']>(null)
  const [name, setName] = useState<Profiles['name']>(null)
  const [description, setDescription] = useState<Profiles['description']>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const session = useSession()
  let redirect = 0

  async function signOut(){
    try{
        if(!user){
            throw Error('No user')
        } 
        await supabase.auth.signOut()
        router.push('/explore')
    }
    catch(error){
        alert(error)
        console.log("Catch: ", error)
    }
  }
  function setRedirect(){
    redirect = 1
    return (<></>)
  }
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        if (!user) throw new Error('No user')
  
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('UUID', user.id)
          .single()
        
        if (status == 406){
          throw new Error('No user')
        }
        if (error && status !== 406) {
          console.log("error: ", error.message)
          if(error.message.includes(""))
          throw error
        }

        if (data) {
          setUUID(data.UUID)
          setState(data.state)
          setName(data.name)
          setDescription(data.description)
        }
      } catch (error) {
        console.log("error: ", error)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    // Only run query once user is logged in.
    if (user) loadData()
    if(redirect == 1) {redirect = 0; router.push('/login')}
  }, [user, redirect])

  async function updateProfile({
    name,
    description
    // avatar_url,
  }: {
    name: Profiles['name']
    description: Profiles['description']
    // avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        UUID: user.id,
        name: user.email,
        description: description
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      else router.push('/profile')
      //alert('Profile updated!')
    } catch (error) {
      //alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if(user)
    // if(state == 2)
    return (
      <main className="bg-slate-200 justify-center">
          <div className="py-36 px-44">
            <img className="my-12 w-36 h-36 mx-auto rounded-full ring-4 ring-gray-300 hover:ring-5 hover:ring-slate-500"
                src="/img/hawkr_icon.png"
                alt="Hawkr"/>
            <h1 className="text-black font-bold text-3xl text-center">{name}</h1>
            {state == 2 ? (
            <>
            <div className="flex justify-center">
              <button className="py-2 px-2 text-2xl font-bold text-cyan-500">
                Vendor Page
              </button>
              <button className="py-2 px-2 text-2xl font-bold text-cyan-500">
                History
              </button>
            </div>
            </>) : (<></>)}
            <div className="py-1 px-80 content-center">
              <h1 className="text-black py-10 font-bold text-3xl text-center">Description</h1>
              <textarea className='text-black block px-12 py-10 rounded-lg  ring-4 h-full w-full' value={description? description : ""} readOnly>
              </textarea>
              <button className="py-2 text-2xl font-bold text-cyan-500">
                  Edit Client Page
              </button>
            {state == 2 ? (
            <>
              <h1 className="py-10 font-bold text-3xl text-center">Vendor Page</h1>
              <div className='block bg-white px-12 py-10 rounded-lg ring-gray-300 ring-4 h-full w-full'>
                {/**Content of Vendor Page */}
              </div>
              </>) : (<></>)
            }

            </div>

            <div className="py-12 flex flex-col items-center">
              {state == 2 ? (
              <> 
                <button className="py-2 text-2xl font-bold text-cyan-500">
                  Edit Vendor Page
                </button>
                <button className="py-2 text-2xl font-bold text-cyan-500">
                  Popup
                </button>
              </>) : (<>
                <button className="py-2 text-2xl font-bold text-cyan-500">
                  Setup as Hawkr
                </button>
              </>)}
              <button className="py-2 text-2xl font-bold text-cyan-500" onClick={() => {signOut()}}>
                Log Out
              </button>
            </div>
          </div>
      </main>
    )
  else return (<>{setRedirect()}</>)
  
}

export default Profile
