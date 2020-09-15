import React, { SFC, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../../Context'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IProps {
  currentMessageValidation: boolean;
  setCurrentMessageValidation: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  titleMessage: string;
}

const MainModal: SFC<IProps> = (
  {  
    titleMessage,
    children 
  }
) => {

  const { 
    currentMessageValidation,
    setCurrentMessageValidation 
  } = useContext<IContextProps>(PracticeFirebaseContext);
  
  const handleClose = () => setCurrentMessageValidation(false);

  return(
    <Modal show={ currentMessageValidation } onHide={ handleClose }>
      <Modal.Header closeButton>
      <Modal.Title>{ titleMessage }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ handleClose }>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MainModal;