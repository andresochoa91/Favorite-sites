import React, { useState } from 'react';
import { auth } from '../Firebase/Firebase.utils';


const ForgotPassword: React.FC = () => {

  const [ currentEmail, setCurrentEmail ] = useState<string>("");

  const handleReset = async(event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await auth.sendPasswordResetEmail(currentEmail);
      console.log("yay");

    } catch (err) {
      console.error(err);
    }
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