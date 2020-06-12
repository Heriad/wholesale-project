var { Router } = require('express');

var { UserController } = require('../controllers');
var userModel = require('../models/userModel');

var userController = new UserController();


var router = new Router()

router.post('/user', async (req, res, next) => {
  if (!req.body.name || !req.body.surname || !req.body.email || !req.body.password) {
    console.debug('Brak danych');
    return res.status(400).send({
        err: 'Brak danych'
    });
  }
  let newUser = userModel.createUser(req.body.name, req.body.surname, req.body.email, 
                                    req.body.password, req.body.companyName, req.body.regon,
                                    req.body.krs);
  let response = await userController.createUser(newUser);
})
