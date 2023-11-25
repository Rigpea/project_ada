import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Signup Page</h1>
      <button onClick={() => loginWithRedirect({
        screen_hint: 'signup'
      })}>
        Sign Up with Auth0
      </button>
    </div>
  );
};

export default SignupPage;
