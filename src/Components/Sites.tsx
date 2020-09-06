import React, { SFC } from 'react';
import ListSites from './ListSites';
import AddSites from './AddSites';

const Sites: SFC = () => {
  return (
    <>
      <ListSites />
      <AddSites />
    </>
  );
}

export default Sites;