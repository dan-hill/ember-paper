/**
 * @module ember-paper
 */

import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';

import layout from '../templates/components/o-icon';
import ColorMixin from 'ember-paper/mixins/color-mixin';

/**
 * @class PaperIcon
 * @extends Ember.Component
 * @uses ColorMixin
 */
let PaperIconComponent = Component.extend(ColorMixin, {
  layout,
  tagName: 'md-icon',
  classNames: ['o-icon', 'md-font', 'material-icons', 'md-default-theme'],
  classNameBindings: ['spinClass'],
  attributeBindings: ['aria-label', 'title', 'sizeStyle:style', 'iconClass:md-font-icon'],

  icon: '',
  spin: false,
  reverseSpin: false,

  iconClass: computed('icon', 'positionalIcon', function() {
    let icon = this.getWithDefault('positionalIcon', this.get('icon'));
    return icon;
  }),

  'aria-label': reads('iconClass'),

  spinClass: computed('spin', 'reverseSpin', function() {
    if (this.get('spin')) {
      return 'md-spin';
    } else if (this.get('reverseSpin')) {
      return 'md-spin-reverse';
    }
  }),

  sizeStyle: computed('size', function() {
    let size = this.get('size');

    if (size) {
      return htmlSafe(`height: ${size}px; min-height: ${size}px; min-width: ${size}px; font-size: ${size}px; line-height: ${size}px;`);
    }
  })
});

PaperIconComponent.reopenClass({
  positionalParams: ['positionalIcon']
});

export default PaperIconComponent;