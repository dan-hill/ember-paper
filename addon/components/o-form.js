/**
 * @module ember-paper
 */
import { not, and } from '@ember/object/computed';

import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/o-form';
import ParentMixin from 'ember-paper/mixins/parent-mixin';

/**
 * @class PaperForm
 * @extends Ember.Component
 * @uses ParentMixin
 */
export default Component.extend(ParentMixin, {
  layout,
  tagName: 'form',

  inputComponent: 'o-input',
  submitButtonComponent: 'o-button',
  selectComponent: 'o-select',
  autocompleteComponent: 'o-autocomplete',

  isValid: not('isInvalid'),
  isInvalid: computed('childComponents.@each.isInvalid', function() {
    return this.get('childComponents').isAny('isInvalid');
  }),

  isTouched: computed('childComponents.@each.isTouched', function() {
    return this.get('childComponents').isAny('isTouched');
  }),

  isInvalidAndTouched: and('isInvalid', 'isTouched'),

  submit() {
    this.send('onSubmit');
    return false;
  },

  actions: {
    onValidityChange() {
      if (this.get('lastIsValid') !== this.get('isValid') || this.get('lastIsTouched') !== this.get('isTouched')) {
        this.sendAction('onValidityChange', this.get('isValid'), this.get('isTouched'), this.get('isInvalidAndTouched'));
        this.set('lastIsValid', this.get('isValid'));
        this.set('lastIsTouched', this.get('isTouched'));
      }
    },
    onSubmit() {
      if (this.get('isInvalid')) {
        this.get('childComponents').setEach('isTouched', true);
        this.sendAction('onInvalid');
      } else {
        this.sendAction('onSubmit');
        this.get('childComponents').setEach('isTouched', false);
      }
    }
  }
});
