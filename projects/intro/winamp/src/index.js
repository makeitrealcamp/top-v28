const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

function Song({ title, author, children }) {
  return (
    <span>
      {title} - {author} {children}
    </span>
  );
}

function Player({ songs = [], index = -1 }) {
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

function Controls({ onShuffle }) {
  return (
    <div className="control">
      <button onClick={onShuffle}>Shuffle</button>
    </div>
  );
}

function List({ songs = [], index = -1, onSelect }) {
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

function Form({ show, toggleForm, onRemove, onAdd, onUpdate, onSubmit }) {
  return (
    <div>
      {show === false ? (
        <div className="control">
          <button onClick={onAdd}>ADD</button>
          <button onClick={onUpdate}>UPD</button>
          <button onClick={onRemove}>REM</button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="author" placeholder="author" />

          <div className="control">
            <button type="submit">Ok</button>
            <button type="button" onClick={toggleForm}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Panel({ title = '', className = '', children }) {
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

const baseURL = 'http://localhost:3000';

function App() {
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
        <div>
          {showForm === false ? (
            <div className="control">
              <button onClick={onAdd}>ADD</button>
              <button onClick={onUpdate}>UPD</button>
              <button onClick={onRemove}>REM</button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                placeholder="title"
                value={title}
                onChange={function (event) {
                  setTitle(event.target.value);
                }}
              />
              <input
                type="text"
                name="author"
                placeholder="author"
                value={author}
                onChange={function (event) {
                  setAuthor(event.target.value);
                }}
              />

              <div className="control">
                <button type="submit">Ok</button>
                <button type="button" onClick={toggleForm}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </Panel>
    </React.Fragment>
  );
}

root.render(<App />);
