import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/o-toaster';

export default Component.extend({
  layout,
  tagName: '',
  oToaster: service(),
  activeToast: reads('oToaster.activeToast'),

  onClose(toast) {
    this.get('oToaster').cancelToast(toast);
  }
});
