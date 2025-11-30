# מדריך העלאה ל-Vercel

מדריך מפורט להעלאת הפרויקט לאינטרנט באמצעות Vercel, MongoDB Atlas ו-SendGrid.

## דרישות מוקדמות

לפני שמתחילים, יש צורך ב:
1. חשבון GitHub (חינמי)
2. חשבון Vercel (חינמי)
3. חשבון MongoDB Atlas (חינמי)
4. חשבון SendGrid (חינמי)

---

## שלב 1: הכנת MongoDB Atlas (בסיס נתונים)

### 1.1 יצירת חשבון

1. היכנס ל-[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. הירשם עם Google או אימייל
3. בחר ב-**FREE** tier (M0 Sandbox)

### 1.2 יצירת Cluster

1. לחץ על **"Build a Database"**
2. בחר **FREE** (M0)
3. בחר region קרוב (לדוגמה: Frankfurt או Ireland)
4. שמור את ה-cluster (השם ברירת המחדל: Cluster0)
5. המתן כמה דקות עד שה-cluster יהיה מוכן

### 1.3 יצירת משתמש למסד הנתונים

1. ב-**Security → Database Access**, לחץ על **"Add New Database User"**
2. בחר **"Password"** לאימות
3. צור שם משתמש (לדוגמה: `resumeapp`)
4. צור סיסמה חזקה **ושמור אותה!**
5. ב-**Database User Privileges**, בחר **"Read and write to any database"**
6. לחץ **"Add User"**

### 1.4 הגדרת IP Whitelist

1. ב-**Security → Network Access**, לחץ על **"Add IP Address"**
2. לחץ על **"Allow Access from Anywhere"** (0.0.0.0/0)
   - זה בטוח ל-Vercel כי הגישה מוגנת בסיסמה
3. לחץ **"Confirm"**

### 1.5 קבלת Connection String

1. לחץ על **"Connect"** ליד ה-cluster שלך
2. בחר **"Connect your application"**
3. בחר **Driver: Node.js** ו-**Version: 5.5 or later**
4. העתק את ה-connection string (נראה כך):
   ```
   mongodb+srv://resumeapp:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **החלף את `<password>` בסיסמה האמיתית** שיצרת
6. שמור את המחרוזת הזו - נצטרך אותה בהמשך

---

## שלב 2: הכנת SendGrid (שליחת מיילים)

### 2.1 יצירת חשבון

1. היכנס ל-[SendGrid](https://signup.sendgrid.com/)
2. הירשם (התוכנית החינמית כוללת 100 מיילים ליום - מספיק להתחלה)
3. אמת את כתובת המייל שלך

### 2.2 יצירת API Key

1. לאחר ההתחברות, עבור ל-**Settings → API Keys**
2. לחץ על **"Create API Key"**
3. שם למפתח: `Resume Landing Generator`
4. בחר **"Full Access"** (או לפחות Mail Send)
5. לחץ **"Create & View"**
6. **העתק את ה-API Key ושמור אותו!** (לא תוכל לראות אותו שוב)

### 2.3 אימות Sender Identity

1. עבור ל-**Settings → Sender Authentication**
2. לחץ על **"Verify a Single Sender"**
3. מלא את הטופס:
   - **From Email Address**: המייל שממנו יישלחו ההודעות (לדוגמה: `noreply@gmail.com`)
   - **From Name**: שם השולח (לדוגמה: "Resume Landing")
   - מלא את שאר הפרטים
4. לחץ **"Create"**
5. בדוק את תיבת המייל ואמת את הכתובת

---

## שלב 3: העלאה ל-GitHub

### 3.1 אתחול Git (אם עדיין לא עשית)

```bash
cd resume-landing-generator
git init
git add .
git commit -m "Initial commit - Resume Landing Generator"
```

### 3.2 יצירת Repository ב-GitHub

1. היכנס ל-[GitHub](https://github.com)
2. לחץ על **"+"** בפינה הימנית העליונה → **"New repository"**
3. שם ל-repository: `resume-landing-generator`
4. בחר **Public** או **Private**
5. **אל** תבחר ב-"Initialize this repository with a README"
6. לחץ **"Create repository"**

### 3.3 העלאת הקוד

```bash
# החלף YOUR_USERNAME בשם המשתמש שלך ב-GitHub
git remote add origin https://github.com/YOUR_USERNAME/resume-landing-generator.git
git branch -M main
git push -u origin main
```

---

## שלב 4: העלאה ל-Vercel

### 4.1 יצירת חשבון Vercel

1. היכנס ל-[Vercel](https://vercel.com/signup)
2. בחר **"Continue with GitHub"**
3. אשר את החיבור ל-GitHub

### 4.2 ייבוא הפרויקט

1. בדף הבית של Vercel, לחץ על **"Add New..." → "Project"**
2. ייבא את ה-repository `resume-landing-generator`
3. לחץ **"Import"**

### 4.3 הגדרת משתני סביבה (Environment Variables)

בעמוד ההגדרות, לפני ה-Deploy, לחץ על **"Environment Variables"** והוסף:

| Name | Value |
|------|-------|
| `MONGODB_URI` | המחרוזת מ-MongoDB Atlas (עם הסיסמה!) |
| `SENDGRID_API_KEY` | ה-API Key מ-SendGrid |
| `FROM_EMAIL` | המייל המאומת ב-SendGrid |

**דוגמה:**
```
MONGODB_URI=mongodb+srv://resumeapp:myPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@gmail.com
```

### 4.4 Deploy!

1. לאחר הוספת משתני הסביבה, לחץ על **"Deploy"**
2. Vercel יתחיל לבנות את הפרויקט (לוקח בערך 1-2 דקות)
3. כשזה מסתיים, תראה **"Congratulations!"**

---

## שלב 5: בדיקה ושימוש

### 5.1 קבלת ה-URL

1. אחרי ה-deployment, Vercel ייתן לך URL כמו:
   ```
   https://resume-landing-generator.vercel.app
   ```
2. לחץ על ה-URL לפתיחת האתר

### 5.2 בדיקת האתר

1. פתח את האתר
2. מלא את הטופס עם הפרטים שלך
3. הזן את כתובת המייל שלך
4. לחץ **"צור דף נחיתה"**
5. בדוק את תיבת המייל - אמור להגיע מייל עם קישור!

### 5.3 צפייה בדף הנחיתה

לחץ על הקישור במייל או גש ל:
```
https://resume-landing-generator.vercel.app/r/{slug}
```

---

## שלב 6: התאמה אישית (אופציונלי)

### 6.1 שינוי הדומיין

אם יש לך דומיין משלך:
1. ב-Vercel, עבור ל-**Settings → Domains**
2. לחץ **"Add Domain"**
3. הזן את הדומיין שלך (לדוגמה: `myresume.com`)
4. עקוב אחרי ההוראות לעדכון DNS

### 6.2 עדכון קוד

כל פעם שתעשה שינויים:
```bash
git add .
git commit -m "תיאור השינוי"
git push
```

Vercel יעשה deploy אוטומטי!

---

## פתרון בעיות נפוצות

### בעיה: "MongoDB connection error"

**פתרון:**
1. ודא שהסיסמה נכונה ב-`MONGODB_URI`
2. ודא שהוספת 0.0.0.0/0 ל-Network Access ב-Atlas
3. בדוק ש-connection string מתחיל ב-`mongodb+srv://`

### בעיה: "SendGrid error" או מיילים לא מגיעים

**פתרון:**
1. ודא שה-API Key נכון
2. ודא שאימתת את ה-Sender Email ב-SendGrid
3. בדוק את תיקיית ה-Spam
4. ודא שלא עברת את המכסה היומית (100 מיילים)

### בעיה: "404 Not Found" כשגולשים ל-/r/{slug}

**פתרון:**
1. ודא ש-`vercel.json` קיים בroot
2. עשה redeploy ב-Vercel
3. נקה את ה-cache: Settings → Clear Cache and Redeploy

### בעיה: הצבעים לא נראים טוב

**פתרון:**
ערוך את `src/index.css` ושנה את ה-gradient colors ב-`.header`

---

## עלויות

כל השירותים שבהם השתמשנו הם **חינמיים**:

- **Vercel Free Tier:**
  - 100GB Bandwidth
  - Unlimited websites
  - HTTPS אוטומטי

- **MongoDB Atlas Free Tier:**
  - 512MB אחסון
  - מספיק לאלפי קורות חיים

- **SendGrid Free Tier:**
  - 100 מיילים ליום
  - 12,000 מיילים בחודש (מספיק למרבית המקרים)

אם תרצה יותר, תמיד אפשר לשדרג בעתיד.

---

## מה הלאה?

רעיונות לשיפורים עתידיים:
- 🎨 הוספת תבניות עיצוב שונות
- 🤖 שימוש ב-AI לעיבוד קבצי PDF אמיתיים
- 📊 מעקב אחר צפיות בדף
- 🔒 מערכת התחברות למשתמשים
- 🌐 דומיין מותאם אישית לכל משתמש
- 📱 PWA (Progressive Web App)

---

## תמיכה

אם נתקלת בבעיות:
1. בדוק את ה-Logs ב-Vercel: פרויקט → Deployments → בחר deployment → View Function Logs
2. בדוק את ה-Environment Variables
3. וודא שכל השירותים החיצוניים (MongoDB, SendGrid) עובדים

---

בהצלחה! 🚀
