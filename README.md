# Image Dropper 📸

A modern, easy-to-use web application for sharing images instantly with shareable links. Similar to MashupStack.io, but simple and straightforward.

## Features ✨

- **Drag & Drop Upload**: Simply drag and drop images or click to select
- **Instant Share Links**: Get unique URLs for each uploaded image
- **Download & Copy**: Users can easily download or copy images from shared links
- **File Info**: Display file name, size, and upload date
- **Social Sharing**: Share images on Twitter, Facebook, and LinkedIn
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Beautiful dark theme with smooth animations
- **Large File Support**: Support for images up to 50MB
- **Multiple Formats**: JPG, PNG, GIF, WebP supported

## Tech Stack 🛠️

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **File Handling**: Multer
- **File Storage**: Local filesystem (can be upgraded to cloud storage)

## Installation 🚀

### Requirements
- Node.js (v14 or higher)
- npm

### Setup

1. Navigate to the project directory:
```bash
cd Image_Dropper
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

## Project Structure 📁

```
Image_Dropper/
├── public/               # Frontend files
│   ├── index.html       # Home page
│   ├── share.html       # Share page template
│   ├── 404.html         # Error page
│   ├── styles.css       # Styles
│   ├── script.js        # Upload page logic
│   └── share-script.js  # Share page logic
├── uploads/             # Uploaded images (auto-created)
├── server.js            # Express server
├── package.json         # Dependencies
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## API Endpoints 📡

### Upload Image
- **POST** `/api/upload`
- **File**: image (multipart/form-data)
- **Response**: JSON with shareUrl, downloadUrl, and imageUrl

### Get Image
- **GET** `/download/:id`
- **Description**: Download image file

### Share Page
- **GET** `/share/:id`
- **Description**: View shared image page

### Get Image Data
- **GET** `/api/image/:id`
- **Description**: Get image as base64 with metadata

### Get Image Info
- **GET** `/api/image-info/:id`
- **Description**: Get image metadata without image data

### Health Check
- **GET** `/api/health`
- **Description**: Server health check

## Usage Guide 👤

### For Image Uploaders:

1. Visit `http://localhost:3000`
2. Drag and drop an image or click to select
3. Wait for upload to complete
4. Copy the share URL or download URL
5. Share the URL with others

### For Image Viewers:

1. Open the shared URL (e.g., `http://localhost:3000/share/unique-id`)
2. View the image and its details
3. Download the original image
4. Copy the image URL
5. Share on social media

## Configuration 🔧

Edit `.env` file to configure:

```
PORT=3000
NODE_ENV=development
```

## Future Enhancements 🚀

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Image expiration dates
- [ ] Download count tracking
- [ ] QR code generation
- [ ] Cloud storage (AWS S3, Google Cloud)
- [ ] Image editing features
- [ ] Password protection for images
- [ ] Admin dashboard
- [ ] Analytics

## File Size Limits 📦

- Maximum file size: 50MB
- Supported formats: JPG, PNG, GIF, WebP

## Troubleshooting 🐛

### Port Already in Use
If port 3000 is already in use:
```bash
# Change PORT in .env file
PORT=3001
```

### Image Upload Fails
- Check file format (must be an image)
- Ensure file size is under 50MB
- Check server storage space

### Images Not Displaying
- Verify server is running
- Check if uploads folder exists
- Clear browser cache

## License 📄

MIT License - Feel free to modify and use this project

## Support 💬

For issues or feature requests, please create an issue or contribute to the project.

---

**Made with ❤️ - Image Dropper 📸**
