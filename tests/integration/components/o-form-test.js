import Component from '@ember/component';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('o-form', 'Integration | Component | paper form', {
  integration: true
});

test('`isInvalid` and `isValid` work as expected', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#o-form as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}

      {{#if form.isInvalid}}
        <div class="invalid-div">Form is invalid!</div>
      {{/if}}
      {{#if form.isValid}}
        <div class="valid-div">Form is valid!</div>
      {{/if}}

    {{/o-form}}
  `);

  assert.equal(this.$('.invalid-div').length, 0);
  assert.equal(this.$('.valid-div').length, 1);

  this.set('errors', [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }]);

  assert.equal(this.$('.invalid-div').length, 1);
  assert.equal(this.$('.valid-div').length, 0);
});

test('form `onSubmit` action is invoked and `onInvalid` is not', function(assert) {
  assert.expect(1);

  this.set('onSubmit', () => {
    assert.ok(true);
  });

  this.set('onInvalid', () => {
    assert.notOk(true);
  });

  this.render(hbs`
    {{#o-form onSubmit=(action onSubmit) onInvalid=(action onInvalid) as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

      <button type="button" onclick={{action form.onSubmit}}>Submit</button>

    {{/o-form}}
  `);

  this.$('button').click();
});

test('form `onInvalid` action is invoked and `onSubmit` is not when the form is not valid', function(assert) {
  assert.expect(1);

  this.set('onSubmit', () => {
    assert.notOk(true);
  });

  this.set('onInvalid', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#o-form onSubmit=(action onSubmit) onInvalid=(action onInvalid) as |form|}}
      {{form.input value="" required=true onChange=null}}

      <button type="submit">Submit</button>
    {{/o-form}}
  `);

  this.$('button').click();
});

test('form `onValidityChange` action is invoked', function(assert) {
  // o-input triggers `onValidityChange` on render
  // so we expect two runs: one on render and another on validity change
  assert.expect(9);

  this.set('onValidityChange', (isValid, isTouched, isInvalidAndTouched) => {
    assert.ok(isValid);
    assert.notOk(isTouched);
    assert.notOk(isInvalidAndTouched);
  });

  this.render(hbs`
    {{#o-form onValidityChange=(action onValidityChange) as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}
    {{/o-form}}
  `);

  this.set('onValidityChange', (isValid, isTouched, isInvalidAndTouched) => {
    assert.ok(isValid);
    assert.ok(isTouched);
    assert.notOk(isInvalidAndTouched);
  });

  this.$('input:first').trigger('blur');

  this.set('onValidityChange', (isValid, isTouched, isInvalidAndTouched) => {
    assert.notOk(isValid);
    assert.ok(isTouched);
    assert.ok(isInvalidAndTouched);
  });

  this.set('errors', [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }]);

});

test('form is reset after submit action is invoked', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{#o-form as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

      <button onclick={{action form.onSubmit}}>Submit</button>

    {{/o-form}}
  `);

  // no touched inputs
  assert.equal(this.$('.ng-dirty').length, 0, 'no touched inputs');

  this.$('input:first').trigger('blur');

  // there is a dirty input
  assert.equal(this.$('.ng-dirty').length, 1, 'there is a touched input');

  this.$('button').click();

  assert.equal(this.$('.ng-dirty').length, 0, 'inputs were reset');
});

test('works without using contextual components', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{#o-form as |form|}}
      {{o-input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{o-input value=bar onChange=(action (mut bar)) label="Bar" errors=errors}}

      {{#if form.isInvalid}}
        <div class="invalid-div">Form is invalid!</div>
      {{/if}}
      {{#if form.isValid}}
        <div class="valid-div">Form is valid!</div>
      {{/if}}

    {{/o-form}}
  `);

  assert.equal(this.$('.invalid-div').length, 0);
  assert.equal(this.$('.valid-div').length, 1);

  this.set('errors', [{
    message: 'foo should be a number.',
    attribute: 'foo'
  }, {
    message: 'foo should be smaller than 12.',
    attribute: 'foo'
  }]);

  assert.equal(this.$('.invalid-div').length, 1);
  assert.equal(this.$('.valid-div').length, 0);
});

test('form submit button renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#o-form as |form|}}
      {{#form.submit-button}}Submit{{/form.submit-button}}
    {{/o-form}}
  `);

  assert.equal(this.$('button').length, 1);
});

test('form submit button calls form onSubmit action', function(assert) {
  assert.expect(1);

  this.set('onSubmit', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#o-form onSubmit=(action onSubmit) as |form|}}
      {{#form.submit-button}}Submit{{/form.submit-button}}
    {{/o-form}}
  `);

  this.$('button').click();
});

test('form submit button is of type submit', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#o-form as |form|}}
      {{#form.submit-button}}Submit{{/form.submit-button}}
    {{/o-form}}
  `);

  assert.equal(this.$('button').attr('type'), 'submit');
});

test('form submit button component can be customized by passing `submitButtonComponent`', function(assert) {
  assert.expect(1);

  this.register('component:custom-submit-button', Component.extend({
    classNames: ['custom-submit-button']
  }));

  this.render(hbs`
    {{#o-form submitButtonComponent="custom-submit-button" as |form|}}
      {{form.submit-button}}
    {{/o-form}}
  `);

  assert.equal(this.$('.custom-submit-button').length, 1, 'custom submit button is displayed');
});

test('form `onSubmit` action is invoked when form element is submitted', function(assert) {
  assert.expect(1);

  this.set('onSubmit', () => {
    assert.ok(true);
  });

  this.render(hbs`
    {{#o-form onSubmit=(action onSubmit) as |form|}}
      {{form.input value=foo onChange=(action (mut foo)) label="Foo"}}
      {{form.input value=bar onChange=(action (mut bar)) label="Bar"}}

      <input type="submit" value="Submit">

    {{/o-form}}
  `);

  this.$('input').last().click();
});

test('yielded form.input renders the `o-input`-component', function(assert) {
  assert.expect(1);

  this.register('component:o-input', Component.extend({
    classNames: ['o-input']
  }));

  this.render(hbs`
    {{#o-form as |form|}}
      {{form.input}}
    {{/o-form}}
  `);

  assert.equal(this.$('.o-input').length, 1, 'o-input component displayed');
});

test('yielded form.input can be customized by passing `inputComponent`', function(assert) {
  assert.expect(2);

  this.register('component:o-input', Component.extend({
    classNames: ['o-input']
  }));

  this.register('component:custom-input', Component.extend({
    classNames: ['custom-input']
  }));

  this.render(hbs`
    {{#o-form inputComponent="custom-input" as |form|}}
      {{form.input}}
    {{/o-form}}
  `);

  assert.equal(this.$('.o-input').length, 0, 'o-input component is not displayed');
  assert.equal(this.$('.custom-input').length, 1, 'custom input-component is displayed');
});

test('yielded form.select renders `o-select`-component', function(assert) {
  assert.expect(1);

  this.register('component:o-select', Component.extend({
    classNames: ['o-select']
  }));

  this.render(hbs`
    {{#o-form as |form|}}
      {{form.select}}
    {{/o-form}}
  `);

  assert.equal(this.$('.o-select').length, 1, 'o-select is displayed');
});

test('yielded form.select can be customized by passing `selectComponent`', function(assert) {
  assert.expect(2);

  this.register('component:o-select', Component.extend({
    classNames: ['o-select']
  }));

  this.register('component:custom-select', Component.extend({
    classNames: ['custom-select']
  }));

  this.render(hbs`
    {{#o-form selectComponent="custom-select" as |form|}}
      {{form.select}}
    {{/o-form}}
  `);

  assert.equal(this.$('.o-select').length, 0, 'o-select component is not displayed');
  assert.equal(this.$('.custom-select').length, 1, 'custom select-component is displayed');
});

test('yielded form.autocomplete renders `o-autocomplete`-component', function(assert) {
  assert.expect(1);

  this.register('component:o-autocomplete', Component.extend({
    classNames: ['o-autocomplete']
  }));

  this.render(hbs`
    {{#o-form as |form|}}
      {{form.autocomplete}}
    {{/o-form}}
  `);

  assert.equal(this.$('.o-autocomplete').length, 1, 'o-autocomplete is displayed');
});

test('yielded form.autocomplete can be customized by passing `autocompleteComponent`', function(assert) {
  assert.expect(2);

  this.register('component:o-autocomplete', Component.extend({
    classNames: ['o-autocomplete']
  }));

  this.register('component:custom-autocomplete', Component.extend({
    classNames: ['custom-autocomplete']
  }));

  this.render(hbs`
    {{#o-form autocompleteComponent="custom-autocomplete" as |form|}}
      {{form.autocomplete}}
    {{/o-form}}
  `);

  assert.equal(this.$('.o-autocomplete').length, 0, 'o-autocomplete component is not displayed');
  assert.equal(this.$('.custom-autocomplete').length, 1, 'custom autocomplete-component is displayed');
});
