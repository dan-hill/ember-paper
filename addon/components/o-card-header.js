/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/o-card-header';

/**
 * @class PaperCardHeader
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-card-header'
});
