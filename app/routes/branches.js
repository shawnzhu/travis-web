import Ember from 'ember';
import TravisRoute from 'travis/routes/basic';
import config from 'travis/config/environment';

const { service } = Ember.inject;

export default TravisRoute.extend({
  tabStates: service(),

  model(/* params*/) {
    var allTheBranches, apiEndpoint, options;
    apiEndpoint = config.apiEndpoint;
    allTheBranches = Ember.ArrayProxy.create();
    options = {};
    if (this.get('auth.signedIn')) {
      options.headers = {
        Authorization: 'token ' + (this.auth.token())
      };
    }

    let path = `${apiEndpoint}/v3/repo/${this.repositoryId()}/branches`;
    let includes = 'build.commit&limit=100';
    let url = `${path}?include=${includes}`;

    return Ember.$.ajax(url, options).then(function (response) {
      allTheBranches = response.branches;
      return allTheBranches;
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('repositoryId', this.repositoryId());
  },

  activate() {
    this.controllerFor('repo').activate('branches');
  },

  repositoryId() {
    return this.modelFor('repo').get('id');
  },
});
