import { connectToDatabase } from '../../utils/mongodb.js'
import Resume from '../../models/Resume.js'

export default async function handler(req, res) {
  const { slug } = req.query

  if (!slug) {
    return res.status(400).send('<h1>Invalid request</h1>')
  }

  try {
    await connectToDatabase()
    const resume = await Resume.findOne({ slug })

    if (!resume) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>קורות חיים לא נמצאו</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            h1 { font-size: 2rem; }
          </style>
        </head>
        <body>
          <h1>קורות חיים לא נמצאו</h1>
        </body>
        </html>
      `)
    }

    const html = generateResumeHTML(resume)
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.status(200).send(html)
  } catch (error) {
    console.error('Error fetching resume:', error)
    res.status(500).send('<h1>שגיאה בטעינת הדף</h1>')
  }
}

function generateResumeHTML(resume) {
  const skills = resume.skills ? resume.skills.split(',').map(s => s.trim()) : []

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.fullName} - קורות חיים</title>
  <meta name="description" content="${resume.title} - ${resume.summary.substring(0, 150)}">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #f5f5f5;
      padding: 2rem;
      direction: rtl;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 40px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .header .title {
      font-size: 1.3rem;
      opacity: 0.95;
      margin-bottom: 1rem;
    }
    .contact {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin-top: 1rem;
    }
    .contact a, .contact span {
      color: white;
      text-decoration: none;
      opacity: 0.9;
      transition: opacity 0.3s;
    }
    .contact a:hover {
      opacity: 1;
    }
    .content {
      padding: 2rem;
    }
    .section {
      margin-bottom: 2.5rem;
    }
    .section h2 {
      color: #667eea;
      border-bottom: 3px solid #667eea;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    .section p {
      line-height: 1.8;
      color: #333;
      white-space: pre-wrap;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill {
      background: #667eea;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      body {
        padding: 0;
      }
      .header h1 {
        font-size: 2rem;
      }
      .content {
        padding: 1.5rem;
      }
    }
    @media print {
      body {
        padding: 0;
        background: white;
      }
      .container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${resume.fullName}</h1>
      <div class="title">${resume.title}</div>
      <div class="contact">
        ${resume.email ? `<a href="mailto:${resume.email}">📧 ${resume.email}</a>` : ''}
        ${resume.phone ? `<span>📱 ${resume.phone}</span>` : ''}
        ${resume.linkedin ? `<a href="${resume.linkedin}" target="_blank" rel="noopener">💼 LinkedIn</a>` : ''}
        ${resume.github ? `<a href="${resume.github}" target="_blank" rel="noopener">💻 GitHub</a>` : ''}
      </div>
    </div>

    <div class="content">
      ${resume.summary ? `
        <div class="section">
          <h2>תקציר מקצועי</h2>
          <p>${resume.summary}</p>
        </div>
      ` : ''}

      ${resume.experience ? `
        <div class="section">
          <h2>ניסיון תעסוקתי</h2>
          <p>${resume.experience}</p>
        </div>
      ` : ''}

      ${resume.education ? `
        <div class="section">
          <h2>השכלה</h2>
          <p>${resume.education}</p>
        </div>
      ` : ''}

      ${skills.length > 0 ? `
        <div class="section">
          <h2>כישורים טכניים</h2>
          <div class="skills">
            ${skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`
}
