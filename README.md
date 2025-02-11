# Simple Character Sheet API

## Development

### Setup 

1. Copy `.env.template` to `.env`
2. Fill in `.env` with info from Bitwarden (not available for people who aren't Paul)

### Run Locally

Run the server directly from the TS source

```
$ npm install
$ npm run dev
```

## Deployment

Build JS files from the TS

```
$ npm install
$ npm run build
```

Push to Heroku (TODO: Make this a script)
```
$ git push
$ git checkout production
$ get merge main
$ git push
```

Then you can run the server as JS (heroku does this automatically)

```
$ npm run start
```
