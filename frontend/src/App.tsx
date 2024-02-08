import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const shortUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/links', {url: originalUrl});
      setShortenedUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <h1>Shorten your link</h1>
      <form className="input-group mb-3 container-fluid" onSubmit={shortUrl}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">Shorten!</button>
      </form>
      {shortenedUrl && (
        <div className="d-flex flex-column align-items-center">
          <h3>Your link now looks like this</h3>
          <a href={`http://localhost:8000/links/${shortenedUrl}`} target="_blank">
            {`http://localhost:8000/links/${shortenedUrl}`}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
