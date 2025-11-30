# יוצר דפי נחיתה לקורות חיים

אפליקציה מלאה (Full Stack) ליצירת דפי נחיתה מקצועיים לקורות חיים. המשתמשים יכולים למלא טופס עם הפרטים שלהם, והאתר יצור עבורם דף נחיתה דיגיטלי ויישלח קישור למייל.

🌐 **מוכן להעלאה ל-Vercel!** - [מדריך העלאה מפורט](./DEPLOYMENT.md)

## טכנולוגיות

### Frontend
- ⚛️ React 18
- ⚡ Vite
- 🎨 CSS3 (Gradient design)
- 📡 Axios

### Backend
- ☁️ Vercel Serverless Functions
- 🍃 MongoDB + Mongoose
- 📧 SendGrid (שליחת מיילים)
- 🔐 Nanoid (מזהים ייחודיים)

## מבנה הפרויקט

```
resume-landing-generator/
├── api/                    # Serverless Functions (Backend)
│   ├── resume/
│   │   ├── create.js      # יצירת דף נחיתה מטופס
│   │   └── upload.js      # העלאת קובץ (placeholder)
│   └── r/
│       └── [slug].js      # הצגת דף נחיתה
│
├── src/                    # Frontend (React)
│   ├── components/
│   │   ├── ResumeForm.jsx
│   │   └── FileUpload.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── models/                 # MongoDB Models
│   └── Resume.js
│
├── utils/                  # Utilities
│   ├── mongodb.js         # MongoDB connection handler
│   └── email.js           # SendGrid email handler
│
├── index.html
├── vite.config.js
├── vercel.json            # Vercel configuration
├── package.json
├── DEPLOYMENT.md          # מדריך העלאה מפורט
└── README.md
```

## התקנה מקומית (לפיתוח)

### דרישות מוקדמות
- Node.js (גרסה 18 ומעלה)
- חשבון MongoDB Atlas (חינמי)
- חשבון SendGrid (חינמי)

### שלבי התקנה

```bash
# שכפול או הורדת הפרויקט
cd resume-landing-generator

# התקנת תלויות
npm install

# יצירת קובץ .env (רק לפיתוח מקומי)
# העתק את הדוגמה והוסף את הפרטים שלך
cp .env.example .env
```

ערוך את `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
SENDGRID_API_KEY=SG.your_api_key_here
FROM_EMAIL=noreply@yourdomain.com
BASE_URL=http://localhost:3000
```

### הרצת הפרויקט

```bash
npm run dev
```

האתר יהיה זמין ב-`http://localhost:3000`

**שימו לב:** בפיתוח מקומי, ה-API functions של Vercel לא יעבדו. צריך להשתמש ב-Vercel CLI:

```bash
# התקנת Vercel CLI
npm i -g vercel

# הרצה מקומית עם Vercel
vercel dev
```

---

## 🚀 העלאה לאינטרנט

הפרויקט מוכן להעלאה ל-**Vercel** (חינמי)!

### העלאה מהירה (3 שלבים)

