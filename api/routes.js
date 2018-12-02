'use strict';

import PersonController from '@controllers/PersonController';
import { addActor, findActors } from '@controllers/Movies';

module.exports = router => {

  router.post('/persons', PersonController.create);
  router.put('/persons/:id', PersonController.update);
  router.get('/persons', PersonController.find);


  // router.get('/persons/:id', PersonController.findOne);
  // router.get('/animals', findBlueprint);

  router.post('/movies/:id/actors', addActor);
  router.get('/movies/:id/actors', findActors);
};
