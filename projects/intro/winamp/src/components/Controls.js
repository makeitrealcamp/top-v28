import React from 'react';

export function Controls({ onShuffle }) {
  return (
    <div className="control">
      <button onClick={onShuffle}>Shuffle</button>
    </div>
  );
}
