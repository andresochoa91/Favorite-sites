import React, { FC, useState, useContext } from 'react';
import { firestore } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../Context';

interface IProps {
  index: number;
  site: string;
  handleDeleteButton: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const ShowSite: FC<IProps> = ({ index, site, handleDeleteButton }) => {

  const { 
    currentUserId,
    setCurrentUserSites,
    currentUserSites
  } = useContext<IContextProps>(PracticeFirebaseContext);
  
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ tempSite, setTempSite ] = useState<string>(site);  

  const handleEditButton = ():void => {
    setEdit(true);
  }

  const handleEdit = (event: React.FormEvent<HTMLInputElement>):void => {
    setTempSite(event.currentTarget.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    try {
      const tempSites = currentUserSites.map((site: string, ind: number) => (
        ind === index ? tempSite : site
      ));
    
      const userRef = firestore.doc(`users/${currentUserId}`);
      await userRef.update({
        sites: [...tempSites]
      });
      setEdit(false);
      setCurrentUserSites([...tempSites]);
    } catch (err) {
      console.error(err);
    }
  }

  const handleCancelButton = ():void => {
    setEdit(false);
    setTempSite(site);
  }

  return (
    <>
      {
        edit 
        ?
          <form onSubmit={ handleSubmit }>
            <input 
              type="text"
              value={ tempSite }
              onChange={ handleEdit }
              pattern="https?:\/\/.{0,}"
            />
            <button type="submit">Update</button>
            <button onClick={ handleCancelButton } >Cancel</button>
          </form>
        :
          <>
            <a 
              href={ `${site}` } 
              target="_blank" 
              rel="noopener noreferrer"
            >
              { site } 
            </a>
            <button id={ `e${index}` } onClick={ handleEditButton }>Edit</button>
            <button id={ `d${index}` } onClick={ handleDeleteButton }>X</button>
            <br/>
          </>
      }
    </>
  );
}

export default ShowSite;