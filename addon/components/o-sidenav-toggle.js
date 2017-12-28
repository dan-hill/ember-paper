/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import Component from '@ember/component';
import layout from '../templates/components/o-sidenav-toggle';

/**
 * @class PaperSidenavToggle
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: '',

  name: 'default',

  oSidenav: service(),

  toggle() {
    this.get('oSidenav').toggle(this.get('name'));
  }

});
