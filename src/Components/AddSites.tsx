import React, { FC, useState, useContext } from 'react';
import { firestore } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../Context';

const AddSites: FC = () => {
  const [ site, setSite ] = useState<string>("");
  const { currentUserId, currentUserSites, setCurrentUserSites } = useContext<IContextProps>(PracticeFirebaseContext);

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    setSite(event.currentTarget.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    try {
      const userRef = firestore.doc(`users/${currentUserId}`);

      const something = currentUserSites.filter(s => s !== site);

      if (something.length !== currentUserSites.length) {
        alert("That website is already in the list");
        return;
      }

      await userRef.update({
        sites: [...currentUserSites, site]
      });
  
      setCurrentUserSites([...currentUserSites, site]);
      setSite("");

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Add sites</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="">Enter your website</label>
        <input 
          type="text"
          value={ site }
          onChange={ handleInput }
        />
        <button type="submit">Add website</button>
      </form>
    </>
  );
}

export default AddSites;