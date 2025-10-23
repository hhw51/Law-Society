import nodemailer from "nodemailer"

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
  }>
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Email send error:", error)
    throw error
  }
}

// Email templates
export function contactFormTemplate(data: {
  name: string
  email: string
  phone: string
  message: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <div style="margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #d4af37;">
          ${data.message.replace(/\n/g, "<br>")}
        </p>
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message from Pakistan College of Law Dignity Rights Center website.
      </p>
    </div>
  `
}

export function askALawyerTemplate(data: {
  name: string
  email: string
  topic: string
  message: string
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
        New Ask A Lawyer Submission
      </h2>
      <div style="margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Topic:</strong> ${data.topic}</p>
        <p><strong>Question:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #d4af37;">
          ${data.message.replace(/\n/g, "<br>")}
        </p>
      </div>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message from Pakistan College of Law Dignity Rights Center website.
      </p>
    </div>
  `
}

export function confirmationTemplate(name: string, type: "contact" | "question") {
  const typeText = type === "contact" ? "contact message" : "question"
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">Thank You, ${name}!</h2>
      <p>We have received your ${typeText} and will get back to you as soon as possible.</p>
      <p>Our team at Pakistan College of Law Dignity Rights Center is committed to providing you with the best service.</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        If you have any urgent matters, please contact us directly at the phone number provided on our website.
      </p>
    </div>
  `
}
