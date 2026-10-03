const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = require('../utils/prisma');

module.exports = function(passport) {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/auth/google/callback',
          proxy: true,
        },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
          if (!email) {
            return done(new Error('No email found in Google profile'), null);
          }

          let user = await prisma.user.findUnique({
            where: { email }
          });

          if (user) {
            return done(null, user);
          } else {
            const role = email === process.env.ADMIN_EMAIL ? 'ADMIN' : 'USER';
            const firstName = (profile.name && profile.name.givenName) || profile.displayName || 'User';
            const lastName = (profile.name && profile.name.familyName) || '';
            
            user = await prisma.user.create({
              data: {
                firstName,
                lastName,
                email,
                googleId: profile.id || null,
                role: role
              }
            });

            return done(null, user);
          }
        } catch (err) {
          console.error('Google OAuth strategy error:', err);
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
