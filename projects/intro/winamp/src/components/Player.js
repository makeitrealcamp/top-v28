import React from 'react';

import { Song } from './Song';

export function Player({ songs = [], index = -1 }) {
  return (
    <div>
      {index >= 0 ? (
        <Song title={songs[index].title} author={songs[index].author} />
      ) : (
        <Song title="Untitled" author="Unknown" />
      )}
    </div>
  );
}
