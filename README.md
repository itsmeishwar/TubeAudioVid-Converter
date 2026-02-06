# TubeAudioVid Converter

A web application that allows users to convert YouTube videos to MP4 (video) or MP3 (audio) format.

## Features

- Convert YouTube videos to MP4 or MP3
- Clean, responsive user interface
- Progress tracking during conversion
- Automatic file cleanup (24 hours)
- Real-time conversion status

## Technology Stack

### Frontend
- React
- CSS (with modern styling)
- Axios (for API communication)

### Backend
- Node.js + Express
- ytdl-core (YouTube downloading)
- fluent-ffmpeg (audio conversion)
- UUID (unique file naming)

## Project Structure

```
tubeaudiovid-converter/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── downloads/         # Temporary file storage
└── frontend/
    ├── src/
    │   ├── App.js         # Main React component
    │   └── App.css        # Styling
    └── package.json       # Frontend dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- FFmpeg (required for audio conversion)

### Install FFmpeg
**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html

### Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on port 3001.

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on port 3000.

## Usage

1. Open the application in your browser (http://localhost:3000)
2. Paste a YouTube URL into the input field
3. Select either MP4 (video) or MP3 (audio) format
4. Click "Convert"
5. Wait for the conversion to complete
6. Click the download button when ready

## API Endpoints

- `POST /convert` - Start conversion process
  - Body: `{ url: "youtube_url", format: "mp3|mp4" }`
  
- `GET /status/:fileId` - Check conversion status
  - Returns: `{ videoReady: boolean, audioReady: boolean }`
  
- `GET /download/:filename` - Download converted file

## File Management

- Files are stored temporarily in `/backend/downloads/`
- Each file gets a unique UUID name to prevent conflicts
- Files are automatically deleted after 24 hours
- Manual cleanup is handled via error scenarios

## Security Notes

- Input validation for YouTube URLs
- File access restrictions
- Automatic cleanup prevents disk space issues
- CORS enabled for frontend-backend communication

## Troubleshooting

1. **FFmpeg not found**: Ensure FFmpeg is installed and in your system PATH
2. **Conversion fails**: Check YouTube URL validity and network connection
3. **Download issues**: Verify file exists in downloads directory
4. **CORS errors**: Ensure backend is running and CORS is properly configured

## Development

To run both servers simultaneously:
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend  
cd frontend && npm start
```

## License

MIT License