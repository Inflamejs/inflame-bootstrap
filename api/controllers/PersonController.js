const Person = rootRequire('api/models/Person');
// const { find } = rootRequire(`api/blueprints`);
import { find } from '@blueprints';

export default {
  find,
  // Create a new Person. Because we use `insertGraph` you can pass relations
  // with the person and they also get inserted and related to the person. If
  // all you want to do is insert a single person, `insertGraph` and `allowInsert`
  // can be replaced by `insert(req.body)`.
  async create(req, res) {
    const graph = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(Person.knex(), trx => {
      return (
        Person.query(trx)
          // For security reasons, limit the relations that can be inserted.
          .allowInsert('[pets, children.[pets, movies], movies, parent]')
          .insertGraph(graph)
      );
    });

    res.send(insertedGraph);
  },

  // Patch a single Person.
  async update(req, res) {
    // console.log('PUT /persons/:id');
    try {
      const user = await Person.query().patchAndFetchById(req.params.id, req.body);
      res.send({ user });
    } catch(err) {
      console.log(err);
      res.send(500).send(err);
    }
  },

  // Patch a person and upsert its relations.
  // router.patch('/persons/:id/upsert'
  async upsert (req, res) {
    const graph = req.body;

    // Make sure only one person was sent.
    if (Array.isArray(graph)) {
      throw createStatusCodeError(400);
    }

    // Make sure the person has the correct id because `upsertGraph` uses the id fields
    // to determine which models need to be updated and which inserted.
    graph.id = parseInt(req.params.id, 10);

    // It's a good idea to wrap `upsertGraph` call in a transaction since it
    // may create multiple queries.
    const upsertedGraph = await transaction(Person.knex(), trx => {
      return (
        Person.query(trx)
          // For security reasons, limit the relations that can be upserted.
          .allowUpsert('[pets, children.[pets, movies], movies, parent]')
          .upsertGraph(graph)
      );
    });

    res.send(upsertedGraph);
  },

  // Delete a person.
  // router.delete('/persons/:id'
  async destroy (req, res) {
    await Person.query().deleteById(req.params.id);

    res.send({});
  },

  // // Add a child for a Person.
  // router.post('/persons/:id/children', async (req, res) => {
  //   const person = await Person.query().findById(req.params.id);

  //   if (!person) {
  //     throw createStatusCodeError(404);
  //   }

  //   const child = await person.$relatedQuery('children').insert(req.body);

  //   res.send(child);
  // });

  // router.get('/persons/:id', async (req, res) => {
  //   const person = await Person.query().findById(req.params.id);
  //   if (person) {
  //     res.send({ person });
  //   } else {
  //     res.status(404).send();
  //   }
  // });

  // // Add a pet for a Person.
  // router.post('/persons/:id/pets', async (req, res) => {
  //   const person = await Person.query().findById(req.params.id);

  //   if (!person) {
  //     throw createStatusCodeError(404);
  //   }

  //   const pet = await person.$relatedQuery('pets').insert(req.body);

  //   res.send(pet);
  // });

  // // Get a Person's pets. The result can be filtered using query parameters
  // // `name` and `species`.
  // router.get('/persons/:id/pets', async (req, res) => {
  //   const person = await Person.query().findById(req.params.id);

  //   if (!person) {
  //     throw createStatusCodeError(404);
  //   }

  //   // We don't need to check for the existence of the query parameters because
  //   // we call the `skipUndefined` method. It causes the query builder methods
  //   // to do nothing if one of the values is undefined.
  //   const pets = await person
  //     .$relatedQuery('pets')
  //     .skipUndefined()
  //     .where('name', 'like', req.query.name)
  //     .where('species', req.query.species);

  //   res.send(pets);
  // });

  // // Add a movie for a Person.
  // router.post('/persons/:id/movies', async (req, res) => {
  //   // Inserting a movie for a person creates two queries: the movie insert query
  //   // and the join table row insert query. It is wise to use a transaction here.
  //   const movie = await transaction(Person.knex(), async trx => {
  //     const person = await Person.query(trx).findById(req.params.id);

  //     if (!person) {
  //       throw createStatusCodeError(404);
  //     }

  //     return await person.$relatedQuery('movies', trx).insert(req.body);
  //   });

  //   res.send(movie);
  // });
}
