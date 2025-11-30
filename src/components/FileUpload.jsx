import { useState } from 'react'
import axios from 'axios'

function FileUpload() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setMessage(null)
      } else {
        setMessage({
          type: 'error',
          text: 'אנא העלה קובץ PDF או Word בלבד'
        })
        setFile(null)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !email) {
      setMessage({
        type: 'error',
        text: 'אנא בחר קובץ והזן כתובת אימייל'
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Note: File upload to serverless functions requires additional setup
      // For now, we're just sending the filename
      const response = await axios.post('/api/resume/upload', {
        email,
        fileName: file.name
      })
      setMessage({
        type: 'success',
        text: `הצלחה! קישור לדף הנחיתה נשלח למייל ${email}. שים לב: לתוצאות מיטביות, מומלץ למלא את הטופס ידנית.`
      })
      setFile(null)
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'אירעה שגיאה, נסה שוב'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>כתובת אימייל *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="file-upload" className="file-upload">
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <div>
            {file ? (
              <>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>✓ {file.name}</p>
                <p style={{ color: '#666' }}>לחץ לבחירת קובץ אחר</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📄 העלה קובץ קורות חיים</p>
                <p style={{ color: '#666' }}>PDF, DOC, או DOCX</p>
              </>
            )}
          </div>
        </label>
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'מעלה ויוצר דף נחיתה...' : 'צור דף נחיתה'}
      </button>

      {message && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}
    </form>
  )
}

export default FileUpload
