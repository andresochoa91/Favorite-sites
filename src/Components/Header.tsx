import React, { useContext } from 'react';
import { PersonalContext } from '../Context';
import { auth } from '../firebase/firebase.utils';
import SignIn from './SignIn';

const Header: React.FC = () => {
  const { currentUser } = useContext(PersonalContext)
  return (
    <>
      {
        currentUser ? <button onClick={() => auth.signOut()}>Sign out</button> : <SignIn />
      }    
    </>
  );  
}

export default Header;