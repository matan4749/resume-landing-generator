import { nanoid } from 'nanoid'
import { connectToDatabase } from '../../utils/mongodb.js'
import Resume from '../../models/Resume.js'
import { sendEmail } from '../../utils/email.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await connectToDatabase()

    const {
      fullName,
      email,
      phone,
      title,
      summary,
      experience,
      education,
      skills,
      linkedin,
      github
    } = req.body

    if (!fullName || !email || !title || !summary) {
      return res.status(400).json({ error: 'חסרים שדות חובה' })
    }

    const slug = nanoid(10)

    const resume = new Resume({
      slug,
      fullName,
      email,
      phone,
      title,
      summary,
      experience,
      education,
      skills,
      linkedin,
      github
    })

    await resume.save()

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.BASE_URL || 'http://localhost:3000')
    const resumeUrl = `${baseUrl}/r/${slug}`

    await sendEmail({
      to: email,
      subject: 'דף הנחיתה שלך מוכן!',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #667eea;">שלום ${fullName},</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            דף הנחיתה לקורות החיים שלך מוכן!
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            ניתן לגשת אליו בקישור הבא:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resumeUrl}"
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                      padding: 15px 40px;
                      text-decoration: none;
                      border-radius: 8px;
                      display: inline-block;
                      font-weight: bold;">
              צפה בדף הנחיתה שלך
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            או העתק את הקישור: <a href="${resumeUrl}">${resumeUrl}</a>
          </p>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            בהצלחה!
          </p>
        </div>
      `
    })

    res.json({
      success: true,
      url: resumeUrl,
      slug
    })
  } catch (error) {
    console.error('Error creating resume:', error)
    res.status(500).json({ error: 'שגיאה ביצירת דף הנחיתה' })
  }
}
