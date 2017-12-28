/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/o-subheader';

/**
 * @class PaperSubheader
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'h2',
  classNames: ['md-subheader']
});
