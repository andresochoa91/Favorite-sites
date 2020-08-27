import React, { useState } from 'react';
import {auth} from '../firebase/firebase.utils';


const ForgotPassword: React.FC = () => {

  const [ currentEmail, setCurrentEmail ] = useState<string>("");

  const handleReset = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.sendPasswordResetEmail(currentEmail)
    .then((e) => {
      console.log("yay", e)
    })
    .catch(error => console.error(error));
  }

  const handleChange = (event: any) => {
    setCurrentEmail(event.target.value);
  } 

  return (
    <>
      <h2>Forgot password?</h2>
      <form onSubmit={ handleReset }>
        <label htmlFor="">Enter you email</label>
        <input onChange={ handleChange } type="email"/>
        <button type="submit">Recover password</button>
      </form>
    </>
  ); 
}

export default ForgotPassword;