import React from 'react';

const Edit: React.FC = () => {
  return (
    <form>
      <label htmlFor="">New username</label>
      <input type="text"/>
      <label htmlFor="">Old password</label>
      <input type="password"/>
      <label htmlFor="">new password</label>
      <input type="password"/>
      <button type="submit">UPDATE</button>
    </form>
  );
}

export default Edit;
