import React, { useState, useContext, FC } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext } from '../Context';

// interface IContext {
//   createUserDocument: (userAuth: any, additionalData?: any) => Promise<void>;
// }

const SignUp: FC = () => {

  const { createUserDocument } = useContext<any/* IContext */>(PracticeFirebaseContext);

  const [ userName, setUserName ] = useState<string>("")
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    ( name === "userName" ? setUserName : 
      name === "email" ? setEmail : setPassword
    )(value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { user }: any = await auth.createUserWithEmailAndPassword(email, password);
      await createUserDocument(user, { userName })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="userName">Username</label>
        <input 
          type="text"
          name="userName"
          value={ userName }
          onChange={ handleInput }
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUp;