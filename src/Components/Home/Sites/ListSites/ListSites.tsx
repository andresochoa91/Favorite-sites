import React, { FC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../../../../Context';
import { firestore } from '../../../../Firebase/Firebase.utils';
import ShowSite from '../ShowSite/ShowSite';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const ListSites: FC = () => {

  const { currentUserSites, setCurrentUserSites, currentUserId } = useContext<IContextProps>(PracticeFirebaseContext);  

  const handleDeleteButton = async(event: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    try {
      const tempSites = currentUserSites.filter((site: string, index: number) => (
        index !== Number(event.currentTarget.id.split("d")[1])
      ));
  
      const userRef = firestore.doc(`users/${currentUserId}`);
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
      <Container>
        <Table 
          className="w-75 mx-auto" 
          striped bordered hover
          style={{ 
            backgroundColor: "rgba(0,0,0,0.65)"
          }}  
        >
          <thead>
            <tr>
              <th className="h4 text-center text-white">List of Websites</th>
            </tr>
          </thead>
          <tbody>

          {
            currentUserSites.map((site: string, index: number):React.ReactNode => (
              <tr key={ `b${site}` }>
                <td className="py-3">
                  <ShowSite 
                    index={ index }
                    site={ site }
                    handleDeleteButton={ handleDeleteButton }
                  />
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </Container>
    </>
  ); 
}

export default ListSites;