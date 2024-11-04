import React, { useState } from 'react';
import axios from 'axios';

const UploadGedcom = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('gedcomFile', file);

    try {
      const response = await axios.post('/api/family/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      onUploadSuccess(); // Notify parent component to refresh the family tree data
    } catch (error) {
      console.error("Error uploading GEDCOM file:", error);
      setMessage("Failed to upload GEDCOM file.");
    }
  };

  return (
    <div className="upload-gedcom">
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".ged" onChange={handleFileChange} />
        <button type="submit">Upload GEDCOM File</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadGedcom;
