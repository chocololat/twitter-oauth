require('dotenv').config();

const { TwitterApi } = require('twitter-api-v2');

const express = require("express");
const session = require("express-session");

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET
}));

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET
})

app.get("/login", (req, res) => {
    twitterClient.generateAuthLink("http://localhost:3938/callback")
    .then(twitterResponse => {
        let session = req.session;
        session.oauth_token_secret = twitterResponse.oauth_token_secret;

        res.redirect(twitterResponse.url);
    }).catch(console.error);
})

app.get("/callback", (req, res) => {
    const { oauth_token, oauth_verifier } = req.query;
    const { oauth_token_secret } = req.session;

    if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
        return res.status(400).send({ success: false, message: "Application Denied or Session Expired" })
    }

    const clientLogin = new TwitterApi({
        appKey: process.env.TWITTER_APP_KEY,
        appSecret: process.env.TWITTER_APP_SECRET,
        accessToken: oauth_token,
        accessSecret: oauth_token_secret
    });

    clientLogin.login(oauth_verifier)
    .then(async client => {
        res.status(200).send({ success: true, userID: client.userId, screenName: client.screenName, accessToken: client.accessToken, accessSecret: client.accessSecret });
    })
})

app.listen(3938, ["127.0.0.1"], () => console.log("listening to port 3938!"));