# Secure 3D Model Deployment

A secure web-based 3D model viewer with React Three Fiber that displays GLB models and MP4 videos. Features interactive navigation, synchronized animations, and optional encryption for protecting your assets.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Model Files
Place your files in the `public/` folder:
- `public/model.glb` - Your 3D model
- `public/ModelAnimation.mp4` - Your animation video (optional)

### 3. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:5173

## 📁 Project Structure

```
.
├── public/                 # Static assets
│   ├── model.glb          # ❌ NOT in Git (your 3D model)
│   ├── ModelAnimation.mp4 # ❌ NOT in Git (your video)
│   ├── Model.jsx          # Auto-generated model component
│   └── README.md          # Guide for adding models
├── src/                   # React frontend source
│   ├── App.jsx            # Main app with 3D canvas
│   ├── Index.jsx          # Entry point
│   ├── Model.jsx          # 3D model component
│   ├── AnimationControls.jsx  # Play/stop controls
│   ├── VirtualKeypad.jsx  # Keyboard navigation UI
│   ├── secureModelLoader.js   # Secure API client (optional)
│   └── styles.css         # Global styles
├── .kiro/                 # Kiro specs and documentation
│   └── specs/             # Project specifications
├── server/                # Backend API (optional - for encryption)
│   ├── server.js          # Express server with auth
│   └── modelEncryption.js # Encryption utilities
├── scripts/               # Utility scripts (optional)
│   └── encryptModels.js   # Model encryption script
├── encrypted/             # Encrypted files (optional)
│   ├── model.glb.enc      # ✅ Safe for Git
│   └── ModelAnimation.mp4.enc # ✅ Safe for Git
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

### Key Files

- [`src/App.jsx`](src/App.jsx) - Main application component with 3D canvas setup, camera configuration, and scene lighting
- [`src/Model.jsx`](src/Model.jsx) - 3D model loader using GLTF/GLB format with animation support
- [`src/AnimationControls.jsx`](src/AnimationControls.jsx) - UI controls for playing/stopping animations and video
- [`src/VirtualKeypad.jsx`](src/VirtualKeypad.jsx) - Keyboard navigation controls and instructions overlay
- [`src/Index.jsx`](src/Index.jsx) - Application entry point that mounts React to DOM
- [`src/styles.css`](src/styles.css) - Global styles including animations and button effects
- [`public/README.md`](public/README.md) - Detailed guide for adding and managing 3D models
- [`package.json`](package.json) - Project dependencies and npm scripts
- [`vite.config.ts`](vite.config.ts) - Vite bundler configuration
- [`.gitignore`](.gitignore) - Files excluded from version control

## 🎮 Features

### 3D Viewer
- Interactive 3D model viewing with React Three Fiber
- Smooth camera controls with OrbitControls
- Keyboard navigation (WASD, Arrow keys, Q/E)
- Mouse drag to rotate, scroll to zoom
- Reset camera button
- Loading screen with progress indicator

### Animation System
- Synchronized 3D animation and video playback
- Play/Stop controls
- Video popup modal
- Auto-stop when video ends
- Replay functionality

### Security (Optional Setup)
- Encrypted model storage
- JWT-based authentication
- Protected API endpoints
- No direct file access
- Original files excluded from Git

## 🎯 Navigation Controls

- **WASD / Arrow Keys** - Move camera forward/back/left/right
- **Q / E** - Move camera up/down
- **Mouse Drag** - Rotate view around model
- **Mouse Scroll** - Zoom in/out
- **Reset Button** - Return to initial centered view

## 📦 Available Scripts

### Development
```bash
npm run dev              # Start development server (Vite)
npm run build            # Build for production
npm run preview          # Preview production build
```

### Testing
```bash
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
```

### Code Quality
```bash
npm run lint             # Lint code
npm run lint:fix         # Lint and fix issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

### Optional Security Scripts (if using encryption)
```bash
npm run encrypt-models   # Encrypt your models
npm run server           # Start backend API server
npm run dev:full         # Run both frontend & backend
```

## 🎨 Adding Your Own Model

### Step 1: Prepare Your Model
- Export as `.glb` format from Blender, Maya, or 3ds Max
- Recommended size: < 50MB for optimal loading
- Include animations if desired

### Step 2: Add to Project
```bash
# Copy your model to public folder
cp /path/to/your-model.glb public/model.glb

# Optional: Add animation video
cp /path/to/your-video.mp4 public/ModelAnimation.mp4
```

### Step 3: Test
```bash
npm run dev
```

### Step 4: Adjust Camera (if needed)
If your model appears off-center, edit [`src/App.jsx`](src/App.jsx):
```javascript
// Adjust these values to center your model
const initialCameraPosition = [-62, 10, 45];  // Camera position
const initialCameraTarget = [-62, 5, 25];     // Where camera looks
```

**See [`public/README.md`](public/README.md) for detailed model requirements and troubleshooting.**

## 🔐 Security Setup (Optional)

If you want to protect your models from being downloaded from GitHub:

### 1. Create Server Files
Create `server/` and `scripts/` folders with encryption utilities:
- See [SECURITY_SETUP.md](SECURITY_SETUP.md) for complete setup
- Or use the provided server files if available

### 2. Encrypt Models
```bash
npm run encrypt-models
```
Save the encryption key displayed!

### 3. Configure Environment
```bash
cp .env.example .env
# Add your encryption key to .env
```

### 4. Push to GitHub
```bash
git add .
git commit -m "Add secure 3D model viewer"
git push
```

Only encrypted files will be pushed. Original models stay local.

**See [SECURITY_SETUP.md](SECURITY_SETUP.md) for complete security documentation.**

## 🚢 Deployment

