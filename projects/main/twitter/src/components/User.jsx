export default function User({
  children,
  name = '',
  username = '',
  photo = '',
}) {
  return (
    <div className="d-flex gap-2 justify-content-between rounded-pill p-2">
      <div className="d-flex">
        <div className="p-2 d-flex">
          <img src={`http://localhost:3000/api/${photo}`} className="rounded-circle img-fluid" style={{width: "50px", height: "50px"}} />
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