1. **צור חשבון MongoDB Atlas וקבל Connection String** → [הוראות](./DEPLOYMENT.md#שלב-1-הכנת-mongodb-atlas-בסיס-נתונים)
2. **צור חשבון SendGrid וקבל API Key** → [הוראות](./DEPLOYMENT.md#שלב-2-הכנת-sendgrid-שליחת-מיילים)
3. **העלה ל-Vercel והגדר משתני סביבה** → [הוראות](./DEPLOYMENT.md#שלב-4-העלאה-ל-vercel)

📖 **[מדריך העלאה המלא והמפורט →](./DEPLOYMENT.md)**

---

## שימוש באפליקציה

### יצירת דף נחיתה דרך טופס

1. פתח את האתר
2. בחר באפשרות **"מילוי טופס"**
3. מלא את הפרטים:
   - ✅ שם מלא
   - ✅ אימייל
   - טלפון (אופציונלי)
   - ✅ תפקיד נוכחי
   - ✅ תקציר מקצועי
   - ניסיון תעסוקתי
   - השכלה
   - כישורים טכניים
   - קישורים ל-LinkedIn/GitHub
4. לחץ על **"צור דף נחיתה"**
5. המערכת תשלח מייל עם קישור לדף הנחיתה החדש ✉️

### צפייה בדף נחיתה

דפי הנחיתה זמינים בכתובת:
```
https://your-domain.vercel.app/r/{slug}
```

---

## API Endpoints

### POST `/api/resume/create`

יצירת דף נחיתה מטופס.

**Body:**
```json
{
  "fullName": "שם מלא",
  "email": "email@example.com",
  "phone": "050-1234567",
  "title": "מפתח Full Stack",
  "summary": "תקציר מקצועי...",
  "experience": "ניסיון תעסוקתי...",
  "education": "השכלה...",
  "skills": "JavaScript, React, Node.js",
  "linkedin": "https://linkedin.com/in/username",
  "github": "https://github.com/username"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://your-domain.vercel.app/r/abc123",
  "slug": "abc123"
}
```

### GET `/r/:slug`

צפייה בדף נחיתה (נגיש ישירות בדפדפן).

---

## פיצ'רים

✅ טופס ידידותי למילוי פרטי קורות חיים
✅ יצירת דף נחיתה מעוצב ומקצועי
✅ שליחת קישור למייל דרך SendGrid
✅ עיצוב מודרני עם Gradient
✅ תמיכה בעברית (RTL)
✅ רספונסיבי - מתאים למובייל ודסקטופ
✅ מזהים ייחודיים (Slug) לכל דף
✅ תמיכה בהדפסה
✅ מוכן להעלאה ל-Vercel ללא שינויים
✅ Serverless - ללא צורך בשרת ייעודי
✅ HTTPS אוטומטי

---

## משתני סביבה (Environment Variables)

הפרויקט דורש את משתני הסביבה הבאים:

| משתנה | תיאור | דוגמה |
|-------|--------|-------|
| `MONGODB_URI` | Connection string ל-MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/...` |
| `SENDGRID_API_KEY` | API Key מ-SendGrid | `SG.xxxxxxxxxxxxx` |
| `FROM_EMAIL` | כתובת מייל מאומתת לשליחה | `noreply@example.com` |

**ב-Vercel:** משתני הסביבה מוגדרים דרך ממשק האינטרנט (Settings → Environment Variables)

**בפיתוח מקומי:** משתני הסביבה נשמרים בקובץ `.env` (לא מועלה ל-Git)

---

## פיתוח נוסף (רעיונות)

- 🎨 תבניות עיצוב שונות לבחירה
- 🔒 אימות משתמשים וניהול דפים
- 📊 Analytics - מעקב אחר צפיות בדף
- 🌐 דומיין מותאם אישית לכל משתמש
- 🤖 שימוש ב-AI לעיבוד קבצי PDF והפקת טקסט
- 📱 אפליקציית מובייל / PWA
- 💼 שיתוף ישירות לרשתות חברתיות
- 🎓 תבניות ייעודיות לתחומים שונים
- 🖼️ העלאת תמונת פרופיל
- 📥 ייצוא ל-PDF

---

## טכנולוגיות נוספות

- **Vercel Serverless Functions** - Backend ללא שרת
- **MongoDB Atlas** - בסיס נתונים בענן
- **SendGrid** - שליחת מיילים
- **Nanoid** - יצירת מזהים ייחודיים קצרים וידידותיים

---

## עלויות

כל השירותים **חינמיים** (Free Tier):

- ✅ **Vercel**: 100GB bandwidth, אתרים בלתי מוגבלים, HTTPS חינם
- ✅ **MongoDB Atlas**: 512MB אחסון (מספיק לאלפי קורות חיים)
- ✅ **SendGrid**: 100 מיילים ליום (12,000 בחודש)

אין עלויות עד שתצטרך לשדרג (שזה כנראה ייקח הרבה זמן).

---

## פתרון בעיות נפוצות

### MongoDB לא מתחבר
- ודא שהסיסמה נכונה ב-`MONGODB_URI`
- ודא שהוספת 0.0.0.0/0 ל-IP Whitelist ב-Atlas

### SendGrid לא שולח מיילים
- ודא שה-API Key תקין
- ודא שה-FROM_EMAIL מאומת ב-SendGrid
- בדוק את תיקיית Spam

### הפרויקט לא עובד ב-Vercel
- בדוק את ה-Logs: Deployments → בחר deployment → View Function Logs
- ודא שכל משתני הסביבה מוגדרים
- נסה Redeploy

---

## תרומה

Pull Requests מתקבלים בברכה! אם יש לך רעיון לשיפור, אל תהסס.

---

## רישיון

MIT

---

**נוצר עם ❤️ בעזרת React, Vercel ו-MongoDB**

📖 [מדריך העלאה מלא](./DEPLOYMENT.md) | 🚀 [Demo](https://resume-landing-generator.vercel.app)
