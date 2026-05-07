# Cloudinary Setup Guide

## Why Cloudinary?

- **Free tier**: 25GB storage, 25GB bandwidth/month
- **Easy setup**: No credit card needed to start
- **CDN included**: Fast delivery worldwide
- **Image optimization**: Auto-resize, format conversion

---

## Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **Sign up free**
3. Fill in your details (use Google/GitHub signup for faster)
4. Verify email if required

---

## Step 2: Get Your Cloud Name

1. After login, go to **Dashboard**
2. You'll see **Cloud name** at the top (e.g., `xxxxx`)
3. Copy this value

---

## Step 3: Create Upload Preset

1. Go to **Settings** (gear icon) → **Upload**
2. Scroll to **Upload presets** section
3. Click **Add upload preset**
4. Configure:
   - **Name**: `ken_barbershop`
   - **Signing Mode**: `Unsigned` ← IMPORTANT
   - **Folder**: `kenbarbershop/banners`
5. Click **Save**

---

## Step 4: Update Config File

Open `static/js/cloudinary-config.js` and replace:

```javascript
const cloudinaryConfig = {
    cloudName: "YOUR_CLOUD_NAME",      // ← Paste from Dashboard
    uploadPreset: "ken_barbershop"    // ← Same as preset name
};
```

Example:
```javascript
const cloudinaryConfig = {
    cloudName: "dmxyz1234",
    uploadPreset: "ken_barbershop"
};
```

---

## Step 5: Test Upload

1. Open `admin.html` in browser
2. You should see "Cloudinary connected" status
3. Select an image and click upload
4. Banner will display on homepage after upload

---

## Usage

### Admin Upload
- Go to `/admin.html`
- Select image file
- Click "Nahrát Banner"
- Image uploads to Cloudinary, URL saved to localStorage

### View Banner
- Refresh homepage - banner loads from localStorage

### Change Banner
- Upload new image via admin
- Old URL replaced with new one

---

## Cost

| Plan | Storage | Bandwidth | Transformations |
|------|---------|----------|-----------------|
| Free | 25 GB | 25 GB/mo | 100/mo |
| Paid | $5+/mo | $0.1/GB | Unlimited |

For a small barbershop website, **free tier is sufficient**.

---

## Troubleshooting

### "Cloudinary not configured"
- Make sure `cloudinary-config.js` has real values
- Check `cloudName` matches exactly (case-sensitive)
- Make sure `uploadPreset` is `Unsigned`

### Upload fails
- Check browser console for errors
- Make sure upload preset exists and is `Unsigned`

### Image not showing
- Clear localStorage and re-upload
- Check if image URL is valid
