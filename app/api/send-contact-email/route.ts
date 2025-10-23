import { sendEmail, contactFormTemplate, confirmationTemplate } from "@/lib/email"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER || "",
      subject: `New Contact Form Submission from ${name}`,
      html: contactFormTemplate({ name, email, phone, message }),
    })

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: "We received your message - Pakistan College of Law",
      html: confirmationTemplate(name, "contact"),
    })

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
