import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 1. Security check: Only allow Vercel to trigger this
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 2. Initialize Supabase with your Service Role Key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const heartbeatId = `ping_${Date.now()}`

  try {
    // 3. Insert into the 'settings' table (activity to reset Supabase timer)
    const { error: insertError } = await supabase
      .from('settings')
      .insert([{ 
        key: heartbeatId, 
        value: 'keep-alive' 
      }])

    if (insertError) throw insertError

    // 4. Delete the row immediately to keep the table clean
    const { error: deleteError } = await supabase
      .from('settings')
      .delete()
      .eq('key', heartbeatId)

    if (deleteError) throw deleteError

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase heart beating' 
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}