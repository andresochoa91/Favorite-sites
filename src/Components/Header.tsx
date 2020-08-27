import React, { useContext } from 'react';
import { PersonalContext } from '../Context';
import { auth } from '../firebase/firebase.utils';
import SignInSignUp from './SignInSignUp';

const Header: React.FC = () => {
  const { currentUser } = useContext(PersonalContext)
  return (
    <>
      {/* <SignInSignUp /> */}
      {
        currentUser 
        // &&
        ? 
        <button onClick={() => auth.signOut()}>Sign out</button> 
        :
        <SignInSignUp />
      }    
    </> 
  );  
}

export default Header;