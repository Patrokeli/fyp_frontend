// src/components/customer/RateService.tsx
import React, { useState } from 'react';

type RateServiceProps = {
  providers: { id: string; name: string }[];
};

export function RateService({ providers }: RateServiceProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can send rating + comment to backend or API
    console.log('Rating submitted:', { selectedProvider, rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-100 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Thank you for your feedback!</h3>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => setSubmitted(false)}
        >
          Rate Another
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
        <label className="block mb-1 font-medium">Rating</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          <option value={0} disabled>
            -- Select Rating --
          </option>
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val} Star{val > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Comments (optional)</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
      >
        Submit Rating
      </button>
    </form>
  );
}
