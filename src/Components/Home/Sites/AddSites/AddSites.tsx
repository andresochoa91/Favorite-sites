import React, { FC, useState, useContext } from 'react';
import { firestore } from '../../../../Firebase/Firebase.utils';
import { PracticeFirebaseContext, IContextProps } from '../../../../Context';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

const AddSites: FC = () => {
  const [ site, setSite ] = useState<string>("");
  const { currentUserId, currentUserSites, setCurrentUserSites } = useContext<IContextProps>(PracticeFirebaseContext);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setSite(event.currentTarget.value);
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>):Promise<void> => {
    event.preventDefault();
    if (!site) {
      alert("Empty field is not valid");
      return;
    }
    try {
      const userRef = firestore.doc(`users/${currentUserId}`);

      const something = currentUserSites.filter(s => s !== site);

      if (something.length !== currentUserSites.length) {
        alert("This site already exists in your list, try another website");
        return;
      }

      await userRef.update({
        sites: [...currentUserSites, site]
      });
  
      setCurrentUserSites([...currentUserSites, site]);
      setSite("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container className="w-75 my-4">
      <h3 className="text-center">Add websites</h3>
      <Form onSubmit={ handleSubmit }>
        <InputGroup>
          <Form.Control 
            type="text" 
            placeholder="https://..."
            value={ site }
            onChange={ handleInput }
            pattern="^(https?:\/\/+).{1,}$"
            minLength={7}
          />
          <InputGroup.Append>
            <Button variant="primary" type="submit">
              Add website
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Form.Text className="text-white">
          Starting with <strong>https://</strong> is required
        </Form.Text>
      </Form>
    </Container>
  );
}

export default AddSites;