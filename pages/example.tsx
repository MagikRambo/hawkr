import { EnvelopeIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import supabase from "../utils/supabaseClient"
export default function Example() {
    
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    async function signUpWithEmail(){
        try{
            if (email && password){
                const resp = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    
                });

                if (resp.error) throw resp.error;

                const userId = resp.data.user?.id;
                console.log("userId: ", userId)
            }
            
        }catch{
            /* INSERT CATCH HERE IF HERE */
        }
    }
    return (
      <div className="flex flex-col w-full justify-center items-center bg-white">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
        Password
      </label>
      <div className="mt-1">
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          placeholder="you@example.com"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

        {/* TODO: Insert Captcha Here */}
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
        onClick={signUpWithEmail}
      >
        Sign up
      </button>
      </div>
    )
  }