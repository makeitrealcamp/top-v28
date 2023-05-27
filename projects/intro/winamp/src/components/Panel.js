import React from 'react';

export function Panel({ title = '', className = '', children }) {
  return (
    <div className={`main-ui ${className}`}>
      <header>
        <div className="line"></div>
        <h1>{title}</h1>
      </header>
      <div className="inner">{children}</div>
    </div>
  );
}
