import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import './main.html';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
})

Tracker.autorun(() => {
  const selectedCharacterId = Session.get('selectedCharacterId');
  Session.set('isNavOpen', false);
});


Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen)
});

Meteor.startup(() => { 
  Session.set('selectedCharacterId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});