import { useAuth0 } from '@auth0/auth0-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    return loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signin',
      },
    });
  }

  return children;
}
