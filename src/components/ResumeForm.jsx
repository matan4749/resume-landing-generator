import { useState } from 'react'
import axios from 'axios'

function ResumeForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    title: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    linkedin: '',
    github: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await axios.post('/api/resume/create', formData)
      setMessage({
        type: 'success',
        text: `הצלחה! קישור לדף הנחיתה נשלח למייל ${formData.email}`
      })
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        title: '',
        summary: '',
        experience: '',
        education: '',
        skills: '',
        linkedin: '',
        github: ''
      })
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
        <label>שם מלא *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>אימייל *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>טלפון</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>תפקיד נוכחי *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="למשל: מפתח Full Stack"
          required
        />
      </div>

      <div className="form-group">
        <label>תקציר מקצועי *</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="תאר את עצמך בקצרה..."
          required
        />
      </div>

      <div className="form-group">
        <label>ניסיון תעסוקתי</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="רשום את הניסיון התעסוקתי שלך (כל תפקיד בשורה נפרדת)"
        />
      </div>

      <div className="form-group">
        <label>השכלה</label>
        <textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="רשום את ההשכלה שלך"
        />
      </div>

      <div className="form-group">
        <label>כישורים טכניים</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="JavaScript, React, Node.js, MongoDB..."
        />
      </div>

      <div className="form-group">
        <label>LinkedIn</label>
        <input
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div className="form-group">
        <label>GitHub</label>
        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/yourusername"
        />
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'יוצר דף נחיתה...' : 'צור דף נחיתה'}
      </button>

      {message && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}
    </form>
  )
}

export default ResumeForm
