import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import styles from '../styles/supabasestyling.module.css'
import Navbar from '../components/navbar';

type SignInState = {
  exploreOpen: boolean,
  typesOpen: boolean,
  curr_idx:number
}

const SignIn: NextPage = () => {

    const session = useSession()
    const supabase = useSupabaseClient()
    
    const setOpen = (o: boolean, idx:number) => {
      if(idx == 1){ const setState = {exploreOpen: o, curr_idx:idx} }
      else if (idx == 2) { const setState = { typesOpen:o, curr_idx: idx} }
      else { const setState = {exploreOpen: false, typesOpen:false, curr_idx:0} }
    }

    return (
      <>
        <Navbar handleOpen={setOpen} curr_idx = {0}/>
        <div className={styles.container} style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <div className={styles.row}>
            <div className={styles.col}>
              <h1 className={styles.header}>Supabase Auth + Storage</h1>
              <p className="">
                Experience our Auth and Storage through a simple profile management example. Create a
                user profile and upload an avatar image. Fast, simple, secure.
              </p>
            </div>
            <div className={styles.auth}>
              <Auth
              providers={['github', 'google', 'apple']} 
              supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
            </div>
          </div>
        ) : (
          <>
            <h3>Account</h3>
            <Account session={session} />
          </>
        )}

      </div>
      </>
    )
}

export default SignIn