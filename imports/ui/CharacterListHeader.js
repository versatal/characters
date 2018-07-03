import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

export const CharacterListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        Meteor.call('characters.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedCharacterId', res);
          }
        })
      }}>Create Character</button>
    </div>
  )
}

export default createContainer(() => {
  return {
    Session
  }
}, CharacterListHeader)