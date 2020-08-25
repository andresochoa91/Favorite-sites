import React, { useContext } from 'react';
import { PersonalContext } from '../Context';
import { auth } from '../firebase/firebase.utils';
import SignIn from './SignIn';
import SignUp from './SignUp'

const Header: React.FC = () => {
  const { currentUser } = useContext(PersonalContext)
  return (
    <>
      {
        currentUser 
        ?
        <button onClick={() => auth.signOut()}>Sign out</button> 
        :
        <div>
          <SignUp />
          <SignIn />
        </div> 
      }    
    </>
  );  
}

export default Header;