import { useSupabaseClient } from '@supabase/auth-helpers-react'
import {createClient} from '@supabase/supabase-js'
import {validate as uuidValidate, v4 as uuidv4} from 'uuid'

async function get_shops_by_id(shop_id:string) {
    
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)


    // console.log(uuidValidate(shop_id))
    // console.log(uuidStringify(shop_id))

    // console.log(typeof(shop_id))
    const {data, error} = await supabase.rpc('get_shop_by_id', {shop_id})
    
    // console.log(data)
    
    
    return {data}
    }
     
    export default get_shops_by_id;
    