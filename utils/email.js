import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({ to, subject, html }) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️  RESEND_API_KEY not set - email would be sent to:', to)
      console.log('Subject:', subject)
      return { success: true, mode: 'dev' }
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to,
      subject,
      html
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('שגיאה בשליחת המייל')
    }

    console.log('✓ Email sent to:', to)
    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
    throw new Error('שגיאה בשליחת המייל')
  }
}
