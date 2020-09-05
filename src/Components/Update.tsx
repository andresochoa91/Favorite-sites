import React, { FC, useContext, useState } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import { firestore } from '../Firebase/Firebase.utils';

const Update: FC = () => {

  const { 
    currentUserId,
    currentUserName,
    setCurrentUserName, 
    currentUserZipCode, 
    setCurrentUserZipCode 
  } = useContext<IContextProps>(PracticeFirebaseContext);
  
  const [ tempUserName, setTempUserName ] = useState<string>("");
  const [ tempZipCode, setTempZipCode ] = useState<string>("");

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    (name === "tempUserName" ? setTempUserName(value) : setTempZipCode(value));
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    
    const userRef = firestore.doc(`users/${currentUserId}`);
    const updatedUserName = tempUserName ? tempUserName : currentUserName;
    const updatedZipCode = tempZipCode ? tempZipCode : currentUserZipCode;  
    await userRef.update({
      userName: updatedUserName,
      zipCode: updatedZipCode
    });

    // userRef.get()
    // .then((response: any) => console.log(response.data()))

    setCurrentUserName(updatedUserName);
    setCurrentUserZipCode(updatedZipCode);
    setTempUserName("");    
    setTempZipCode("");    
  }

  return (
    <>
      <h1>Update</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="">Update name</label>
        <input 
          onChange={ handleInput } 
          type="text"
          name="tempUserName"
          value={ tempUserName }
        />
        <label htmlFor="">Update Zip Code</label>
        <input 
          onChange={ handleInput } 
          type="text"
          name="tempZipCode"
          value={ tempZipCode }
        />
        <button type="submit">Update</button>
      </form>
    </>
  ); 
}

export default Update;