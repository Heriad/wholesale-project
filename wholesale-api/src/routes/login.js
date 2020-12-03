import { Router } from 'express';

const api = Router();

export default (passport) => {

  // POST /login
  api.post('/', passport.authenticate('local'), (req, res, next) => {
    return res.status(200).send({ success: true, message: 'Login successful', data: req.session.passport.user });
  });

  // DELETE /login
  api.delete('/', (req, res, next) => {
    req.logOut();
    return res.status(200).send({ success: true, message: 'User logged out' });
  });

  return api
}