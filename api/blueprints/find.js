const { parseModel } = rootRequire('utils/blueprintActions');

module.exports = async (req, res) => {
  // We don't need to check for the existence of the query parameters because
  // we call the `skipUndefined` method. It causes the query builder methods
  // to do nothing if one of the values is undefined.
  const Model = parseModel(req);

  if (!Model) {
    return res.status(400).send(`Model for ${req.path} was not found`);
  }

  let query = Model.query().skipUndefined();

  /**
   * @todo Create filtering possibilities
   */
  const data = await query
    // For security reasons, limit the relations that can be fetched.
    // .allowEager('[pets, parent, children.[pets, movies.actors], movies.actors.pets]')
    // .eager(req.query.eager)
    // .where('age', '>=', req.query.minAge)
    // .where('age', '<', req.query.maxAge)
    // .where('firstName', 'like', req.query.firstName)
    .orderBy(req.query.orderBy);

  let responseData = {};
  responseData[Model.tableName] = data;

  res.send(responseData);
};
