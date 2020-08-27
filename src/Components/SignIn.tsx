import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { signInWithGoogle, auth } from '../firebase/firebase.utils';

const SignIn: React.FC = () => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("")
      setPassword("");
    } catch (error) {
      console.log(error);
    } 
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
        <label htmlFor="email">Email</label>
        <input 
          onChange={ handleChange } 
          id="email" 
          name="email" 
          value={ email } 
          required 
          type="email"/>
        <label htmlFor="password">Password</label>
        <input 
          onChange={ handleChange }
          id="password" 
          name="password" 
          value={ password } 
          required 
          type="password"/>
        <CustomButton type="submit">SIGN IN</CustomButton>
        <CustomButton type="button" onClick={ signInWithGoogle }>SIGN IN WITH GOOGLE</CustomButton>
      </form>
    </div>
  );
}

export default SignIn;