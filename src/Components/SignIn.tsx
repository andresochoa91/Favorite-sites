import React, { useState, FC } from 'react';
import { auth, signInWithGoogle } from '../Firebase/Firebase.utils';

const SignIn: FC = () => {
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    (name === "email" ? setEmail : setPassword)(value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <>
      <h1>SignIn</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          name="email"
          value={ email }
          onChange={ handleInput }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ handleInput }
        />
        <button type="submit">Sign In</button>
        <button onClick={ signInWithGoogle }>Sign In with google</button>
      </form>
    </>
  );
}

export default SignIn;