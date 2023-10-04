import Form from 'react-bootstrap/Form';
import { useAuth0 } from '@auth0/auth0-react';

import Account from './Account';

export default function Aside() {
  const { isAuthenticated } = useAuth0();
  return (
    <aside>
      {isAuthenticated ? (
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
