# Quick Deployment Guide - Fit Mental Audio Labeling

## 🚀 What You Need to Do

### 1️⃣ Deploy Firebase Storage Rules (REQUIRED)

#### Option A: Using Firebase Console (Easiest)
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select project: **fit-mental**
3. Click **Storage** in left sidebar
4. Click **Rules** tab at the top
5. **BACKUP**: Copy existing rules to a text file first!
6. Open `firebase-storage-rules.txt` from parent folder
7. Copy ALL contents from the file
8. Paste into Firebase Console rules editor
9. Click **Publish** button
10. ✅ Done!

#### Option B: Using Firebase CLI
```bash
cd "/Users/tonomurrieta/Desktop/Life Changing Knowledge/Fit Mental/Fit-Mental-Landing"
# Copy the rules file from parent
cp ../firebase-storage-rules.txt storage.rules
# Deploy
firebase deploy --only storage
```

---

### 2️⃣ Test the Admin Panel

1. Open `admin.html` in your browser
2. Login with admin credentials
3. Go to any week
4. Click "Seleccionar archivos de audio" under "🎵 Meditaciones"
5. Select an audio file (MP3, WAV, or M4A)
6. **Modal should appear** asking you to label the audio
7. Select: Guided Meditation, Hypnosis, or Audio
8. Click "Guardar"
9. Audio uploads with the label ✅

---

### 3️⃣ Edit Existing Audio Labels (Optional)

If you have already uploaded audios:
1. Find the audio in the admin panel
2. Click **"✏️ Editar"** button
3. Select the correct label
4. Click "Guardar"
5. Label updated ✅

---

## 🔍 Quick Verification Checklist

- [ ] Firebase Storage rules deployed successfully
- [ ] Admin panel opens without errors
- [ ] Modal appears when uploading audio
- [ ] Audio uploads with selected label
- [ ] Label badge displays correctly
- [ ] Edit button works on existing audios
- [ ] Students can stream but not download audios

---

## 🆘 Common Issues

### Issue: "Permission Denied" when uploading
**Fix**: Deploy the Firebase Storage rules (Step 1)

### Issue: Modal doesn't appear when uploading
**Fix**: Clear browser cache and refresh admin.html

### Issue: Old audios don't show labels
**Fix**: This is normal - use "✏️ Editar" button to add labels to old files

### Issue: Can't see uploaded files
**Fix**:
- Check Firebase Console > Storage to verify files uploaded
- Verify storage path is `Curso-Fit-Mental/meditations/week{N}/`

---

## 📂 New File Storage Paths

Your files will now be stored at:
```
gs://fit-mental.firebasestorage.app/Curso-Fit-Mental/
```

**Documents**: `Curso-Fit-Mental/documents/week1/`, `week2/`, etc.
**Meditations**: `Curso-Fit-Mental/meditations/week1/`, `week2/`, etc.

Old paths (`documents/`, `meditations/`) still work for backward compatibility.

---

## 🎯 What This Gives You

✅ Organized audio categorization
✅ Visual badges showing audio types
✅ Easy editing of labels
✅ Secure admin-only uploads
✅ Student streaming access
✅ App user personal meditations remain separate

---

## 📞 Need Help?

1. Check browser console (F12) for errors
2. Check Firebase Console > Storage > Files to see if uploads succeeded
3. Verify your admin user has `role: 'admin'` in Firestore `users` collection

---

**Total Time Required**: ~5 minutes to deploy rules and test

Good luck! 🚀
