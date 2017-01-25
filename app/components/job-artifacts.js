import Ember from 'ember';
import config from 'travis/config/environment';

export default Ember.Component.extend({
  artifactsEndpoint: config.artifactsEndpoint,

  actions: {
    download(artifact) {
      // TODO swith build id to job id
      let url = `${this.artifactsEndpoint}/builds/${artifact.BuildID}/artifacts/${artifact.ID}`;
      let options = {
        dataType: 'json',
        headers: {
          Authorization: `bearer ${window.localStorage.getItem('travis.jwt')}`
        }
      };

      Ember.$.ajax(url, options).then((data) => {
        if (data && data.location) {
          window.location = data.location;
        }
      }, () => {
        console.error('Failed to download, Please retry');
      });
    }
  }
});
