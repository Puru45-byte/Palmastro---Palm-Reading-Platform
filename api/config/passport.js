const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('../utils/prisma');

module.exports = function(passport) {
  // Only configure Google OAuth if environment variables are set
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/auth/google/callback',
        },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: { email: profile.emails[0].value }
          });

          if (user) {
            return done(null, user);
          } else {
            const role = profile.emails[0].value === process.env.ADMIN_EMAIL ? 'ADMIN' : 'USER';
            
            user = await prisma.user.create({
              data: {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                role: role
              }
            });

            return done(null, user);
          }
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: id }
      });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
