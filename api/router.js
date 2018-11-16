'use strict';


const UserController = rootRequire(`api/controllers/UserController`);
const findBlueprint = rootRequire(`api/blueprints/find`);
module.exports = router => {
  router.post('/users', UserController.create);

  router.get('/users/:id', findBlueprint);

  // router.put('/users/:id', UserController.update);
};
