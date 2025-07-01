// QuickActionCard.tsx
import React from 'react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start p-5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-white ${color}`}
    >
      <div className="mb-4 text-white opacity-90">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-80 text-left">{description}</p>
    </button>
  );
};
