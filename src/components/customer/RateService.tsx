import React, { useState, useRef } from 'react';

type RateServiceProps = {
  providers: { id: string; name: string }[];
};

export function RateService({ providers }: RateServiceProps) {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ provider?: string; rating?: string }>({});

  const providerSelectRef = useRef<HTMLSelectElement>(null);

  const validate = () => {
    const newErrors: { provider?: string; rating?: string } = {};
    if (!selectedProvider) newErrors.provider = 'Please select a provider.';
    if (rating === 0) newErrors.rating = 'Please select a rating.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    console.log('Rating submitted:', { selectedProvider, rating, comment });
    setSubmitted(true);
    setLoading(false);
  };

  const resetForm = () => {
    setSelectedProvider('');
    setRating(0);
    setComment('');
    setErrors({});
    setSubmitted(false);
    setTimeout(() => providerSelectRef.current?.focus(), 0);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-green-50 border border-green-300 rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Thank you for your feedback!</h2>
        <button
          onClick={resetForm}
          className="mt-2 inline-block px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          aria-label="Rate another service"
        >
          Rate Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-y-6 lg:space-y-0 lg:flex lg:gap-10"
      noValidate
      aria-live="polite"
    >
      {/* Left Section */}
      <div className="lg:w-1/2 space-y-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">We Value Your Feedback</h1>
          <p className="text-gray-600 text-sm">
            Help us improve Fiber services by sharing your thoughts.
          </p>
        </div>

        {/* Provider Selection */}
        <div>
          <label htmlFor="provider" className="block mb-2 font-semibold text-gray-700">
            Select Provider <span className="text-red-500">*</span>
          </label>
          <select
            id="provider"
            ref={providerSelectRef}
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.provider ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={!!errors.provider}
            aria-describedby="provider-error"
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
            <p id="provider-error" className="mt-1 text-sm text-red-600">
              {errors.provider}
            </p>
          )}
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block mb-2 font-semibold text-gray-700">
            Comments (optional)
          </label>
          <textarea
            id="comments"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 space-y-6 flex flex-col justify-between">
        {/* Rating */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">
            Rating <span className="text-red-500">*</span>
          </p>
          <div className="flex space-x-3" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setRating(val)}
                aria-pressed={rating === val}
                aria-label={`${val} Star${val > 1 ? 's' : ''}`}
                className={`text-4xl transition-colors cursor-pointer rounded-md ${
                  val <= rating
                    ? 'text-yellow-400 hover:text-yellow-500 shadow-md'
                    : 'text-gray-300 hover:text-yellow-300'
                } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              >
                ★
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
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
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Rating'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
