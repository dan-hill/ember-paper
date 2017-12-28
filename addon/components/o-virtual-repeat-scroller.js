import Component from '@ember/component';
import layout from '../templates/components/o-virtual-repeat-scroller';

export default Component.extend({
  layout,
  classNames: ['md-virtual-repeat-scroller'],

  didInsertElement() {
    this._super(...arguments);
    this.$().scroll((e) => {
      this.get('onScroll')(e);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$().off('scroll');
  }
});
