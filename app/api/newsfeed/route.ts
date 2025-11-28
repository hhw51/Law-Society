import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !serviceKey) {
      const missing = []
      if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL")
      if (!serviceKey) missing.push("SUPABASE_SERVICE_ROLE_KEY")
      console.error("[v0] Missing env vars:", missing)
      return NextResponse.json({ error: `Missing environment variables: ${missing.join(", ")}` }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceKey)
    const { searchParams } = new URL(request.url)
    const newspaper = searchParams.get("newspaper")

    let query = supabase.from("newsfeed").select("*")

    if (newspaper && newspaper !== "all") {
      query = query.eq("source_newspaper", newspaper)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Newsfeed query error:", error)
      return NextResponse.json({ error: error.message || "Failed to fetch newsfeed" }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Newsfeed GET error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
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
