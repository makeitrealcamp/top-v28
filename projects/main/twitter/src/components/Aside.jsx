import Form from 'react-bootstrap/Form';

import Account from './Account';
import { useSelector } from 'react-redux';
import { getUser } from '../store/userReducer';

export default function Aside() {
  const user = useSelector(getUser);

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
