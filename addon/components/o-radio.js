/**
 * @module ember-paper
 */
import PaperRadioBaseComponent from './o-radio-base';
import { ChildMixin } from 'ember-composability-tools';

/**
 * @class PaperRadio
 * @extends PaperRadioBaseComponent
 * @uses ChildMixin
 */
export default PaperRadioBaseComponent.extend(ChildMixin, {
  shouldRegister: false
});
