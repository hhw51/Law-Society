import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Optimized light query: just grab 1 row from settings or any table
    const { data, error } = await supabase.from("settings").select("key").limit(1);

    if (error) {
      console.error("Keep-alive query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Database is awake!", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)
    const body = await request.json()

    const { data, error } = await supabase.from("newsfeed").insert({
      title: body.title,
      description: body.description,
      article_url: body.article_url,
      image_url: body.image_url,
      source_newspaper: body.source_newspaper,
    })

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("[v0] Newsfeed POST error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create newsfeed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
