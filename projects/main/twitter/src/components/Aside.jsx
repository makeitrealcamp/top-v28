import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Account from './Account';
import UserContext from '../containers/UserContext';

export default function Aside() {
  const { user } = useContext(UserContext);
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
