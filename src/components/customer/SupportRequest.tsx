import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type SupportRequestProps = {
  providers: { id: string; name: string }[];
};

export function SupportRequest({ providers }: SupportRequestProps) {
  const { user } = useAuth();

  const [selectedProvider, setSelectedProvider] = useState('');
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ provider?: string; issue?: string }>({});

  const providerRef = useRef<HTMLSelectElement>(null);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!selectedProvider) newErrors.provider = 'Please select a provider.';
    if (!issue.trim()) newErrors.issue = 'Please describe your issue.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      if (!selectedProvider) providerRef.current?.focus();
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    console.log('Support request:', {
      provider: selectedProvider,
      name: user?.name,
      email: user?.email,
      issue,
    });

    setSubmitted(true);
    setLoading(false);
  };

  const resetForm = () => {
    setSelectedProvider('');
    setIssue('');
    setErrors({});
    setSubmitted(false);
    setTimeout(() => providerRef.current?.focus(), 0);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-green-50 border border-green-300 rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-semibold mb-3 text-green-700">Support Request Submitted!</h3>
        <p className="mb-4 text-green-800">
          Thanks, {user?.name?.split(' ')[0] || 'user'}! We’ll contact you at <strong>{user?.email}</strong>.
        </p>
        <button
          onClick={resetForm}
          className="inline-block px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-8 space-y-6"
      noValidate
      aria-live="polite"
    >
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Need Help? Let’s Get You Support</h1>
        <p className="text-gray-600 text-sm">We’ll follow up via your registered email.</p>
      </div>

      {/* Responsive grid: Provider + Name + Email */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Provider */}
        <div>
          <label htmlFor="provider" className="block mb-2 font-semibold text-gray-700">
            Select Provider <span className="text-red-500">*</span>
          </label>
          <select
            id="provider"
            ref={providerRef}
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.provider ? 'border-red-500' : 'border-gray-300'
            }`}
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
          {errors.provider && (
            <p className="mt-1 text-sm text-red-600">{errors.provider}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            value={user?.name || ''}
            readOnly
            className="w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Issue */}
      <div>
        <label htmlFor="issue" className="block mb-2 font-semibold text-gray-700">
          Describe Your Issue <span className="text-red-500">*</span>
        </label>
        <textarea
          id="issue"
          rows={4}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Include details like your area, street name, problem type (e.g. no internet, low speed)..."
          className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
            errors.issue ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          The more info you give — especially your location — the faster we can help!
        </p>
        {errors.issue && (
          <p className="mt-1 text-sm text-red-600">{errors.issue}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </button>
    </form>
  );
}
