import React, { useState } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ForgotPassword: React.FC = () => {

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
        alert("Check your email address to reset your password!");
        handleClose();
      }
    } catch (error) {
      handleClose();
      alert(error);
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setCurrentEmail(event.target.value);
  } 

  return (
    <div className="mt-3" style={{cursor: "pointer"}}>
      <p className="text-primary" onClick={ handleShow }>Forgot password?</p>
      <>
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
      </>
    </div>
  ); 
}

export default ForgotPassword;