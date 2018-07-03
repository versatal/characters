import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withRouter } from 'react-router-dom';

export class CharacterListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = this.props.character.selected ? 'item item--selected' : 'item';

    return (
      <div className={className} onClick={() => {
        Session.set('selectedCharacterId', this.props.character._id);
        this.props.history.push(`/dashboard/${this.props.character._id}`);
      }}>
        <h5 className="item__title" >{ this.props.character.name || "Untitled Note" }</h5>
        <p className="item__subtitle" >{ moment(this.props.character.updatedAt).format('M/DD/YY') }</p>
        <p className="item__subtitle" >{ this.props.character.selected }</p>
      </div>
    )
  }
}

export default withRouter(CharacterListItem);
