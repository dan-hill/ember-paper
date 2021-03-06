import { get } from '@ember/object';
import PowerOptions from 'ember-power-select/components/power-select/options';
import layout from '../templates/components/o-autocomplete-options';

export default PowerOptions.extend({
  layout,

  _optionFromIndex(index) {
    let parts = index.split('.');
    let options = this.get('options');
    let option = options[parseInt(parts[0], 10)];
    for (let i = 1; i < parts.length; i++) {
      option = option.options[parseInt(parts[i], 10)];
    }
    return option !== undefined ? get(option, 'raw') : option;
  }
});
