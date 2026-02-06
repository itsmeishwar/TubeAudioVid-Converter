import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url || !format) {
      setError('Please enter a URL and select a format');
      return;
    }

    setLoading(true);
    setError('');
    setDownloadInfo(null);

    try {
      const response = await axios.post('http://localhost:3001/convert', {
        url,
        format
      });

      setDownloadInfo(response.data);
      
      // Poll for file readiness
      const checkStatus = async () => {
        try {
          const statusResponse = await axios.get(`http://localhost:3001/status/${response.data.fileId}`);
          const isReady = format === 'mp3' ? statusResponse.data.audioReady : statusResponse.data.videoReady;
          
          if (isReady) {
            setLoading(false);
          } else {
            setTimeout(checkStatus, 2000);
          }
        } catch (err) {
          console.error('Status check error:', err);
          setLoading(false);
          setError('Failed to check conversion status');
        }
      };

      checkStatus();
    } catch (err) {
      console.error('Conversion error:', err);
      setLoading(false);
      setError(err.response?.data?.error || 'Failed to process video');
    }
  };

  const handleDownload = () => {
    if (downloadInfo) {
      window.open(`http://localhost:3001${downloadInfo.downloadUrl}`, '_blank');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TubeAudioVid Converter</h1>
        <p>Convert YouTube videos to MP4 or MP3</p>
        
        <form onSubmit={handleSubmit} className="converter-form">
          <div className="input-group">
            <input
              type="url"
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="url-input"
              required
            />
          </div>

          <div className="format-buttons">
            <button
              type="button"
              onClick={() => setFormat('mp4')}
              className={`format-btn ${format === 'mp4' ? 'active' : ''}`}
            >
              MP4 (Video)
            </button>
            <button
              type="button"
              onClick={() => setFormat('mp3')}
              className={`format-btn ${format === 'mp3' ? 'active' : ''}`}
            >
              MP3 (Audio)
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !url || !format}
            className="convert-btn"
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {loading && (
          <div className="progress">
            <div className="spinner"></div>
            <p>Converting your video... This may take a few minutes.</p>
          </div>
        )}

        {downloadInfo && !loading && (
          <div className="download-section">
            <h3>Ready to download!</h3>
            <p>
              <strong>Title:</strong> {downloadInfo.title}
            </p>
            <p>
              <strong>Format:</strong> {downloadInfo.format.toUpperCase()}
            </p>
            <button onClick={handleDownload} className="download-btn">
              Download {downloadInfo.format.toUpperCase()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;