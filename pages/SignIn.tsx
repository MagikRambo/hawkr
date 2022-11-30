import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import styles from '../styles/supabasestyling.module.css'

const SignIn: NextPage = () => {

    const session = useSession()
    const supabase = useSupabaseClient()
    
    return (
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
    )
}

export default SignIn