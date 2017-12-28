import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('o-button', 'Integration | Component | paper button', {
  integration: true
});

test('renders block label', function(assert) {
  this.render(hbs`
    {{#o-button}}
      Block label
    {{/o-button}}
  `);
  assert.equal(this.$('button').text().trim(), 'Block label');
});

test('renders inline label', function(assert) {
  this.render(hbs`
    {{o-button label='Inline label'}}
  `);
  assert.equal(this.$('button').text().trim(), 'Inline label');
});

test('renders type button by default', function(assert) {
  this.render(hbs`
    {{o-button label='Inline label'}}
  `);
  assert.equal(this.$('button').attr('type'), 'button');
});

test('triggers onClick function when attribute is present', function(assert) {
  assert.expect(1);

  this.set('foo', () => {
    assert.ok(true);
  });
  this.render(hbs`
    {{#o-button onClick=foo}}
      A label
    {{/o-button}}
  `);
  this.$('.md-button').click();
});

test('does nothing onClick if attribute is not present', function(assert) {
  assert.expect(0);

  this.render(hbs`
    {{#o-button}}
      A label
    {{/o-button}}
  `);
  this.$('.md-button').click();
});

test('uses md-raised class when raised=true', function(assert) {
  this.render(hbs`
    {{#o-button raised=true}}
      A label
    {{/o-button}}
  `);
  assert.ok(this.$('.md-button').hasClass('md-raised'));
});

test('uses md-icon-button class when iconButton=true', function(assert) {
  this.render(hbs`
    {{#o-button iconButton=true}}
      A label
    {{/o-button}}
  `);
  assert.ok(this.$('.md-button').hasClass('md-icon-button'));
});

test('uses md-fab class when fab=true', function(assert) {
  this.render(hbs`
    {{#o-button fab=true}}
      A label
    {{/o-button}}
  `);
  assert.ok(this.$('.md-button').hasClass('md-fab'));
});

test('uses md-mini and md-fab class when mini=true', function(assert) {
  this.render(hbs`
    {{#o-button mini=true}}
      A label
    {{/o-button}}
  `);
  assert.ok(this.$('.md-button').is('.md-fab', '.md-mini'));
});

test('uses a tag when href is specified', function(assert) {
  this.render(hbs`
    {{#o-button href="http://example.com"}}
      A label
    {{/o-button}}
  `);
  assert.ok(this.$('.md-button').is('a'));
  assert.ok(this.$('.md-button').attr('href') === 'http://example.com');
});

test('renders target', function(assert) {
  this.render(hbs`
    {{#o-button href="http://example.com" target="_blank"}}
      A label
    {{/o-button}}
  `);
  assert.ok(this.$('.md-button').is('a'));
  assert.ok(this.$('.md-button').attr('target') === '_blank');
});
