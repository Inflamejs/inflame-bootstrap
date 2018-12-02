const { transaction } = require('objection');
const Movie = rootRequire('api/models/Movie');
import { NotFound } from '@utils/RequestErrors';

// Add existing Person as an actor to a movie.
export async function addActor(req, res) {
  const movie = await Movie.query().findById(req.params.id);

  if (!movie) {
    throw createStatusCodeError(404);
  }

  await movie.$relatedQuery('actors').relate(req.body.id);

  res.send(req.body);
};


// Get Movie's actors.
export async function findActors (req, res) {
  const movie = await Movie.query().findById(req.params.id);

  if (!movie) {
    throw NotFound;
  }

  const actors = await movie.$relatedQuery('actors');
  res.send(actors);
};

