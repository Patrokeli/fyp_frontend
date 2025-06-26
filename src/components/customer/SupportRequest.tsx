// src/components/customer/SupportRequest.tsx
import React, { useState } from 'react';

type SupportRequestProps = {
  providers: { id: string; name: string }[];
};

export function SupportRequest({ providers }: SupportRequestProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit the support request to your backend or API
    console.log('Support request:', { selectedProvider, name, email, issue });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-100 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Support request submitted!</h3>
        <p>We will get back to you soon.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => setSubmitted(false)}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label className="block mb-1 font-medium">Select Provider</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          required
        >
          <option value="" disabled>
            -- Choose Provider --
          </option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Your Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email Address</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Describe your issue</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={4}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Explain your problem or request"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
      >
        Submit Request
      </button>
    </form>
  );
}
