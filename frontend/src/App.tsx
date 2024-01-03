// FileUpload.tsx

import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<AxiosResponse | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData);
        setApiResponse(response);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDownload = () => {
    if (apiResponse) {
      const blob = new Blob([JSON.stringify(apiResponse.data)], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'api-response.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="center-container">
      <div className="center-content">
        <input type="file" accept=".log" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleDownload} disabled={!apiResponse}>
          Download API Response
        </button>
        {apiResponse && (
          <div>
            <h3>API Response:</h3>
            <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
