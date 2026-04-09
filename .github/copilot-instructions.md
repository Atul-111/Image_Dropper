# Image Dropper Project Setup

## Project Overview
Image Dropper is a full-stack web application for sharing images via unique URLs with drag-and-drop functionality.

## Checklist

- [x] Verify copilot-instructions.md in .github directory exists
- [x] Project Requirements Clarified
- [x] Backend Server (Express.js)
  - Image upload with validation
  - Unique ID generation (UUID)
  - File storage
  - API endpoints for upload, download, and sharing
- [x] Frontend UI
  - Home page with drag-and-drop upload
  - Share page for viewing images
  - Error page (404)
  - Responsive design with dark theme
  - Progress tracking
  - Social sharing features
- [x] Project Structure Created
- [x] Dependencies: express, multer, uuid, cors, dotenv, nodemon
- [x] Configuration files: .env, .gitignore
- [x] Documentation: README.md

## Next Steps

1. **Install Dependencies**: Run `npm install` to install all required packages
2. **Start Server**: Run `npm start` to start the application
3. **Test Upload**: Visit `http://localhost:3000` and test image upload
4. **Share Image**: Copy share URL and test sharing feature
5. **Development**: Use `npm run dev` for development with hot-reload

## Key Features Implemented

✅ Drag-and-drop image upload
✅ Unique shareable URLs
✅ Download functionality
✅ Responsive design
✅ Progress tracking
✅ Social media sharing
✅ Error handling
✅ File validation
✅ Size limits (50MB)
✅ Multiple image format support

## Running the Project

```bash
# Install dependencies
npm install

# Start production server
npm start

# Start development server (with auto-reload)
npm run dev
```

Server runs on `http://localhost:3000`

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Uploads Directory

Images are stored in the `uploads/` directory (auto-created on first run).

---

**Status**: ✅ Project Setup Complete - Ready for Installation
