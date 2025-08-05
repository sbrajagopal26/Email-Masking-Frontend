import React, { useState } from 'react';
import axios from 'axios';

const EmailMasker = () => {
  const [realEmail, setRealEmail] = useState('');
  const [plan, setPlan] = useState('free');
  const [maskedEmail, setMaskedEmail] = useState('');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('https://email-masking-backend.onrender.com', {
        realEmail,
        plan
      });
      setMaskedEmail(response.data.maskedEmail);
    } catch (error) {
      alert('Error generating masked email');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Your Real Email"
        value={realEmail}
        onChange={(e) => setRealEmail(e.target.value)}
      />
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="free">Free (24hrs)</option>
        <option value="premium">Premium (7 days)</option>
      </select>
      <button onClick={handleGenerate}>Generate Masked Email</button>

      {maskedEmail && (
        <div>
          <h3>Your Masked Email:</h3>
          <p>{maskedEmail}</p>
          <button onClick={() => navigator.clipboard.writeText(maskedEmail)}>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailMasker;
