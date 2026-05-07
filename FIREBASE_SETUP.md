# Firebase Deployment Guide

## Overview

This guide helps you set up Firebase Storage for banner image uploads, enabling a real website experience for multiple users.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project" → Enter name "kenbarbershop" → Continue
3. Disable Google Analytics (optional) → Create Project

## Step 2: Add Web App

1. In Firebase Console, click the gear icon → Project Settings
2. Scroll to "Your apps" → Click Web icon `</>`
3. Register app nickname: "kenbarbershop-web"
4. Copy the `firebaseConfig` object shown

## Step 3: Configure firebase-config.js

Open `static/js/firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Enable Firebase Storage

1. In Firebase Console → Build → Storage
2. Click "Get started"
3. Select "Start in test mode" (for development)
4. Choose a location close to your users (Europe: `europe-west1`)
5. Click "Done"

## Step 5: Update Storage Rules (for production)

For production, update rules in Firebase Console → Storage → Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /banners/{allPaths} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 6: Deploy Static Files

You have two options:

### Option A: Continue with GitHub Pages (Recommended for frontend-only)

Deploy frontend to GitHub Pages, use Firebase for image storage only.

1. Push changes to GitHub
2. GitHub Pages will serve the site
3. Firebase Storage handles banner images

### Option B: Deploy everything to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login:
   ```bash
   firebase login
   ```

3. Initialize Firebase in project:
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project"
   - Select your project
   - Set public directory: "." (current directory)
   - Configure as single-page app: No
   - Set up automatic builds: No

4. Deploy:
   ```bash
   firebase deploy
   ```

## Firebase Storage Costs

| Storage | Free Tier | Paid |
|---------|-----------|------|
| Storage | 5 GB | ~$0.026/GB |
| Downloads | 1 GB/day | ~$0.12/GB |

For a small barbershop website with banner uploads, the free tier is usually sufficient.

## Troubleshooting

### "storage/object-not-found"
The banner hasn't been uploaded yet. Go to `/admin.html` and upload one.

### "storage/unauthorized"
Storage rules don't allow the operation. Check rules in Firebase Console.

### "Firebase not configured"
Make sure you replaced the placeholder values in `firebase-config.js`.

## Alternative: Supabase (Easier Setup)

If Firebase seems complex, consider [Supabase](https://supabase.com) which offers:
- 1GB Free Storage
- Simpler setup
- Better free tier

---
