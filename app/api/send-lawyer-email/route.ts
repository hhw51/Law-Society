import { sendEmail, askALawyerTemplate, confirmationTemplate } from "@/lib/email"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, topic, message } = body

    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER || "",
      subject: `New Ask A Lawyer Submission from ${name} - ${topic}`,
      html: askALawyerTemplate({ name, email, topic, message }),
    })

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: "We received your question - Pakistan College of Law",
      html: confirmationTemplate(name, "question"),
    })

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
