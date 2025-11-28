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
    const { data, error } = await supabase.from("judgements").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Judgements query error:", error)
      return NextResponse.json({ error: error.message || "Failed to fetch judgements" }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Judgements GET error:", error)
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

    const { data, error } = await supabase.from("judgements").insert({
      wp_no: body.wp_no,
      case_name: body.case_name,
      plaintiff: body.plaintiff,
      defendant: body.defendant,
      pdf_link: body.pdf_link || null,
    })

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("[v0] Judgements POST error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create judgement"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
