import React, { FC, useState, useContext } from 'react';
import { firestore } from '../../../../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../../../../Context';
import Button from 'react-bootstrap/Button';
import MainModal from '../../../MainModal/MainModal';

interface IProps {
  index: number;
  site: string;
  handleDeleteButton: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const ShowSite: FC<IProps> = ({ index, site, handleDeleteButton }) => {

  const { 
    currentUserId,
    setCurrentUserSites,
    currentUserSites,
    currentMessage,
    setCurrentMessage,
    currentMessageValidation,
    setCurrentMessageValidation
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
      if (!tempSite) {
        setCurrentMessage("Empty field is not valid");
        setCurrentMessageValidation(true);
        return;
      }

      let count: number = currentUserSites.reduce((acc: number, site: string, ind: number) => {
        if (site === tempSite && index !== ind) {
          return acc + 1;
        }
        return acc;
      }, 0);

      if (count > 0) {
          setCurrentMessage("This site already exists in your list, try another website");
          setCurrentMessageValidation(true);
          return;
      }

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
      <MainModal 
        currentMessageValidation={ currentMessageValidation } 
        setCurrentMessageValidation={ setCurrentMessageValidation }
        titleMessage="Error updating site"
      >
        <p>{ currentMessage }</p>
      </MainModal>
      {
        edit 
        ?
          <form className="position-relative" onSubmit={ handleSubmit }>
            <input 
              type="text"
              value={ tempSite }
              onChange={ handleEdit }
              pattern="^(https?:\/\/+).{1,}$"
            />
            <span className="position-absolute" style={{top: "-2px", right: "-7px"}}>
              <Button className="mr-2" type="submit">Update</Button>
              <Button onClick={ handleCancelButton } >Cancel</Button>
            </span>
          </form>
        :
          <div className="position-relative">
            <a 
              href={ `${site}` } 
              target="_blank" 
              rel="noopener noreferrer"
              className="overflow-auto d-inline-block position-absolute"
              style={{ width: "80%"}}
            >
              { site } 
            </a>
            <span className="position-absolute" style={{top: "-7px", right: "-7px"}}>
              <Button className="mr-2" id={ `e${index}` } onClick={ handleEditButton }>Edit</Button>
              <Button className="btn-danger" id={ `d${index}` } onClick={ handleDeleteButton }>&times;</Button>
            </span>
            <br/>
          </div>
      }
    </>
  );
}

export default ShowSite;