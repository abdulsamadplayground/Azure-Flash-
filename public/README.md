# Public Assets Folder

This folder contains your 3D models and videos that will be displayed in the viewer.

## 📁 Required Files

Place your files in this folder with these exact names:

### 1. `model.glb` (Required)
Your 3D model file in GLB format.

**Requirements:**
- Format: `.glb` (GLTF Binary)
- Recommended size: < 50MB for optimal loading
- Should include animations if you want them to play
- Supported features: Meshes, materials, textures, animations, skinned meshes

**How to get a GLB file:**
- Export from Blender: File → Export → glTF 2.0 (.glb)
- Export from Maya: Use glTF exporter plugin
- Export from 3ds Max: Use Babylon.js exporter
- Convert from other formats: Use online converters or Blender

### 2. `ModelAnimation.mp4` (Optional)
Video file that plays when animation button is clicked.

**Requirements:**
- Format: `.mp4`
- Recommended: H.264 codec for browser compatibility
- Recommended resolution: 1920x1080 or lower
- Recommended size: < 100MB

## 🚀 Quick Setup

1. **Add your model:**
   ```
   public/
   └── model.glb          ← Place your GLB file here
   ```

2. **Add your video (optional):**
   ```
   public/
   ├── model.glb
   └── ModelAnimation.mp4  ← Place your MP4 file here
   ```

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Encrypt before pushing to GitHub:**
   ```bash
   npm run encrypt-models
   ```

## 📝 File Naming

**Important:** Files must be named exactly as shown:
- ✅ `model.glb` (lowercase, no spaces)
- ✅ `ModelAnimation.mp4` (exact capitalization)
- ❌ `Model.glb` (wrong)
- ❌ `my-model.glb` (wrong)
- ❌ `animation.mp4` (wrong)

## 🔒 Security Notes

### These files are protected:
- `model.glb` and `ModelAnimation.mp4` are in `.gitignore`
- They will NOT be pushed to GitHub
- Only encrypted versions will be in your repository

### Before pushing to GitHub:
1. Run `npm run encrypt-models`
2. This creates encrypted versions in `encrypted/` folder
3. Only encrypted files go to GitHub
4. Original files stay on your computer

## 🎨 Model Requirements

### Supported Features:
- ✅ Static meshes
- ✅ Animated meshes (skeletal animation)
- ✅ Materials (PBR, Standard)
- ✅ Textures (embedded or external)
- ✅ Multiple animations
- ✅ Skinned meshes
- ✅ Morph targets

### Optimization Tips:
- Keep polygon count reasonable (< 100k triangles)
- Compress textures (use 2K or lower resolution)
- Use Draco compression for smaller file size
- Remove unused materials and textures
- Combine meshes when possible

## 🎬 Animation Setup

If your model has animations:
1. The first animation in the GLB file will play automatically
2. Animation plays when user clicks "Play Animation" button
3. Video (if present) plays simultaneously with 3D animation

### Multiple Animations:
If your model has multiple animations, only the first one will play. To use a different animation, you'll need to modify `src/AnimationControls.jsx`.

## 🛠️ Troubleshooting

### Model not loading?
- Check file name is exactly `model.glb`
- Verify file is valid GLB format
- Check browser console for errors
- Try opening GLB in online viewer first

### Model appears black/wrong colors?
- Check if textures are embedded in GLB
- Verify materials are using supported types
- Try re-exporting with embedded textures

### Model is too big/small?
- Adjust scale in your 3D software before export
- Or modify camera position in `src/App.jsx`

### Animation not playing?
- Verify GLB contains animations
- Check animation names in browser console
- Ensure animations are properly rigged

### Video not playing?
- Check file name is exactly `ModelAnimation.mp4`
- Verify MP4 is H.264 encoded
- Check file size (< 100MB recommended)

## 📦 Example File Structure

```
public/
├── README.md              ← This file
├── model.glb              ← Your 3D model (NOT in Git)
├── ModelAnimation.mp4     ← Your video (NOT in Git)
└── Model.jsx              ← Auto-generated model component
```

## 🔄 Updating Your Model

To replace the model:

1. **Replace the file:**
   ```bash
   # Delete old model
   rm public/model.glb
   
   # Add new model
   cp /path/to/new-model.glb public/model.glb
   ```

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Re-encrypt:**
   ```bash
   npm run encrypt-models
   ```

4. **Commit and push:**
   ```bash
   git add encrypted/
   git commit -m "Update 3D model"
   git push
   ```

## 🎯 Model Positioning

The camera is positioned to center on coordinates `[-62, 5, 25]` by default. If your model appears off-center:

### Option 1: Adjust in 3D Software
- Center your model at origin (0, 0, 0) before export
- Or position at [-62, 5, 25] in your 3D software

### Option 2: Adjust Camera in Code
Edit `src/App.jsx`:
```javascript
const initialCameraPosition = [x, y, z];  // Camera position
const initialCameraTarget = [x, y, z];    // Where camera looks
```

## 📚 Additional Resources

- [glTF Format Specification](https://www.khronos.org/gltf/)
- [Three.js GLTFLoader Documentation](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [Blender glTF Export Guide](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

## 💡 Tips

1. **Test your GLB first** - Use online viewers like [gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/)
2. **Optimize before export** - Reduce file size for faster loading
3. **Use Draco compression** - Can reduce file size by 90%
4. **Embed textures** - Easier to manage single file
5. **Name animations clearly** - Makes debugging easier

## 🆘 Need Help?

- Check the main `README.md` in project root
- See `SECURITY_SETUP.md` for encryption details
- See `QUICK_START.md` for setup guide
- Check browser console for error messages

---

**Remember:** Always run `npm run encrypt-models` before pushing to GitHub!
