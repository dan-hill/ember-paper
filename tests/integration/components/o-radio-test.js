import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('o-radio', 'Integration | Component | paper radio', {
  integration: true
});

test('should set and remove checked css class', function(assert) {
  assert.expect(2);

  this.set('groupValue', '1');
  this.render(hbs`
    {{#o-radio value="1" groupValue=groupValue onChange=(action (mut groupValue))}}
      Radio button 1
    {{/o-radio}}
    {{#o-radio value="2" groupValue=groupValue onChange=(action (mut groupValue))}}
      Radio button 2
    {{/o-radio}}
  `);
  assert.ok(this.$('md-radio-button').hasClass('md-checked'));

  this.set('groupValue', null);
  assert.ok(!this.$('md-radio-button').hasClass('md-checked'));
});

test('should trigger an action when checking', function(assert) {
  assert.expect(1);

  this.set('handleChange', (value) => {
    assert.equal(value, '1');
  });

  this.render(hbs`
    {{#o-radio value="1" groupValue=groupValue onChange=handleChange}}
      Radio button 1
    {{/o-radio}}
    {{#o-radio value="2" groupValue=groupValue onChange=handleChange}}
      Radio button 2
    {{/o-radio}}
  `);

  this.$('md-radio-button').first().click();
});

test('should trigger an action when unchecking (toggle is true)', function(assert) {
  assert.expect(1);

  this.set('groupValue', '1');
  this.set('handleChange', (value) => {
    assert.equal(value, null);
  });

  this.render(hbs`
    {{#o-radio toggle=true value="1" groupValue=groupValue onChange=handleChange}}
      Radio button 1
    {{/o-radio}}
  `);

  this.$('md-radio-button').click();
});

test('shouldn\'t trigger an action when disabled', function(assert) {
  assert.expect(0);

  this.set('handleChange', (checked) => {
    assert.equal(checked, '1');
  });

  this.render(hbs`
    {{#o-radio disabled=true value="1" groupValue=groupValue onChange=handleChange}}
      Radio button 1
    {{/o-radio}}
  `);

  this.$('md-radio-button').click();
});

test('blockless version should set label inside', function(assert) {
  assert.expect(1);

  this.render(hbs`{{o-radio value="1" onChange=(action (mut value)) label="çup?"}}`);

  assert.equal(this.$('.md-label > span').text().trim(), 'çup?');
});

test('block version should set label inside', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#o-radio value="1" onChange=(action (mut value))}}
      çup?
    {{/o-radio}}
  `);

  assert.equal(this.$('.md-label > span').text().trim(), 'çup?');
});

/* test('the `onChange` action is mandatory for o-radio', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{o-radio value="1"}}`);
  }, /requires an `onChange` action/);
});*/
