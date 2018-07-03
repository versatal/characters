import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Characters } from '../api/characters';
import CharacterListHeader from './CharacterListHeader';
import CharacterListItem from './CharacterListItem';

export const CharacterList = (props) => {
  return (
    <div className="item-list">
      <CharacterListHeader />
      <h1>Character List</h1>
      {
        props.characters.length < 1 
        ? <p className="empty-item">No Characters</p> 
        : props.characters.map((character) => {
          return <CharacterListItem key={character._id} character={character}/>
          }) 
      }
    </div>
  )
}

export default withTracker(() => {
  const selectedCharacterId = Session.get('selectedCharacterId');
  Meteor.subscribe('characters');
  return {
    characters: Characters.find().fetch().map((character) => {
      return {
        ...character,
        selected: selectedCharacterId === character._id
      }
    })
  }
})(CharacterList);