import React, { useState, useContext } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../../../Context'
import { auth } from '../../../Firebase/Firebase.utils';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import MainModal from '../../MainModal/MainModal';

const ForgotPassword: React.FC = () => {

  const { 
    currentMessage,
    setCurrentMessage,
    currentMessageValidation,
    setCurrentMessageValidation
  } = useContext<IContextProps>(PracticeFirebaseContext)

  const [ currentEmail, setCurrentEmail ] = useState<string>("");
  const [ show, setShow ] = useState(false);
  const [ validated, setValidated ] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setCurrentEmail("");
    setValidated(false);
    setShow(true);
  }

  const handleReset = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    try {
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        await auth.sendPasswordResetEmail(currentEmail);
        setCurrentMessage("Check your email address to reset your password!");
        setCurrentMessageValidation(true);
        handleClose();
      }
    } catch (error) {
      handleClose();
      setCurrentMessage(error.message);
      setCurrentMessageValidation(true);
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setCurrentEmail(event.target.value);
  } 

  return (
    <div className="mt-3" style={{cursor: "pointer"}}>
      <MainModal 
        currentMessageValidation={ currentMessageValidation } 
        setCurrentMessageValidation={ setCurrentMessageValidation }
        titleMessage="Error reseting password"
      >
        <p>{ currentMessage }</p>
      </MainModal>
      <p className="text-primary" onClick={ handleShow }>Forgot password?</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form noValidate validated={validated} onSubmit={handleReset}>
            <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom02">
              <Form.Label>Please enter your email adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                defaultValue={ currentEmail }
                onChange={ handleInput }
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" variant="primary">
                Reset password
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  ); 
}

export default ForgotPassword;