import React, { useState } from "react";
import axios from "axios";

const EmailMasker = () => {
  const [realEmail, setRealEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setLoading(true);
    setMaskedEmail("");
    try {
      const response = await axios.post(
        "https://email-masking-backend.onrender.com/api/generate",
        { realEmail, plan }
      );
      setMaskedEmail(response.data.maskedEmail);
    } catch {
      setError("Failed to generate masked email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center px-4 py-12">
      {/* Header */}
      <header className="max-w-xl w-full text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          Protect Your Email with Masked Addresses
        </h1>
        <p className="text-lg text-indigo-600/80">
          Generate temporary masked emails to keep your inbox private and spam-free.
        </p>
      </header>

      {/* Main form container */}
      <main className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <label className="block text-indigo-800 font-semibold mb-2" htmlFor="realEmail">
          Your Real Email
        </label>
        <input
          id="realEmail"
          type="email"
          placeholder="e.g. john@example.com"
          value={realEmail}
          onChange={(e) => setRealEmail(e.target.value)}
          className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 transition"
          required
        />

        <label className="block text-indigo-800 font-semibold mb-2" htmlFor="plan">
          Select Plan
        </label>
        <select
          id="plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full px-4 py-3 border border-indigo-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="free">Free - Mask expires in 24 hours</option>
          <option value="premium">Premium - Mask expires in 7 days</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading || !realEmail}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading || !realEmail
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Masked Email"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        {/* Masked Email Result */}
        {maskedEmail && (
          <div className="mt-8 p-5 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
            <h2 className="text-indigo-700 font-semibold mb-2">Your Masked Email</h2>
            <p className="text-indigo-900 font-mono text-lg break-words">{maskedEmail}</p>
            <button
              onClick={() => navigator.clipboard.writeText(maskedEmail)}
              className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-indigo-400 text-sm select-none">
        &copy; 2025 YourCompany. All rights reserved.
      </footer>
    </div>
  );
};

export default EmailMasker;
