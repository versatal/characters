import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";

  return (
    <div className='header'>
      <div className='header__content'>
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc}/>
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>      
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  }
}, PrivateHeader);