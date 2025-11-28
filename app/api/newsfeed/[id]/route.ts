import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, serviceKey)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase.from("newsfeed").select("*").eq("id", params.id).single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Newsfeed GET error:", error)
    return NextResponse.json({ error: "Newsfeed not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("newsfeed")
      .update({
        title: body.title,
        description: body.description,
        article_url: body.article_url,
        image_url: body.image_url,
        source_newspaper: body.source_newspaper,
      })
      .eq("id", params.id)

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Newsfeed PUT error:", error)
    return NextResponse.json({ error: "Failed to update newsfeed" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("newsfeed").delete().eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Newsfeed DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete newsfeed" }, { status: 500 })
  }
}
