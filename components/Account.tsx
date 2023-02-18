import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
// import Avatar from './Avatar'

import { Database } from '../utils/database.types'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [UUID, setUUID] = useState<Profiles['UUID']>()
  const [state, setState] = useState<Profiles['state']>(null)
  const [name, setName] = useState<Profiles['name']>(null)
  const [description, setDescription] = useState<Profiles['description']>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function createProfile(){
      try{
        if (!user) throw new Error('No user')

        const updates = {
          UUID: user.id,
          state: 1,
          name: user.email,
          description: "Welcome to my profile!"
        }

        let { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
        //alert('Profile updated!')
      }
      catch (error) {
        alert('Error updating the data!')
        console.log(error)
      }
    }
    async function loadData() {
      //const { data } = await supabase.from('profiles').select('*')
      try {
        setLoading(true)
        if (!user) throw new Error('No user')
  
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('UUID', user.id)
          .single()
        
        if (status == 406){
          createProfile()
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
  }, [user])

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
        // change this. need to pull from db
        state: 1,
        name: user.email,
        description: description
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      //alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      {/* <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url })
        }}
      /> */}
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Description: </label>
        <input
          id="description"
          type="text"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile( {name, description} )}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
