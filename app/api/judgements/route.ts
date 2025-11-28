import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, serviceKey)

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase.from("judgements").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Judgements GET error:", error)
    return NextResponse.json({ error: "Failed to fetch judgements" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json({ error: "Failed to create judgement" }, { status: 500 })
  }
}
