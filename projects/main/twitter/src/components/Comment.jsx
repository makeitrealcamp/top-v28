import { formatRelative } from 'date-fns';

export default function Comment({
  content = '',
  createdAt = '',
  name = '',
  profilePhoto = '',
  username = '',
  photo = '',
}) {
  return (
    <section className="tweet d-flex gap-2 border-bottom py-3">
      <div className="d-flex">
        <div className="p-2">
          {profilePhoto ? (
            <img
              src={`${import.meta.env.VITE_API_URL}/${profilePhoto}`}
              className="rounded-circle object-fit-cover"
              width={48}
              height={48}
            />
          ) : (
            <img src="https://placehold.co/48x48" className="rounded-circle " />
          )}
        </div>
      </div>
      <article className="d-flex flex-column gap-1 flex-grow-1">
        <header>
          <strong>{name}</strong>{' '}
          <span className="text-secondary">@{username}</span>
          <span className="text-secondary">
            {' '}
            • {formatRelative(new Date(createdAt), new Date())}
          </span>
        </header>
        <section>{content}</section>
        {photo && (
          <img src={`${import.meta.env.VITE_API_URL}/${photo}`} width="100%" />
        )}
      </article>
    </section>
  );
}
