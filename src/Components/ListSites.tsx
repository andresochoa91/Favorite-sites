import React, { FC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import { firestore } from '../Firebase/Firebase.utils';
import ShowSite from './ShowSite';

const ListSites: FC = () => {

  const { currentUserSites, setCurrentUserSites, currentUser } = useContext<IContextProps>(PracticeFirebaseContext);  

  const handleDeleteButton = async(event: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    try {
      const tempSites = currentUserSites.filter((site: string, index: number) => (
        index !== Number(event.currentTarget.id.split("d")[1])
      ));
  
      const userRef = firestore.doc(`users/${currentUser.uid}`);
      await userRef.update({
        sites: [...tempSites]
      });
      setCurrentUserSites([...tempSites]);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>List of Sites</h1>
      {
        currentUserSites.map((site: string, index: number):React.ReactNode => (
          <ShowSite 
            key={ `b${site}` }
            index={ index }
            site={ site }
            handleDeleteButton={ handleDeleteButton }
          />
        ))
      }
    </>
  ); 
}

export default ListSites;