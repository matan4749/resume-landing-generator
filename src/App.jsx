import { useState } from 'react'
import ResumeForm from './components/ResumeForm'
import FileUpload from './components/FileUpload'

function App() {
  const [mode, setMode] = useState('form') // 'form' or 'upload'

  return (
    <div className="container">
      <div className="header">
        <h1>יצירת דף נחיתה לקורות חיים</h1>
        <p>צור דף נחיתה מקצועי לקורות החיים שלך בקלות</p>
      </div>

      <div className="card">
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <button
            onClick={() => setMode('form')}
            style={{
              padding: '0.75rem 2rem',
              margin: '0 0.5rem',
              border: mode === 'form' ? '2px solid #667eea' : '2px solid #e0e0e0',
              background: mode === 'form' ? '#667eea' : 'white',
              color: mode === 'form' ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            מילוי טופס
          </button>
          <button
            onClick={() => setMode('upload')}
            style={{
              padding: '0.75rem 2rem',
              margin: '0 0.5rem',
              border: mode === 'upload' ? '2px solid #667eea' : '2px solid #e0e0e0',
              background: mode === 'upload' ? '#667eea' : 'white',
              color: mode === 'upload' ? 'white' : '#333',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            העלאת קובץ
          </button>
        </div>

        {mode === 'form' ? <ResumeForm /> : <FileUpload />}
      </div>
    </div>
  )
}

export default App
