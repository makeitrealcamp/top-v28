import React from 'react';

export default function User({ children, className }) {
  return (
    <div className={`d-flex gap-2 justify-content-between rounded-pill p-2 ${className}`}>
      <div className="d-flex">
        <div className="p-2">
          <img src="https://placehold.co/40x40" className="rounded-circle" />
        </div>
        <div className="d-flex flex-column">
          <strong>Gustavo Morales</strong>
          <span>@gmoralesc</span>
        </div>
      </div>
      {children}
    </div>
  );
}
