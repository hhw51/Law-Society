import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 1. Initialize Supabase with your Service Role Key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const heartbeatKey = `keep_alive_${Date.now()}`

  try {
    // 2. Insert into 'settings' table
    const { error: insertError } = await supabase
      .from('settings')
      .insert([{ 
        key: heartbeatKey, 
        value: 'active' 
      }])

    if (insertError) throw insertError

    // 3. Delete the temporary row
    const { error: deleteError } = await supabase
      .from('settings')
      .delete()
      .eq('key', heartbeatKey)

    if (deleteError) throw deleteError

    return NextResponse.json({ status: 'Database kept alive' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}