import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Characters } from '../api/characters';

export class CharacterEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name })
    this.props.call('characters.update', this.props.character._id, { name })
  }
  handleDescriptionChange(e) {
    const description = e.target.value;
    this.setState({ description })
    this.props.call('characters.update', this.props.character._id, { description })
  }  
  handleDeleteCharacter() {
    this.props.call('characters.remove', this.props.character._id);
    this.props.history.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentCharacterId = this.props.character ? this.props.character._id : undefined;
    const prevCharacterId = prevProps.character ? prevProps.character._id : undefined;
  
    if (currentCharacterId && currentCharacterId !== prevCharacterId) {
      this.setState({
        name: this.props.character.name,
        description: this.props.character.description
      })
    }
  }  
  render() {
    if (this.props.character) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.name} placeholder="Character Name Here" onChange={this.handleNameChange.bind(this)}/>
          <textarea className="editor__body" value={this.state.description} placeholder="Character Description Here" onChange={this.handleDescriptionChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleDeleteCharacter.bind(this)}>Delete Character</button>
          </div>
        </div>
      ) 
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedCharacterId ? 'Character not found.' : 'Pick or create a character to get started'}
          </p>
        </div>
      )      
    }

  }
}

export default createContainer(() => {
  const selectedCharacterId = Session.get('selectedCharacterId')

  return {
    selectedCharacterId,
    character: Characters.findOne(selectedCharacterId),
    call: Meteor.call
  }

}, CharacterEditor);