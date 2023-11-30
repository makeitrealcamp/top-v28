'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

function Auth() {
  const { data: session } = useSession();
  console.log({ session });
  return (
    <>
      {!session?.user?.name ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
    </>
  );
}

export default Auth;
