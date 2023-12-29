import React, { useRef } from 'react';
import { observer, useObservable, useEffectOnce } from "@legendapp/state/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = observer(function Login() {
  const renderCount = useRef(0).current;
 
 
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
     
          console.log(data);
          localStorage.setItem('token', data.token)

          // Handle successful response, e.g., store token in state or redirect
        } else {
          console.log('Login Failed');
          // Handle failed response, e.g., show an error message
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle network errors or other issues
      }
    };

    const handleLogout = () => {
      state.token.set('');
    };

 
 
  return (
    <div>
      <p>{renderCount}</p>
 
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
    
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
      
    </div>
  );
});

export default Login;
