# Twitter OAuth Example

Twitter OAuth Example written with Node.JS and Express.

## Requirements

- A Twitter Developer Account, with a project linked to it
- A Regular Twitter Account, can be your personal account or a new one
- [Node.JS](https://nodejs.org/en/) & [Git](https://git-scm.com/) installed

## Installation

1) Git clone the project

    ```bash
    git clone https://github.com/chocololat/twitter-oauth-example
    cd twitter-oauth-example
    ```

2) Install the NPM packages

    ```bash
    npm i
    ```

3) Fill the .env file with a express session secret (can be anything) as well as your application consumer key & consumer secret.

4) Launch the Express Server

    ```bash
    node index.js
    ```

5) Authorize your account to connect with the application.

6) Enjoy your Access Token and Access Secret !

## How does it work

The code is actually creating a web server, that Twitter can use to interact with.

When you visit the `http://localhost:3938/login` page, the Twitter API creates a redirect link to their server, with a callback url set to `http://localhost:3938/callback`, and the server puts their `oauth_token_secret` into the page cookies.

When the application is authorized to connect with your account, Twitter then redirects you to the previously set Callback URL, with some new parameters (`oauth_token`, `oauth_verifier`).

The server uses the `oauth_token` given by Twitter as the accessToken, and the previously stored `oauth_token_secret` as the accessSecret.

With those tokens, Twitter logs into your account, and gives in return the permanent accessToken and accessSecret that you can use for any project that you'd like.

## License

This project is under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)
