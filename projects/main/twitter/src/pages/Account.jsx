import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { syncAccount } from '../api/users';

export default function Account() {
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  async function onSyncAccount(payload) {
    const token = await getAccessTokenSilently();
    await syncAccount(payload, token);
    navigate('/home');
  }

  useEffect(() => {
    if (user) {
      onSyncAccount(user);
    }
  }, [user]);

  return <div>Sync Account</div>;
}
