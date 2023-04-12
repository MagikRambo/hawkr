import type { NextPage } from 'next'
import { Session, useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { stat } from "fs"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Database } from '../utils/database.types'
import Image from 'next/image'
import Link from 'next/dist/client/link'

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

  const setShowEditButtons = () => {
    const editbttn = document.getElementById("edit-button")
    const updatebttn = document.getElementById("update-button")
    const cancbttn = document.getElementById("cancel-button")
    const nametextbx = document.getElementById("username")
    const desctextbc = document.getElementById("description")

    const disp = 'none'
    if(editbttn != null && updatebttn != null && cancbttn != null && nametextbx != null && desctextbc != null){
      if (editbttn?.style.display == 'none'){
        editbttn.style.display = 'inherit'
        updatebttn.style.display = 'none'
        cancbttn.style.display = 'none'
        nametextbx.setAttribute("disabled", "true")
        desctextbc.setAttribute("disabled", "true")
      }
      else {
        editbttn.style.display = 'none'
        updatebttn.style.display = 'inherit'
        cancbttn.style.display = 'inherit'
        nametextbx.removeAttribute("disabled")
        desctextbc.removeAttribute("disabled")
      }
    }
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
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if(user)
    return (
      <main className="bg-slate-200">
          <div className="sm:py-36 sm:px-44">
            <div className='h-20 sm:hidden'/>
            <Image width={100} height={100} className="w-36 h-36 mx-auto rounded-full ring-4 ring-gray-300 hover:ring-5 hover:ring-slate-500"
                src="/img/hawkr_icon.png"
                alt="Hawkr"/>
            <div className="py-1 px-2.5 content-center">
                <h1 className="text-black py-10 font-bold text-3xl text-left">Name</h1>
                  <input
                    id="username"
                    type="text"
                    className='text-black block px-12 py-3 rounded-lg  ring-4 h-full w-full' 
                    value={name? name : ""} 
                    onChange={(e) => setName(e.target.value)}
                    disabled
                    >
                </input>
              <h1 className="text-black py-10 font-bold text-3xl text-left">Description</h1>
              <textarea
                id="description"
                className='text-black block px-12 py-10 rounded-lg  ring-4 h-full w-full' 
                value={description? description : ""}
                onChange={(e) => setDescription(e.target.value)}
                disabled
                >
              </textarea>
              <div className="flex">
                <button 
                  id="edit-button"
                  onClick={() => setShowEditButtons()} 
                  className="py-2 text-2xl font-bold text-cyan-500">
                    Edit Client Page
                </button>
                <button 
                  id="update-button"
                  onClick={() => updateProfile({name, description})} 
                  className="py-2 px-6 text-2xl font-bold text-cyan-500 hidden">
                    {loading ? 'Loading ...' : 'Update'}
                </button>
                <button
                  id="cancel-button"
                  onClick={() => setShowEditButtons()} 
                  className="py-2 px-6 text-2xl font-bold text-cyan-500 hidden">
                    Cancel
                </button>
              </div>
            </div>
            <div className="py-12 flex flex-col items-center">
              {state == 2 ? (
              <>
                <Link href="/manageShops" className="py-2 text-2xl font-bold text-cyan-500" >
                  Manage Shops
                </Link>
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