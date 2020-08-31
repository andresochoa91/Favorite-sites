import React, { FC, useContext } from 'react';
import { PracticeFirebaseContext } from '../Context';
import { firestore } from '../Firebase/Firebase.utils';
import ShowSite from './ShowSite';

const ListSites: FC = () => {

  const { currentUserSites, setCurrentUserSites, currentUser } = useContext<any>(PracticeFirebaseContext)  

  const handleDeleteButton = async(event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.id);
    try {
      const tempSites = currentUserSites.filter((site: string, index: number) => (
        index !== Number(event.currentTarget.id.split("d")[1]))
      );
  
      // console.log(tempSites);
      const userRef = firestore.doc(`users/${currentUser.uid}`);
      await userRef.update({
        sites: [...tempSites]
      });
      setCurrentUserSites([...tempSites]);
    } catch(err) {
      console.error(err);
    }
  }

  // const handleEditButton = async(event: React.MouseEvent<HTMLButtonElement>) => {
  //   try {

  //   } catch(err) {
  //     console.error(err);
  //   }
  // }

  return (
    <>
      <h1>List of Sites</h1>
      {
        currentUserSites.map((site: string, index: number): React.ReactNode => (
          <ShowSite 
            key={ `b${index}` }
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