import React from 'react';

export default function Tweet() {
  return (
    <div className="d-flex gap-2 border-bottom py-3">
      <div className="d-flex">
        <div className="p-2">
          <img src="https://placehold.co/40x40" className="rounded-circle" />
        </div>
      </div>
      <article className="d-flex flex-column gap-1">
        <header>
          <strong>Gustavo Morales</strong>{' '}
          <span className="text-secondary">@gmorales • 11h</span>
        </header>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
          maiores! Aliquam eos voluptatem repudiandae dolor praesentium cumque
          nemo aliquid voluptates vero? Sequi, nam.
        </p>
        <footer className="d-flex justify-content-between">
          <div>
            <i className="bi bi-chat"></i> 144
          </div>
          <div>
            <i className="bi bi-repeat"></i> 1,530
          </div>
          <div>
            <i className="bi bi-heart"></i> 5,678
          </div>
          <div>
            <i className="bi bi-bar-chart"></i> 1.3M
          </div>
          <div className="me-5">
            <i className="bi bi-box-arrow-up"></i>
          </div>
        </footer>
      </article>
    </div>
  );
}
