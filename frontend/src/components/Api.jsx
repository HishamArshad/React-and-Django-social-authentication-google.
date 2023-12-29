import React, { useRef } from 'react';
import { observable } from "@legendapp/state"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { observer, useObservable, Show, Memo, Computed } from "@legendapp/state/react"
import { persistObservable } from "@legendapp/state/persist"
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage"
const Api = observer(function Api({credentials}) {

    const renderCount = ++useRef(0).current
 
 
      
  const handleGoogleSignIn = async (credentials) => {
    const clientId = credentials.clientId;  // Use credential.clientId as the actual credential
    const select_by = credentials.selectBy;  // Add the appropriate value for select_by
    const credential = credentials.credential;  // Add the appropriate value for select_by
   
    try {
      const response = await fetch('http://localhost:8000/api/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential,  // Use clientId as the actual credential
          clientId,
          select_by
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
 handleGoogleSignIn()
  return (
 null
  );
})

export default Api;
