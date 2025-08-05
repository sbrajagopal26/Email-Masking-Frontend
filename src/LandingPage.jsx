import { useState } from "react";
import axios from "axios";

import EmailMasker from "./components/EmailMasker";
function LandingPage() {
  return (
    <div>
      {/* Your landing page content */}
      <EmailMasker />
    </div>
  );
}

export default LandingPage;
export default function LandingPage() {
  const [realEmail, setRealEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [maskedEmail, setMaskedEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMaskedEmail(null);

    try {
      const res = await axios.post("https://email-masking-backend.onrender.com/api/generate", {
        realEmail,
        plan,
      });
      setMaskedEmail(res.data.maskedEmail);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">MaskMail</h1>
          <div>
            <a href="#pricing" className="text-indigo-600 hover:underline mr-6">Pricing</a>
            <a href="#features" className="text-indigo-600 hover:underline">Features</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="flex-grow flex flex-col justify-center items-center px-6 text-center py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 max-w-4xl">
          Protect Your Email Privacy with <span className="text-indigo-600">Masked Emails</span>
        </h2>
        <p className="mt-6 text-lg text-gray-700 max-w-xl">
          Generate disposable masked emails that forward messages to your real inbox, keeping you safe from spam and tracking.
        </p>

        {/* Email Masking Form */}
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <label htmlFor="email" className="block text-left font-semibold text-gray-700">
            Enter your real email
          </label>
          <input
            id="email"
            type="email"
            required
            value={realEmail}
            onChange={(e) => setRealEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="block mt-6 font-semibold text-gray-700">
            Choose Plan
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="free">Free (24 hrs lifespan)</option>
            <option value="premium">Premium (7 days lifespan)</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold rounded-md transition"
          >
            {loading ? "Generating..." : "Generate Masked Email"}
          </button>

          {maskedEmail && (
            <p className="mt-4 text-green-600 font-semibold">
              Your masked email: <span className="break-all">{maskedEmail}</span>
            </p>
          )}

          {error && (
            <p className="mt-4 text-red-600 font-semibold">
              Error: {error}
            </p>
          )}
        </form>
      </header>

      {/* Features */}
      <section id="features" className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Why Use MaskMail?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon="🛡️"
              title="Privacy Protection"
              description="Keep your real email hidden and protect yourself from spam and trackers."
            />
            <FeatureCard
              icon="⏳"
              title="Disposable Emails"
              description="Generate temporary emails that expire automatically."
            />
            <FeatureCard
              icon="⚡"
              title="Easy to Use"
              description="Generate masked emails instantly with just a few clicks."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-indigo-600 text-white py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-12">Simple Pricing</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <PricingCard
              title="Free"
              price="$0"
              description="Basic plan with 24-hour email lifespan"
              features={["Generate masked emails", "24-hour expiration"]}
            />
            <PricingCard
              title="Premium"
              price="$9.99/mo"
              description="Extended 7-day email lifespan with priority support"
              features={["7-day expiration", "Priority support", "Unlimited masked emails"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        &copy; {new Date().getFullYear()} MaskMail. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 border rounded-lg shadow hover:shadow-lg transition cursor-default">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, description, features }) {
  return (
    <div className="bg-white text-gray-900 rounded-lg p-8 shadow hover:shadow-lg transition">
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-4xl font-extrabold mb-6">{price}</p>
      <p className="mb-6">{description}</p>
      <ul className="mb-6 space-y-2 text-left">
        {features.map((feat, i) => (
          <li key={i} className="before:content-['✔'] before:text-indigo-600 before:mr-2">{feat}</li>
        ))}
      </ul>
      <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
        Choose Plan
      </button>
    </div>
  );
}
