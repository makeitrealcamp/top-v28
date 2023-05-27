import React from 'react';

export function Song({ title, author, children }) {
  return (
    <span>
      {title} - {author} {children}
    </span>
  );
}
