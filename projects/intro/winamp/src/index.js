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
              key={i}
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

function Form({ show, toggleForm, onRemove, onAdd }) {
  return (
    <div>
      {show === false ? (
        <div className="control">
          <button onClick={toggleForm}>ADD</button>
          <button onClick={onRemove}>REM</button>
        </div>
      ) : (
        <form onSubmit={onAdd}>
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

const data = [
  {
    title: 'Smells Like Teen Spirit',
    author: 'Nirvana',
  },
  {
    title: 'Blind',
    author: 'KoRn',
  },
  {
    title: 'Nookie',
    author: 'Limp Bizkit',
  },
];

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

function App() {
  // State
  const [index, setIndex] = React.useState(-1);
  const [songs, setSongs] = React.useState(data);
  const [showForm, setShowForm] = React.useState(false);

  // Events
  function onShuffle(event) {
    setIndex(Math.floor(Math.random() * songs.length));
  }

  function onPlay(event, nextIndex) {
    setIndex(nextIndex);
  }

  function onAdd(event) {
    event.preventDefault();
    const { title: inputTitle, author: inputAuthor } = event.target.elements;
    const newSong = {
      title: inputTitle.value,
      author: inputAuthor.value,
    };

    setSongs([...songs, newSong]);
    setShowForm(!showForm);
    setIndex(songs.length);
  }

  function onRemove(event) {
    if (index !== -1) {
      const updatedSongs = songs.filter(function (_, i) {
        return index !== i;
      });
      setSongs(updatedSongs);
      setIndex(-1);
    }
  }

  function toggleForm(event) {
    setShowForm(!showForm);
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
        <Form
          show={showForm}
          toggleForm={toggleForm}
          onRemove={onRemove}
          onAdd={onAdd}
        />
      </Panel>
    </React.Fragment>
  );
}

root.render(<App />);
