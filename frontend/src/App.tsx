import { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const shortUrl = async () => {
    try {
      const response = await axios.post('http://localhost:8000/links', {url: originalUrl});
      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div>
      <h1>Shorten your link</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={shortUrl}>Shorten</button>
      {shortenedUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={`http://localhost:8000/${shortenedUrl}`} target="_blank">
            {`http://localhost:8000/${shortenedUrl}`}
          </a>
        </div>
      )}
    </div>
  );
}


export default App;
