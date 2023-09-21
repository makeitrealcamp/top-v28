import Form from 'react-bootstrap/Form';

import Account from './Account';

export default function Aside() {
  const user = null;
  return (
    <aside>
      {user ? (
        <>
          <Form.Control
            type="search"
            placeholder="Search Twitter"
            className="my-3 rounded-pill"
          />
        </>
      ) : (
        <Account />
      )}
    </aside>
  );
}
