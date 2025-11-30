import { nanoid } from 'nanoid'
import { connectToDatabase } from '../../utils/mongodb.js'
import Resume from '../../models/Resume.js'
import { sendEmail } from '../../utils/email.js'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await connectToDatabase()

    // For Vercel deployment, file upload handling is simplified
    // In a production environment, you'd use Vercel Blob or external storage
    const { email, fileName } = req.body

    if (!email) {
      return res.status(400).json({ error: 'חסרה כתובת אימייל' })
    }

    const slug = nanoid(10)

    const resume = new Resume({
      slug,
      fullName: 'משתמש',
      email,
      title: 'קורות חיים',
      summary: `קובץ קורות חיים הועלה: ${fileName || 'resume.pdf'}`,
      experience: 'עיבוד קובץ ידני נדרש - מומלץ להשתמש בטופס למילוי ידני לתוצאות טובות יותר'
    })

    await resume.save()

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : (process.env.BASE_URL || 'http://localhost:3000')
    const resumeUrl = `${baseUrl}/r/${slug}`

    await sendEmail({
      to: email,
      subject: 'קובץ קורות החיים שלך הועלה!',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #667eea;">הקובץ הועלה בהצלחה</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            קובץ קורות החיים שלך (<strong>${fileName || 'resume.pdf'}</strong>) התקבל בהצלחה.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            דף נחיתה זמני נוצר עבורך. <strong>לקבלת תוצאות טובות יותר, מומלץ למלא את הטופס באתר.</strong>
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
              צפה בדף הנחיתה
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            קישור: <a href="${resumeUrl}">${resumeUrl}</a>
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
    console.error('Error uploading resume:', error)
    res.status(500).json({ error: error.message || 'שגיאה בהעלאת הקובץ' })
  }
}
