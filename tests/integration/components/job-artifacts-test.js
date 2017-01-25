import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('job-artifacts', 'Integration | Component | job artifacts', {
  integration: true
});

test('it renders', function (assert) {
  this.render(hbs`{{job-artifacts}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#job-artifacts}}
      template block text
    {{/job-artifacts}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
