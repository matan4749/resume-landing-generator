import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function sendEmail({ to, subject, html }) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('⚠️  SENDGRID_API_KEY not set - email would be sent to:', to)
      console.log('Subject:', subject)
      return { success: true, mode: 'dev' }
    }

    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'noreply@example.com',
      subject,
      html
    }

    await sgMail.send(msg)
    console.log('✓ Email sent to:', to)
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    throw new Error('שגיאה בשליחת המייל')
  }
}
