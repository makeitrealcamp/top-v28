export default function User({
  children,
  name = '',
  username = '',
  photo = '',
}) {
  return (
    <div className="d-flex gap-2 justify-content-between rounded-pill p-2">
      <div className="d-flex">
        <div className="p-2">
          <img src={photo} className="rounded-circle" />
        </div>
        <div className="d-flex flex-column">
          <strong>{name}</strong>
          <span>@{username}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
