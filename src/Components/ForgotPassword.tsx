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
  const handleShow = () => setShow(true);

  const handleReset = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidated(true);
    try {
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        await auth.sendPasswordResetEmail(currentEmail);
        console.log("Check your email address");
        handleClose();
      }
    } catch (err) {
      handleClose();
      console.error(err);
    }
  }

  // const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setValidated(true);
  //   // event.stopPropagation();
  //   try {
  //     const form = event.currentTarget;
  //     if (!form.checkValidity()) {
  //       event.stopPropagation();
  //     } else {
  //       await auth.signInWithEmailAndPassword(email, password);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setCurrentEmail(event.target.value);
  } 

  return (
    <div className="mt-3" style={{cursor: "pointer"}}>
      <p className="text-primary" onClick={handleShow}>Forgot password?</p>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form noValidate validated={validated} onSubmit={handleReset}>
            <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom02">
              <Form.Label>Please anter your email adress</Form.Label>
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

          {/* <form onSubmit={ handleReset }>
            <label htmlFor="">Enter you email</label>
            <input onChange={ handleChange } type="email"/>
            <button type="submit">Recover password</button>
          </form> */}
        </Modal.Body>
      </Modal>
    </>




    </div>
  ); 
}

export default ForgotPassword;