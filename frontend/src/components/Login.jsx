import React, { useRef } from 'react';
import { observer, useObservable, Show } from "@legendapp/state/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = observer(function Login() {
  const renderCount = ++useRef(0).current;
  const state = useObservable({
    token: '',
  });
    const handleGoogleSignIn = async (credentials) => {
      const clientId = credentials.clientId;
      const select_by = credentials.selectBy;
      const credential = credentials.credential;

      try {
        const response = await fetch('http://localhost:8000/api/google/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            credential,
            clientId,
            select_by,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          state.token.set(data.token);
        } else {
          console.log('Login Failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    const handleLogout = () => {
      state.token.set('');
    };
  return (
    <>
      <p>Render Count: {renderCount}</p>
 
      <Show
        if={state.token}
        else={() => 
            <div>
            <GoogleOAuthProvider clientId="491131327205-foeif4n807dfsf3iishrt86a6s8v23pr.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  handleGoogleSignIn(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
              />
            </GoogleOAuthProvider>
          </div>
        }
         
        >
        {() =>        
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>}
        </Show>
    </>
  );
});

export default Login;
