const { transaction } = require('objection');
const Movie = require('./models/Movie');

// Add existing Person as an actor to a movie.
router.post('/movies/:id/actors', async (req, res) => {
  const movie = await Movie.query().findById(req.params.id);

  if (!movie) {
    throw createStatusCodeError(404);
  }

  await movie.$relatedQuery('actors').relate(req.body.id);

  res.send(req.body);
});

// Get Movie's actors.
router.get('/movies/:id/actors', async (req, res) => {
  const movie = await Movie.query().findById(req.params.id);

  if (!movie) {
    throw createStatusCodeError(404);
  }

  const actors = await movie.$relatedQuery('actors');
  res.send(actors);
});

// The error returned by this function is handled in the error handler middleware in app.js.
function createStatusCodeError(statusCode) {
  return Object.assign(new Error(), {
    statusCode
  });
}
