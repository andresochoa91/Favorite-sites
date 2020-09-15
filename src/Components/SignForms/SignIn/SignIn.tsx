import React, { useState, useContext, FC } from 'react';
import { PracticeFirebaseContext, IContextProps } from '../../../Context'
import { auth, signInWithGoogle } from '../../../Firebase/Firebase.utils';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MainModal from '../../MainModal/MainModal';

const SignIn: FC = () => {

  const {
    currentMessage,
    setCurrentMessage,
    currentMessageValidation,
    setCurrentMessageValidation
  } = useContext<IContextProps>(PracticeFirebaseContext)

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ validated, setValidated ] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    (name === "email" ? setEmail : setPassword)(value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    setValidated(true);
    // event.stopPropagation();
    try {
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setCurrentMessage(error.message);
      setCurrentMessageValidation(true);
    }
  };

  return (
    <div className="mt-4">

      <MainModal 
        currentMessageValidation={ currentMessageValidation } 
        setCurrentMessageValidation={ setCurrentMessageValidation }
        titleMessage="Error signin in"
      >
        <p>{ currentMessage }</p>
      </MainModal>

      <h2>Sign In</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={ email }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            defaultValue={ password }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>        
        <Button className="w-75" type="submit">Sign In</Button>
        <Button className="mt-3 w-75 btn-success" onClick={ signInWithGoogle }>Sign In with google</Button>
      </Form>
      <ForgotPassword />
    </div>
  );
}

export default SignIn;