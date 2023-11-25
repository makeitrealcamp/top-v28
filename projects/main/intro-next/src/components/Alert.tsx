'use client';

import { useState } from 'react';

export const Alert = ({
  onClick,

}: {
  onClick?: () => void;

}) => {
    const [showAlert, setShowAlert] = useState(true);

  return (
    <div
      className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
      onClick={onClick}
    >
      {showAlert && (
        <>
          <span className="font-medium">Info alert!</span>
          <p>Change a few things up and try submitting again.</p>
        </>
      )}
    </div>
  );
};
