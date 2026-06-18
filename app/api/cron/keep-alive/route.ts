import { createClient } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

const CRON_SECRET = process.env.MY_CUSTOM_CRON_SECRET;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    // Check if the header matches your custom secret string
    if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Safely check if the variables exist now that they are defined above
    if (!supabaseUrl || !serviceKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Light query to keep DB alive
    const { error } = await supabase.from("settings").select("key").limit(1);

    if (error) {
      console.error("Keep-alive query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Database is awake!" });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}