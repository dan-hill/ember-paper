import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('o-progress-circular', 'Integration | Component | paper progress circular', {
  integration: true
});

test('should auto-set the md-mode to "indeterminate" if not specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{o-progress-circular}}`);
  assert.equal(this.$('md-progress-circular').attr('md-mode').trim(), 'indeterminate');
});

test('should auto-set the md-mode to "determinate" if a value is specified', function(assert) {
  assert.expect(1);
  this.render(hbs`{{o-progress-circular value=12}}`);
  assert.equal(this.$('md-progress-circular').attr('md-mode').trim(), 'determinate');
});

test('should set correct size based on diameter', function(assert) {
  assert.expect(2);
  this.render(hbs`{{o-progress-circular diameter=25}}`);

  let $el = this.$('md-progress-circular');
  assert.ok(/height:.*25px/.test($el.attr('style')));
  assert.ok(/width:.*25px/.test($el.attr('style')));
});
