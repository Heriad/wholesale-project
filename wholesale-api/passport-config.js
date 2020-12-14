import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';
import { getUser } from './src/couchdb/userDB';

const LocalStrategy = passportLocal.Strategy;

export function initializePassport(passport) {
  const authenticateUser = async (email, password, done) => {
    let dbResponse = await getUser(email);
    const user = dbResponse.data;
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      return done(null, false, { message: 'No user found' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return done(null, user, { message: 'User found' });
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    } catch (err) {
      return done(err, false, { message: 'Error occur' });
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user._id));
}