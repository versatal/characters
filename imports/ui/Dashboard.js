import React from 'react';

import CharacterList from './CharacterList';
import PrivateHeader from './PrivateHeader';
import CharacterEditor from './CharacterEditor';

export default () => {
  return (
    <div>
      <PrivateHeader title="Characters" />
      <div className="page-content">
        <div className="page-content__sidebar">
          <CharacterList />
        </div>
        <div className="page-content__main">
          <CharacterEditor />
        </div>
      </div>
    </div>
  )
};