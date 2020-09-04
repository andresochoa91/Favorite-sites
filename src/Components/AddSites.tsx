import React, { FC, useState, useContext } from 'react';
import { firestore } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import ListSites from './ListSites';


// interface IContext {
//   currentUser: any;
//   currentUserSites: Array<string>;
//   setCurrentUserSites: React.Dispatch<React.SetStateAction<string[]>>;
// }

const AddSites: FC = () => {
  const [ site, setSite ] = useState<string>("");
  const { currentUser, currentUserSites, setCurrentUserSites } = useContext<IContextProps>(PracticeFirebaseContext);
  // const [ currentSites, setCurrentSites ] = useState<Array<string>>(currentUserSites);

  const handleInput = (event: React.FormEvent<HTMLInputElement>):void => {
    setSite(event.currentTarget.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    try {
      const userRef = firestore.doc(`users/${currentUser.uid}`);
      
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
      <ListSites />
    </>
  );
}

export default AddSites;