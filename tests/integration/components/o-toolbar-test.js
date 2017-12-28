import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('o-toolbar', 'Integration | Component | paper toolbar', {
  integration: true
});

test('uses md-tall class tall=true', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#o-toolbar tall=true}}
    {{/o-toolbar}}
  `);

  assert.ok(this.$('md-toolbar').hasClass('md-tall'));
});

test('o-toolbar-tools uses .md-toolbar-tools class', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#o-toolbar tall=true}}
      {{#o-toolbar-tools}}
      {{/o-toolbar-tools}}
    {{/o-toolbar}}
  `);

  assert.equal(this.$('.md-toolbar-tools').length, 1);
});
