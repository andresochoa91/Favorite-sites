import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { signInWithGoogle } from '../firebase/firebase.utils';

const SignIn: React.FC = () => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    setEmail("")
    setPassword("");
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>):void => {
    const { value, name } = event.currentTarget;
    name === "email" ? setEmail(value) : setPassword(value);
  }

  return (
    <div>
      <h2>I already have an account</h2>
      <span>Sign in with you email and password</span>
      <form onSubmit={ handleSubmit }>
        <input 
          onChange={ handleChange } 
          id="email" 
          name="email" 
          value={ email } 
          required 
          type="email"/>
        <label htmlFor="email">Email</label>
        <input 
          onChange={ handleChange }
          id="password" 
          name="password" 
          value={ password } 
          required 
          type="password"/>
        <label htmlFor="password">Password</label>
        <input type="submit" value="Submit form"/>
        <CustomButton type="button" onClick={ signInWithGoogle }>Sign In with google</CustomButton>
      </form>
    </div>
  );
}

export default SignIn;