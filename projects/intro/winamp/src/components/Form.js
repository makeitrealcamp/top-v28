import React from 'react';

export default function Form({
  show,
  toggleForm,
  onAdd,
  onRemove,
  onUpdate,
  onSubmit,
  title,
  onChangeTitle,
  author,
  onChangeAuthor,
}) {
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
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={onChangeTitle}
          />
          <input
            type="text"
            name="author"
            placeholder="author"
            value={author}
            onChange={onChangeAuthor}
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
  );
}
