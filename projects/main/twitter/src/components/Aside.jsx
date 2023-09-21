import Form from 'react-bootstrap/Form';

import Account from './Account';
import { useSelector } from 'react-redux';

export default function Aside() {
  const user = useSelector((state) => state.user);

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
