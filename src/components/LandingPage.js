import React, { useState } from "react";

const features = [
  {
    title: "Temporary Masked Emails",
    desc: "Generate emails that expire after a chosen time — no spam, no tracking.",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 1v22M1 12h22" />
      </svg>
    )
  },
  {
    title: "Choose Your Plan",
    desc: "Free (24 hours) or Premium (7 days) masking to suit your needs.",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  },
  {
    title: "Secure & Private",
    desc: "We never store your real email or forward messages unencrypted.",
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 11c1.38 0 2.5 1.12 2.5 2.5S13.38 16 12 16s-2.5-1.12-2.5-2.5S10.62 11 12 11z" />
        <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" />
      </svg>
    )
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    duration: "24 hours",
    features: [
      "Generate masked email",
      "Expires after 24 hours",
      "Basic support"
    ]
  },
  {
    name: "Premium",
    price: "$9.99",
    duration: "7 days",
    features: [
      "Generate masked email",
      "Expires after 7 days",
      "Priority support",
      "Custom domain (coming soon)"
    ]
  }
];

export default function LandingPage() {
  const [realEmail, setRealEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState(null);
  const [error, setError] = useState(null);

 async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setMaskedEmail(null);
  setError(null);

  try {
    console.log("Sending request to:", "https://email-masking-backend.onrender.com/api/generate");
    console.log("With data:", { realEmail, plan });
    
    const res = await fetch("https://email-masking-backend.onrender.com/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ realEmail, plan })
    });

    console.log("Response status:", res.status);
    console.log("Response headers:", res.headers);
    
    // Get the raw response text first
    const responseText = await res.text();
    console.log("Raw response:", responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}...`);
    }

    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}: ${data.message || 'Unknown error'}`);

    setMaskedEmail(data.maskedEmail);
  } catch (err) {
    console.error("Full error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-indigo-700 text-3xl font-bold cursor-default">MaskMail</h1>
        <a href="#generate" className="text-indigo-600 font-semibold hover:text-indigo-800 transition">Get Started</a>
      </nav>

      {/* Hero + Form */}
      <header className="max-w-4xl mx-auto text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold text-indigo-700 mb-6">
          Protect Your Inbox with Temporary Masked Emails
        </h2>
        <p className="text-indigo-600 text-lg max-w-xl mx-auto mb-10">
          Generate disposable emails that forward to your real inbox, keeping your personal email safe and spam-free.
        </p>

        {/* Form */}
        <form
          id="generate"
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-left"
        >
          <label className="block mb-2 font-semibold text-indigo-700">Your Real Email</label>
          <input
            type="email"
            required
            value={realEmail}
            onChange={(e) => setRealEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full p-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
          />

          <label className="block mb-2 font-semibold text-indigo-700">Choose Plan</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-3 border border-indigo-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="free">Free (24 hours)</option>
            <option value="premium">Premium (7 days)</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Masked Email"}
          </button>

          {/* Result/Error */}
          {maskedEmail && (
            <p className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg break-all">
              Your masked email is: <strong>{maskedEmail}</strong>
            </p>
          )}
          {error && (
            <p className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</p>
          )}
        </form>

        {/* Main CTA button (optional, can be removed if form is primary CTA) */}
        {/* <a
          href="#generate"
          className="inline-block mt-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition"
        >
          Generate Masked Email
        </a> */}
      </header>

      {/* Features */}
      <section className="bg-indigo-100 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {features.map(({ title, desc, icon }) => (
            <div key={title} className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center text-center">
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
              <p className="text-indigo-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto py-20 px-6" id="pricing">
        <h2 className="text-center text-4xl font-extrabold text-indigo-700 mb-12">Pricing Plans</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {pricingPlans.map(({ name, price, duration, features }) => (
            <div key={name} className="bg-white rounded-xl shadow-lg p-8 flex flex-col">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">{name}</h3>
              <p className="text-indigo-700 text-4xl font-extrabold mb-1">{price}</p>
              <p className="text-indigo-500 mb-6">Valid for {duration}</p>
              <ul className="mb-8 space-y-2 flex-1">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center text-indigo-700">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                onClick={() => alert(`Select ${name} plan`)}
              >
                Choose {name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-300 py-6 text-center text-sm select-none">
        &copy; 2025 MaskMail. All rights reserved.
      </footer>
    </div>
  );
}
