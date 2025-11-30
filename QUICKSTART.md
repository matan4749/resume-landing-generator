# מדריך מהיר - העלאה ל-Vercel 🚀

## צעדים מהירים (10 דקות)

### 1️⃣ הכן את MongoDB Atlas

1. לך ל-https://www.mongodb.com/cloud/atlas/register
2. הירשם (חינמי)
3. לחץ "Build a Database" → בחר FREE
4. ב-Security → Database Access, צור משתמש עם סיסמה (שמור!)
5. ב-Security → Network Access, לחץ "Allow Access from Anywhere"
6. לחץ "Connect" → "Connect your application"
7. העתק את ה-connection string ו**החלף `<password>` בסיסמה**

### 2️⃣ הכן את SendGrid

1. לך ל-https://signup.sendgrid.com/
2. הירשם (חינמי - 100 מיילים ליום)
3. Settings → API Keys → "Create API Key"
4. שמור את ה-API Key
5. Settings → Sender Authentication → "Verify a Single Sender"
6. הזן את המייל שלך ואמת אותו

### 3️⃣ העלה ל-GitHub

```bash
cd resume-landing-generator
git init
git add .
git commit -m "Initial commit"

# צור repository ב-GitHub ואז:
git remote add origin https://github.com/YOUR_USERNAME/resume-landing-generator.git
git push -u origin main
```

### 4️⃣ העלה ל-Vercel

1. לך ל-https://vercel.com/signup
2. התחבר עם GitHub
3. לחץ "Add New..." → "Project"
4. בחר את ה-repository `resume-landing-generator`
5. לחץ "Import"

### 5️⃣ הגדר משתני סביבה

לפני שלוחצים Deploy, הוסף את המשתנים:

```
MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/...
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=your-verified-email@example.com
```

### 6️⃣ Deploy!

לחץ "Deploy" והמתן 1-2 דקות.

---

## זהו! 🎉

האתר שלך כעת חי באינטרנט ב:
```
https://your-project-name.vercel.app
```

נסה למלא את הטופס - תקבל מייל עם קישור לדף הנחיתה!

---

📖 לפרטים נוספים ראה [DEPLOYMENT.md](./DEPLOYMENT.md)
