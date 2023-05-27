import React from 'react';

import { Player } from './components/Player';
import { Controls } from './components/Controls';
import { List } from './components/List';
import { Panel } from './components/Panel';

const Form = React.lazy(() => import('./components/Form.js'));

const baseURL = process.env.API_URL;

export function Loading() {
  return <div>Loading ...</div>;
}

export function App() {
  // State
  const [index, setIndex] = React.useState(-1);
  const [songs, setSongs] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [mode, setMode] = React.useState('ADD');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');

  async function loadSongs() {
    try {
      const response = await fetch(`${baseURL}/songs`);

      if (response.ok) {
        const songs = await response.json();

        setSongs(songs);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Mounted
  React.useEffect(function () {
    loadSongs();
  }, []);

  // Events
  function onShuffle(event) {
    setIndex(Math.floor(Math.random() * songs.length));
  }

  function onPlay(event, nextIndex) {
    setIndex(nextIndex);
  }

  async function onSubmit(event) {
    event.preventDefault();

    const data = {
      title,
      author,
    };

    if (mode === 'ADD') {
      try {
        const response = await fetch(`${baseURL}/songs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const song = await response.json();

          setSongs([...songs, song]);
          setShowForm(!showForm);
          setIndex(songs.length);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (mode === 'UPDATE') {
      const selectedSong = songs[index];
      const { id } = selectedSong;
      try {
        const response = await fetch(`${baseURL}/songs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          loadSongs();
          setShowForm(!showForm);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function onRemove(event) {
    if (index !== -1) {
      const selectedSong = songs[index];
      const { id } = selectedSong;

      try {
        const response = await fetch(`${baseURL}/songs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // const updatedSongs = songs.filter(function (_, i) {
          //   return index !== i;
          // });

          // setSongs(updatedSongs);
          loadSongs();

          setIndex(-1);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function toggleForm(event) {
    setShowForm(!showForm);
  }

  async function onAdd(event) {
    setMode('ADD');

    setTitle('');
    setAuthor('');

    toggleForm(event);
  }

  async function onUpdate(event) {
    setMode('UPDATE');

    const selectedSong = songs[index];
    setTitle(selectedSong.title);
    setAuthor(selectedSong.author);

    toggleForm(event);
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function onChangeAuthor(event) {
    setAuthor(event.target.value);
  }

  return (
    <React.Fragment>
      <Panel title="Reactbox" className="player">
        <div className="current-play b-black g-color">
          <Player songs={songs} index={index} />
        </div>
        <div className="controls">
          <Controls onShuffle={onShuffle} />
        </div>
      </Panel>
      <Panel title="List" className="list">
        <div className="list b-black">
          <List songs={songs} index={index} onSelect={onPlay} />
        </div>
        <React.Suspense fallback={<Loading />}>
          <Form
            show={showForm}
            toggleForm={toggleForm}
            onAdd={onAdd}
            onRemove={onRemove}
            onUpdate={onUpdate}
            onSubmit={onSubmit}
            title={title}
            onChangeTitle={onChangeTitle}
            author={author}
            onChangeAuthor={onChangeAuthor}
          />
        </React.Suspense>
      </Panel>
    </React.Fragment>
  );
}
