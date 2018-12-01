const UrlPattern = rootRequire('utils/UrlPattern');
const Pluralize = require('pluralize');
const { capitalize } = require('lodash');

module.exports.parseModel = req => {
  console.log('[Blueprint Request] Path: ', req.path);
  const { resource } = UrlPattern.match(req.path);
  console.log('[Blueprint Request] Resource: ', resource);

  if(!resource) {
    throw new Error({message: 'Unable to parse model from Url Path'});
  }

  let modelName = Pluralize.singular(resource);
  modelName = capitalize(modelName);

  console.log('[Blueprint Request] Resource singularized: ', modelName);

  try {
    let model = rootRequire(`api/models/${modelName}`);
    if(!model) {
      console.warn('No model');
    }
    return model;
  } catch (error) {
    return null;
  }
};

module.exports.normalizeResourceName = id => {
  if (!_.isString(id)) {
    return null;
  }
  id = id.replace(/(.+)(Controller|Adapter|Service)$/i, '$1');
  id = id.toLowerCase();
  return id;
};
