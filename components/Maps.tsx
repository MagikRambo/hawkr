import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
// import { supabase } from '../utils/supabaseClient'
import { Database } from '../utils/database.types'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState<Profiles['name']>(null)
  const [state, setState] = useState<Profiles['state']>(null)
  const [description, setDescription] = useState<Profiles['description']>(null)

  useEffect(() => {
    getMap()
  }, [])

  async function getMap() {
    try {
      setLoading(true)
      //if (!user) throw new Error('No user')
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`name, description`)
        .eq('name', 'Alex')
        .single()

      if (error && status !== 406) {
        console.log("Error: " + error);
        throw error
      }

      if (data) {
        setName(data.name)
        setDescription(data.description)
      //   data.forEach(function (value) {
      //     if(value.name == "Alex"){
            
      //     }
      //     console.log(value);
      // });
      
        //setName(data)
        // setState(data.state)
        // setDescription(data.description)
        console.log("data is: " + data + ", " + data);
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log("Error: " + error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    uuid,
    name,
    state,
    description,
  }: {
    uuid: Profiles['uuid']
    name: Profiles['name']
    state: Profiles['state']
    description: Profiles['description']
  }) {
    try {
      setLoading(true)
      //if (!user) throw new Error('No user')

      const updates = {
        uuid,
        name,
        state,
        description,
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="form-widget">
        <div>
          <label htmlFor="name">name: </label>
          <input id="name" type="text" value={name ? name : 'blank'} onChange={(e) => setName(e.target.value)} disabled />
        </div>
        <div>
          <label htmlFor="description">description: </label>
          <input id="description" type="text" value={description ? description : 'blank'} onChange={(e) => setDescription(e.target.value)} disabled />
        </div>
        {/* <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div> */}
        {/* <div>
          <button
            className="button primary block"
            onClick={() => getMap()}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
        <div>
          <button className="button block" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div> */}
      </div>
  )
}