### Simple Deployment (No Encryption)
Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
# Upload dist/ folder to your host
```

**Note:** Model files will be publicly accessible with this method.

### Secure Deployment (With Encryption)
1. Set up backend server (see [SECURITY_SETUP.md](SECURITY_SETUP.md))
2. Deploy frontend to Vercel/Netlify
3. Deploy backend to Node.js host (Heroku, Railway, Render)
4. Set environment variables on hosting platform

## 🛡️ What's Protected by Default

✅ **Already Protected (in [`.gitignore`](.gitignore)):**
- `public/model.glb` - Your 3D model
- `public/ModelAnimation.mp4` - Your video
- `.env` - Environment variables
- `node_modules/` - Dependencies

❌ **Not Protected (public in repo):**
- Source code ([`src/`](src/))
- Configuration files ([`package.json`](package.json), [`vite.config.ts`](vite.config.ts))
- Documentation

## 🔧 Technology Stack

- **Frontend**: React 19, Three.js, React Three Fiber, Vite
- **3D Libraries**: Three.js, @react-three/fiber, @react-three/drei
- **Backend** (optional): Express, Node.js, JWT
- **Security** (optional): AES-256-CBC encryption
- **Testing**: Vitest
- **Code Quality**: ESLint, Prettier, TypeScript

## 📚 Documentation Files

- [**README.md**](README.md) (this file) - Main project documentation
- [**public/README.md**](public/README.md) - Guide for adding and managing models
- [**QUICK_START.md**](QUICK_START.md) - Fast 3-step setup guide (if available)
- [**SECURITY_SETUP.md**](SECURITY_SETUP.md) - Detailed security and encryption guide (if available)
- [**GITHUB_PUSH_CHECKLIST.md**](GITHUB_PUSH_CHECKLIST.md) - Pre-push verification checklist (if available)
- [**.env.example**](.env.example) - Environment variable template (if using encryption)

## 🎯 Common Tasks

### Change the Model
```bash
# Replace the model file
cp /path/to/new-model.glb public/model.glb

# Restart dev server
npm run dev
```

### Adjust Camera Position
Edit [`src/App.jsx`](src/App.jsx) and modify:
```javascript
const initialCameraPosition = [x, y, z];
const initialCameraTarget = [x, y, z];
```

### Change Animation Behavior
Edit [`src/AnimationControls.jsx`](src/AnimationControls.jsx) to customize play/stop behavior

### Customize Navigation
Edit [`src/VirtualKeypad.jsx`](src/VirtualKeypad.jsx) to change keyboard controls

### Style Changes
Edit [`src/styles.css`](src/styles.css) for global styles or inline styles in components

## ⚠️ Important Notes

1. **Model files are gitignored** - They won't be pushed to GitHub by default
2. **File naming matters** - Must be exactly `model.glb` and `ModelAnimation.mp4`
3. **Camera positioning** - Adjust if your model appears off-center
4. **File size** - Keep models under 50MB for best performance
5. **Browser compatibility** - Requires WebGL support

## 🐛 Troubleshooting

### Model not loading?
- Check file is named exactly `model.glb`
- Verify GLB format is valid
- Check browser console for errors
- Try opening GLB in online viewer first: [gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/)

### Model appears black?
- Ensure textures are embedded in GLB
- Check lighting in [`src/App.jsx`](src/App.jsx)
- Verify materials are supported

### Model too big/small?
- Adjust scale in 3D software before export
- Or modify camera position in code

### Animation not playing?
- Verify GLB contains animations
- Check browser console for animation names
- Ensure animations are properly rigged

### Video not playing?
- Check file is named exactly `ModelAnimation.mp4`
- Verify H.264 encoding
- Check file size (< 100MB recommended)

### Loading screen stuck?
- Check browser console for errors
- Verify model file exists and is valid
- Try with a smaller test model

## 📖 Additional Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [glTF Format Specification](https://www.khronos.org/gltf/)
- [Vite Documentation](https://vitejs.dev/)
- [Blender glTF Export Guide](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please ensure:
- Code follows ESLint/Prettier rules
- Tests pass before submitting PR
- Documentation is updated

## 💡 Tips

1. **Optimize models** - Use Draco compression for smaller files
2. **Test locally first** - Always test before deploying
3. **Use version control** - Commit working versions
4. **Keep backups** - Save original model files separately
5. **Monitor performance** - Check FPS with large models
6. **Validate GLB files** - Use [glTF Validator](https://github.khronos.org/glTF-Validator/) before adding

---

**Need Help?** Check [`public/README.md`](public/README.md) for model-specific guidance or open an issue on GitHub.

## 🔗 Quick Links

### Core Components
- [Main App Component](src/App.jsx) - Canvas setup and scene configuration
- [Model Loader](src/Model.jsx) - GLB/GLTF model loading and rendering
- [Animation Controls](src/AnimationControls.jsx) - Play/stop UI and video sync
- [Keyboard Navigation](src/VirtualKeypad.jsx) - WASD controls and instructions

### Configuration
- [Package Configuration](package.json) - Dependencies and scripts
- [Vite Config](vite.config.ts) - Build and dev server settings
- [TypeScript Config](tsconfig.json) - TypeScript compiler options
- [Git Ignore](.gitignore) - Protected files list

### Documentation
- [Model Guide](public/README.md) - How to add and manage 3D models
- [Quick Start](QUICK_START.md) - Fast setup guide
- [Security Setup](SECURITY_SETUP.md) - Encryption and protection
- [Push Checklist](GITHUB_PUSH_CHECKLIST.md) - Pre-commit verification

### Styling
- [Global Styles](src/styles.css) - CSS animations and effects
- [Entry Point](src/Index.jsx) - React mounting and initialization
- [HTML Template](index.html) - Base HTML structure
