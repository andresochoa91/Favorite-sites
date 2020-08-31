import React, { FC, useContext, useState } from 'react';
import { PracticeFirebaseContext } from '../Context';
import { firestore } from '../Firebase/Firebase.utils';

const Update: FC = () => {

  const { currentUser, setCurrentUserName } = useContext(PracticeFirebaseContext);
  const [ tempUserName, setTempUserName ] = useState<string>("");

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    setTempUserName(event.currentTarget.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const userRef = firestore.doc(`users/${currentUser.uid}`);
    await userRef.update({
      userName: tempUserName
    });

    // userRef.get()
    // .then((response: any) => console.log(response.data()))

    setCurrentUserName(tempUserName);
    setTempUserName("");    
  }

  return (
    <>
      <h1>Update</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="">Update name</label>
        <input 
          onChange={ handleInput } 
          type="text"
          value={ tempUserName }
        />
        <button type="submit">Update</button>
      </form>
    </>
  ); 
}

export default Update;