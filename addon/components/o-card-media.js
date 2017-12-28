/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/o-card-media';

/**
 * @class PaperCardMedia
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',
  size: 'md'
});
