# 📒 ডিজিটাল খাতা

TallyKhata-এর মতো ডিজিটাল হিসাব রাখার অ্যাপ — SaaS বেইজড।

## 🚀 Live করার ধাপ (Step by Step)

### Step 1: GitHub Repo বানাও
1. [github.com/new](https://github.com/new) এ যাও
2. Repo নাম: `digital-khata`
3. Public সিলেক্ট করো → Create repository

### Step 2: এই ফাইলগুলো GitHub এ আপলোড করো
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/digital-khata.git
git push -u origin main
```

### Step 3: Supabase সেটআপ
1. [supabase.com](https://supabase.com) → New Project বানাও
2. SQL Editor → `supabase/schema.sql` ফাইলের কোড পেস্ট করো → Run
3. Settings → API → URL ও anon key কপি করো
4. Authentication → Providers → Phone চালু করো (Twilio দিয়ে)

### Step 4: Vercel Deploy
1. [vercel.com](https://vercel.com) → New Project → GitHub repo সিলেক্ট করো
2. Environment Variables যোগ করো:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...
   ```
3. Deploy! 🎉

### Step 5: Online IDE দিয়ে Develop করো
- **StackBlitz**: [stackblitz.com](https://stackblitz.com) → GitHub Login → repo open
- **GitHub Codespaces**: GitHub repo → Code → Codespaces → New

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **Auth + DB**: Supabase (PostgreSQL)
- **Deploy**: Vercel
- **IDE**: StackBlitz / GitHub Codespaces

## ⚡ ডেমো মোড (Supabase ছাড়াই টেস্ট)
অ্যাপ লোড করে "⚡ ডেমো দিয়ে সরাসরি ঢুকুন" বাটনে ক্লিক করো।
সব ডেটা localStorage এ সেভ থাকবে।

## 📁 Structure
```
digital-khata/
├── app/
│   ├── (auth)/login, register, otp
│   ├── (dashboard)/tali, cashbox, qr, wallet, menu
│   └── layout.jsx, page.jsx, globals.css
├── components/
│   ├── BottomNav.jsx
│   ├── RedHeader.jsx
│   ├── Calculator.jsx
│   ├── TxEntry.jsx
│   └── AddContact.jsx
├── lib/supabase.js
├── supabase/schema.sql
└── README.md
```
