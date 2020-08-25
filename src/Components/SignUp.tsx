import React, { useState } from 'react';
import CustomButton from './CustomButton';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';


const SignUp: React.SFC = () => {
  const [ displayName, setDisplayName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>):void => {
    const { value, name } = event.currentTarget;
    name === "name" ? setDisplayName(value) : 
    name === "email" ? setEmail(value) :
    name === "password" ? setPassword(value) :
    setConfirmPassword(value)
  }


  return (
    <div>
      <h2>Create an account</h2>
      <span>Sign up with you email and password</span>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">Name</label>
        <input 
          onChange={ handleChange } 
          id="name" 
          name="name" 
          value={ displayName } 
          required 
          type="text"/>
        <label htmlFor="name">Email</label>
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
        <label htmlFor="password">Confirm Password</label>
        <input 
          onChange={ handleChange }
          id="confirmPassword" 
          name="confirmPassword" 
          value={ confirmPassword } 
          required 
          type="password"/>
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
}

export default SignUp;