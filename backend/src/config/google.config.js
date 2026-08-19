import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../schema/login.schema.model.js";

export const configureGoogleStrategy = () => {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:5000/api/auth/google/callback";

    if (!clientID || !clientSecret) {
        console.warn("⚠️ Google OAuth credentials (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET) missing in env. Google Auth Strategy skipped.");
        return;
    }

    passport.use(
        new GoogleStrategy(
            {
                clientID,
                clientSecret,
                callbackURL
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    let user = await User.findOne({
                        $or: [{ googleId: profile.id }, { email }]
                    });

                    if (!user) {
                        user = await User.create({
                            username: profile.displayName || profile.emails?.[0]?.value?.split("@")[0] || `user_${profile.id}`,
                            email: email,
                            googleId: profile.id,
                            avatar: profile.photos?.[0]?.value || ""
                        });
                    } else if (!user.googleId) {
                        user.googleId = profile.id;
                        if (!user.avatar && profile.photos?.[0]?.value) {
                            user.avatar = profile.photos[0].value;
                        }
                        await user.save();
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error, null);
                }
            }
        )
    );
};

export default configureGoogleStrategy;
