import React, { useState, useContext, FC } from 'react';
import { auth } from '../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../Context';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignUp: FC = () => {

  const { createUserDocument } = useContext<IContextProps>(PracticeFirebaseContext);

  const [ userName, setUserName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ zipCode, setZipCode ] = useState<string>("");
  const [ validated, setValidated ] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = event.currentTarget;
    ( name === "userName" ? setUserName : 
      name === "email" ? setEmail :
      name === "password" ? setPassword : 
      name === "confirmPassword" ? setConfirmPassword :
      setZipCode
    )(value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    setValidated(true);
    try {
      if ( password !== confirmPassword ) {
        alert("Passwords don't match");
        return;
      }
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        const { user }: firebase.auth.UserCredential = await auth.createUserWithEmailAndPassword(email, password);
        await createUserDocument(user, { userName, zipCode });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mt-4">
      <h2>Sign Up</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            defaultValue={ userName }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
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
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom04">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            defaultValue={ confirmPassword }
            onChange={ handleInput }
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto" as={Col} md="10" controlId="validationCustom04">
          <Form.Label>Zip code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip code"
            name="zipCode"
            defaultValue={ zipCode }
            onChange={ handleInput }
            pattern="^\d{5}$"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip code.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Button className="w-75" type="submit">Register</Button>
      </Form>
    </div>
  );
}

export default SignUp;