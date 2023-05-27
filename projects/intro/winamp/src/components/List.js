import React from 'react';

import { Song } from './Song';

export function List({ songs = [], index = -1, onSelect }) {
  return (
    <div>
      <ul>
        {songs.map(function (song, i) {
          return (
            <li
              key={song.id}
              onClick={function (event) {
                onSelect(event, i);
              }}
              className={index === i ? 'playing' : ''}
            >
              <Song title={song.title} author={song.author} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
