import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, serviceKey)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase.from("judgements").select("*").eq("id", params.id).single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Judgements GET error:", error)
    return NextResponse.json({ error: "Judgement not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("judgements")
      .update({
        wp_no: body.wp_no,
        case_name: body.case_name,
        plaintiff: body.plaintiff,
        defendant: body.defendant,
        pdf_link: body.pdf_link,
      })
      .eq("id", params.id)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Judgements PUT error:", error)
    return NextResponse.json({ error: "Failed to update judgement" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("judgements").delete().eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Judgements DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete judgement" }, { status: 500 })
  }
}
