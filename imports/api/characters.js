import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Characters = new Mongo.Collection('characters');

if (Meteor.isServer) {
  Meteor.publish('characters', function () {
    return Characters.find({ userId: this.userId });
  });
}

Meteor.methods({
  'characters.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    return Characters.insert({
      name: '',
      description: '',
      userId: this.userId,
      updatedAt: moment().valueOf
    })
  },
  'characters.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      }
    }).validate({ _id })
    
    Characters.remove({ _id, userId: this.userId })
  },
  'characters.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      },
      name: {
        type: String,
        optional: true
      },
      description: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Characters.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    })
  }
})